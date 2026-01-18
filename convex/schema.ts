import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tradepile: defineTable({
    tradeId: v.number(),
    assetId: v.number(),
    rating: v.number(),
    resourceId: v.number(),
    preferredPosition: v.string(),
    attributeArray: v.array(v.number()),
    buyNowPrice: v.number(),
    lastSalePrice: v.number(),
    personaId: v.number(),
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
