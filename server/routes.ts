import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertNFTSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

// Input validation middleware
const validateInput = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ 
        message: "Invalid input data", 
        error: error instanceof z.ZodError ? error.issues : error 
      });
    }
  };
};

// Rate limiting (simple in-memory implementation)
const requestCounts = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT = 100; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

const rateLimit = (req: Request, res: Response, next: any) => {
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const userRequests = requestCounts.get(clientIp);
  
  if (!userRequests || now > userRequests.resetTime) {
    requestCounts.set(clientIp, { count: 1, resetTime: now + RATE_WINDOW });
    next();
  } else if (userRequests.count < RATE_LIMIT) {
    userRequests.count++;
    next();
  } else {
    res.status(429).json({ message: "Too many requests, please try again later" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Apply rate limiting to all API routes
  app.use('/api/', rateLimit);
  
  // User registration
  app.post("/api/users/register", validateInput(insertUserSchema), async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ user, message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  // Get user by ID
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  });

  // Get leaderboard
  app.get("/api/leaderboard", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const leaderboard = await storage.getLeaderboard(limit);
      res.json({ leaderboard });
    } catch (error) {
      res.status(500).json({ message: "Error fetching leaderboard", error });
    }
  });

  // Mint NFT
  app.post("/api/nfts/mint", validateInput(insertNFTSchema), async (req: Request, res: Response) => {
    try {
      const nftData = insertNFTSchema.parse(req.body);
      const nft = await storage.createNFT(nftData);
      res.json({ nft, message: "NFT minted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid NFT data", error });
    }
  });

  // Get NFTs by owner
  app.get("/api/nfts/owner/:ownerId", async (req: Request, res: Response) => {
    try {
      const nfts = await storage.getNFTsByOwner(req.params.ownerId);
      res.json({ nfts });
    } catch (error) {
      res.status(500).json({ message: "Error fetching NFTs", error });
    }
  });

  // Get total NFTs minted
  app.get("/api/nfts/stats", async (req: Request, res: Response) => {
    try {
      const totalMinted = await storage.getTotalNFTsMinted();
      res.json({ totalMinted, maxSupply: 1000 });
    } catch (error) {
      res.status(500).json({ message: "Error fetching NFT stats", error });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req: Request, res: Response) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeNewsletter(newsletterData);
      res.json({ subscription, message: "Successfully subscribed to newsletter" });
    } catch (error) {
      res.status(400).json({ message: "Invalid email or already subscribed", error });
    }
  });

  // Create referral
  app.post("/api/referrals", async (req: Request, res: Response) => {
    try {
      const { referrerId, refereeId, sedReward } = req.body;
      const referral = await storage.createReferral(referrerId, refereeId, sedReward);
      
      // Update referrer stats
      await storage.updateUserStats(referrerId, sedReward, 1);
      
      res.json({ referral, message: "Referral created successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error creating referral", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
