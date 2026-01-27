import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addPlayer = mutation({
  args: {
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
    position: v.string(),
    PAC: v.number(),
    SHO: v.number(),
    PAS: v.number(),
    DRI: v.number(),
    DEF: v.number(),
    PHY: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("players")
      .withIndex("by_itemId", (q) => q.eq("itemId", args.itemId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return { id: existing._id, updated: true };
    }

    const id = await ctx.db.insert("players", args);
    return { id, updated: false };
  },
});

export const addPlayers = mutation({
  args: {
    players: v.array(
      v.object({
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
        position: v.string(),
        PAC: v.number(),
        SHO: v.number(),
        PAS: v.number(),
        DRI: v.number(),
        DEF: v.number(),
        PHY: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const player of args.players) {
      const existing = await ctx.db
        .query("players")
        .withIndex("by_itemId", (q) => q.eq("itemId", player.itemId))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, player);
        results.push({ id: existing._id, updated: true });
      } else {
        const id = await ctx.db.insert("players", player);
        results.push({ id, updated: false });
      }
    }
    return results;
  },
});

