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
    const insertedIds = [];

    for (const item of args.items) {
      const id = await ctx.db.insert("trades", {
        tradeId: item.tradeId,
        resourceId: item.resourceId,
        buyNowPrice: item.buyNowPrice,
        lastSalePrice: item.lastSalePrice,
        profitMade: item.profitMade,
        personaId: item.personaId,
      });
      insertedIds.push(id);
    }

    return { inserted: insertedIds.length };
  },
});
