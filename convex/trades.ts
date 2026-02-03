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
        await ctx.db.delete(duplicates._id);
      }
      await ctx.db.insert("trades", item);
    }
  }

});

export const showSales = query({
  args: {
    personaId: v.number(),
    period: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const startOfDay = new Date(now).setHours(0, 0, 0, 0);
    const cutoffTime = startOfDay - (args.period - 1) * 24 * 60 * 60 * 1000;
    const trades = await ctx.db.query("trades")
      .withIndex("by_personaId", (q) => q.eq("personaId", args.personaId))
      .filter((q) => q.gt(q.field("_creationTime"), cutoffTime))
      .collect();
    const amountSold = trades.length;
    const totalSales = trades.reduce((acc, trade) => acc + trade.profitMade, 0);
    const profitAverage = Math.round(totalSales / amountSold);
    const biggestSingleProfit = Math.max(...trades.map(trade => trade.profitMade));
    return { amountSold, totalSales, profitAverage, biggestSingleProfit };
  },
});

export const showLastSales = query({
  args: {
    personaId: v.number(),
  },
  handler: async (ctx, args) => {
    let trade = await ctx.db.query("trades")
      .withIndex("by_personaId", (q) => q.eq("personaId", args.personaId))
      .order("desc")
      .first();
    const creationTime = trade?._creationTime ?? 0;
    const trades = await ctx.db.query("trades")
      .withIndex("by_personaId", (q) => q.eq("personaId", args.personaId))
      .filter((q) => q.gt(q.field("_creationTime"), creationTime - 1000))
      .filter((q) => q.lt(q.field("_creationTime"), creationTime + 1000))
      .collect();

    trades.sort((a, b) => b.lastSalePrice - a.lastSalePrice);

    const lastSales = (await Promise.all(
      trades.map(async (trade) => {
        const player = await ctx.db.query("players")
          .withIndex("by_itemId", (q) => q.eq("itemId", trade.resourceId))
          .first();
        if (!player) {
          return null;
        }
        return {
          tradeId: trade.tradeId,
          player: player.name,
          overall: player.overall,
          cardType: player.cardType,
          position: player.position ?? "Unknown",
          price: trade.buyNowPrice,
          sellPrice: trade.lastSalePrice,
          profit: trade.profitMade,
        };
      })
    )).flatMap(sale => sale !== null ? [sale] : []);

    return { creationTime, lastSales };
  },


});

export const showProfitChart = query({
  args: {
    personaId: v.number(),
  },
  handler: async (ctx, args) => {
    const trades = await ctx.db.query("trades")
      .withIndex("by_personaId", (q) => q.eq("personaId", args.personaId))
      .collect();

    const dailyData = new Map<string, { profit: number; sellCount: number }>();

    for (const trade of trades) {
      const date = new Date(trade._creationTime);
      const dateKey = date.toISOString().split('T')[0];

      const existing = dailyData.get(dateKey) || { profit: 0, sellCount: 0 };
      dailyData.set(dateKey, {
        profit: existing.profit + trade.profitMade,
        sellCount: existing.sellCount + 1,
      });
    }


    let profitWhole = 0;
    let sellCountWhole = 0;
    const profitChart = Array.from(dailyData.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, data]) => {
        profitWhole += data.profit;
        sellCountWhole += data.sellCount;
        return {
          date,
          profitInDay: data.profit,
          sellCountInDay: data.sellCount,
          profitInTotal: profitWhole,
          sellCountInTotal: sellCountWhole,
        };
      });

    return profitChart;
  },
});