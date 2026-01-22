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
    listPrice: v.number(),
    buyPrice: v.number(),
    personaId: v.number(),
    tradeStatus: v.string(),
  }).index("by_tradeId", ["tradeId"]),

  trades: defineTable({
    tradeId: v.number(),
    resourceId: v.number(),
    buyNowPrice: v.number(),
    lastSalePrice: v.number(),
    profitMade: v.number(),
    personaId: v.number(),
  }).index("by_tradeId", ["tradeId"]),

    players: defineTable({
    name: v.string(),
    fullName: v.string(),
    club: v.string(),
    nation: v.string(),
    league: v.string(),
    playerId: v.number(),
    itemId: v.number(),
    overall: v.number(),
    cardType: v.string(),
    cardLink: v.string(),
        // Face stats
        PAC: v.number(),
        SHO: v.number(),
        PAS: v.number(),
        DRI: v.number(),
        DEF: v.number(),
        PHY: v.number(),
  })
    .index("by_playerId", ["playerId"])
    .index("by_itemId", ["itemId"]),
});
