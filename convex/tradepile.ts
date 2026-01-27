import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const updateTradepile = mutation({
  args: {
    items: v.array(
      v.object({
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
      })
    ),
  },
  handler: async (ctx, args) => {

    const existingItems = await ctx.db
      .query("tradepile")
      .filter((q) => q.eq(q.field("personaId"), args.items[0].personaId))
      .collect();

    for (const item of existingItems) {
      await ctx.db.delete(item._id);
    }

    for (const item of args.items) {
      await ctx.db.insert("tradepile", {
        tradeId: item.tradeId,
        assetId: item.assetId,
        rating: item.rating,
        resourceId: item.resourceId,
        preferredPosition: item.preferredPosition,
        attributeArray: item.attributeArray,
        listPrice: item.listPrice,
        buyPrice: item.buyPrice,
        personaId: item.personaId,
        tradeStatus: item.tradeStatus,
      });
    }
  },
});

export const getTradepile = query({
  args: {
    personaId: v.number(),
  },
  handler: async (ctx, args) => {
    let tradepile = await ctx.db.query("tradepile").filter((q) => q.eq(q.field("personaId"), args.personaId)).collect();
    const tradepileItemsSold = tradepile.filter(t => t.tradeStatus === "closed").length;
    tradepile = tradepile.filter(t => t.tradeStatus !== "closed");
    const tradepileSum = tradepile.reduce((acc, t) => acc + t.buyPrice, 0);
    const tradepileBuy = tradepile.reduce((acc, t) => acc + t.listPrice, 0);
    const tradepileProfit = Math.round(tradepileSum * 0.95 - tradepileBuy);
    const tradepileCount = tradepile.length;
    const lastUpdated = tradepile[0]._creationTime;
    return { tradepileCount, tradepileItemsSold, tradepileSum, tradepileBuy, tradepileProfit, lastUpdated };
  },
});