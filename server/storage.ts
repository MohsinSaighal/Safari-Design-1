import { type User, type InsertUser, type NFT, type InsertNFT, type Newsletter, type InsertNewsletter, type Referral } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByReferralCode(code: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStats(id: string, sedEarned: number, totalInvites: number): Promise<User>;
  getLeaderboard(limit?: number): Promise<User[]>;
  
  // NFT operations
  getNFTsByOwner(ownerId: string): Promise<NFT[]>;
  createNFT(nft: InsertNFT): Promise<NFT>;
  getTotalNFTsMinted(): Promise<number>;
  
  // Newsletter operations
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  
  // Referral operations
  createReferral(referrerId: string, refereeId: string, sedReward: number): Promise<Referral>;
  getReferralsByUser(userId: string): Promise<Referral[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private nfts: Map<string, NFT>;
  private newsletters: Map<string, Newsletter>;
  private referrals: Map<string, Referral>;

  constructor() {
    this.users = new Map();
    this.nfts = new Map();
    this.newsletters = new Map();
    this.referrals = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByReferralCode(code: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.referralCode === code);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const referralCode = `SAFARI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const user: User = { 
      ...insertUser, 
      id,
      referralCode,
      username: null,
      referredBy: null,
      totalInvites: 0,
      sedEarned: 0,
      rank: "Explorer",
      isActive: true,
      createdAt: new Date(),
      walletAddress: insertUser.walletAddress || null
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUserStats(id: string, sedEarned: number, totalInvites: number): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser = {
      ...user,
      sedEarned: (user.sedEarned || 0) + sedEarned,
      totalInvites: (user.totalInvites || 0) + totalInvites,
      rank: this.calculateRank((user.totalInvites || 0) + totalInvites)
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  private calculateRank(totalInvites: number): string {
    if (totalInvites >= 50) return "Ambassador";
    if (totalInvites >= 15) return "Trailblazer";
    return "Explorer";
  }

  async getLeaderboard(limit: number = 10): Promise<User[]> {
    return Array.from(this.users.values())
      .sort((a, b) => (b.sedEarned || 0) - (a.sedEarned || 0))
      .slice(0, limit);
  }

  async getNFTsByOwner(ownerId: string): Promise<NFT[]> {
    return Array.from(this.nfts.values()).filter(nft => nft.ownerId === ownerId);
  }

  async createNFT(insertNFT: InsertNFT): Promise<NFT> {
    const id = randomUUID();
    const nft: NFT = {
      ...insertNFT,
      id,
      mintedAt: new Date(),
      metadata: insertNFT.metadata || {}
    };
    
    this.nfts.set(id, nft);
    return nft;
  }

  async getTotalNFTsMinted(): Promise<number> {
    return this.nfts.size;
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = randomUUID();
    const newsletter: Newsletter = {
      ...insertNewsletter,
      id,
      subscribedAt: new Date()
    };
    
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async createReferral(referrerId: string, refereeId: string, sedReward: number): Promise<Referral> {
    const id = randomUUID();
    const referral: Referral = {
      id,
      referrerId,
      refereeId,
      sedReward,
      createdAt: new Date()
    };
    
    this.referrals.set(id, referral);
    return referral;
  }

  async getReferralsByUser(userId: string): Promise<Referral[]> {
    return Array.from(this.referrals.values()).filter(ref => ref.referrerId === userId);
  }
}

export const storage = new MemStorage();
