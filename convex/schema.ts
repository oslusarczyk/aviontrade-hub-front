import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tradepile: defineTable({
    tradeId: v.number(),
    assetId: v.number(),
    rating: v.number(),
    resourceId: v.number(),
    preferredPosition: v.string(),
    buyNowPrice: v.optional(v.number()),
    lastSalePrice: v.optional(v.number()),
    attributeArray: v.array(v.number()),
    listPrice: v.optional(v.number()),
    buyPrice: v.optional(v.number()),
    personaId: v.number(),
    tradeStatus: v.optional(v.string()),
  }).index("by_tradeId", ["tradeId"]),

  trades: defineTable({
    tradeId: v.number(),
    resourceId: v.number(),
    buyNowPrice: v.number(),
    lastSalePrice: v.number(),
    profitMade: v.number(),
    personaId: v.number(),
  }).index("by_tradeId", ["tradeId"]),
});
