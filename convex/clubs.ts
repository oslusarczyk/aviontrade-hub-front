import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addClub = mutation({
    args: {
        personaId: v.number(),
        clubName: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {

        return await ctx.db.insert("clubs", {
            userId: args.userId,
            personaId: args.personaId,
            clubName: args.clubName,
        });
    },
});

export const getClubs = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("clubs")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .collect();
    },
});
