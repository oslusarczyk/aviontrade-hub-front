import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addSales = mutation({
  args: {
    items: v.array(
      v.object({
        tradeId: v.number(),
        resourceId: v.number(),
        buyNowPrice: v.number(),
        lastSalePrice: v.number(),
        profitMade: v.number(),
        personaId: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const item of args.items) {
    const duplicates = await ctx.db
        .query("trades")
        .withIndex("by_tradeId", (q) => q.eq("tradeId", item.tradeId))
        .first();

    if (duplicates) {
      await ctx.db.patch(duplicates._id, {
        tradeId: item.tradeId,
        resourceId: item.resourceId,
        buyNowPrice: item.buyNowPrice,
        lastSalePrice: item.lastSalePrice,
        profitMade: item.profitMade,
        personaId: item.personaId,
      });
    } else{
        await ctx.db.insert("trades", item);
    }
  }
}
});

export const showSales = query({
  args: {
    personaId: v.number(),
    period: v.number(),
  },
  handler: async (ctx, args) => {
    const cutoffTime = Date.now() - args.period * 24 * 60 * 60 * 1000;
    const trades = await ctx.db.query("trades")
    .withIndex("by_personaId", (q) => q.eq("personaId", args.personaId))
    .filter((q) => q.gt(q.field("_creationTime"), cutoffTime))
    .collect();
    const amountSold = trades.length;
    const totalSales = trades.reduce((acc, trade) => acc + trade.profitMade, 0);
    return { amountSold, totalSales };


  },
});
