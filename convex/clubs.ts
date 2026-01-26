import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addClub = mutation({
    args: {
        personaId: v.number(),
        clubName: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const existingClub = await ctx.db
            .query("clubs")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .filter((q) => q.eq(q.field("personaId"), args.personaId))
            .first();

        if (existingClub) {
            throw new Error("Club with this persona already exists for this user");
        }

        return await ctx.db.insert("clubs", {
            userId: args.userId,
            personaId: args.personaId,
            clubName: args.clubName,
        });
    },
});

export const getUserClubs = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const clubs = await ctx.db
            .query("clubs")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .collect();
        return clubs;
    },
});
