import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username"),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  walletAddress: text("wallet_address"),
  referralCode: text("referral_code").notNull().unique(),
  referredBy: text("referred_by"),
  totalInvites: integer("total_invites").default(0),
  sedEarned: integer("sed_earned").default(0),
  rank: text("rank").default("Explorer"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const nfts = pgTable("nfts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tokenId: text("token_id").notNull().unique(),
  ownerId: text("owner_id").notNull(),
  serialNumber: integer("serial_number").notNull(),
  metadata: json("metadata"),
  mintedAt: timestamp("minted_at").default(sql`now()`),
});

export const referrals = pgTable("referrals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  referrerId: text("referrer_id").notNull(),
  refereeId: text("referee_id").notNull(),
  sedReward: integer("sed_reward").default(0),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const newsletter = pgTable("newsletter", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  name: true,
  country: true,
  walletAddress: true,
});

export const insertNFTSchema = createInsertSchema(nfts).pick({
  tokenId: true,
  ownerId: true,
  serialNumber: true,
  metadata: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletter).pick({
  email: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertNFT = z.infer<typeof insertNFTSchema>;
export type NFT = typeof nfts.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletter.$inferSelect;
export type Referral = typeof referrals.$inferSelect;
