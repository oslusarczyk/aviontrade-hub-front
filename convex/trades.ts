import { mutation } from "./_generated/server";
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
