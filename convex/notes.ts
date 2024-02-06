import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorites: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized');
        }

        if(args.favorites){
            const favoritednotes = await ctx.db
            .query('userNoteFavorites')
            .withIndex('by_user_org', (q) => 
            q
            .eq('userId', identity.subject)
            .eq('orgId', args.orgId)
            )
            .order('desc')
            .collect();

            const ids = favoritednotes.map((b) => b.noteId);

            const notes = await getAllOrThrow(ctx.db, ids);

            return notes.map((note) => ({
            ...note,
            isFavorite: true,
            }));

        }

        const title = args.search as string;
        let notes = [];

        if (title) {
            notes = await ctx.db
            .query('notes')
            .withSearchIndex('search_title', (q) => 
            q
            .search('title', title)
            .eq("orgId",args.orgId)
)
.collect();
        }
        else{

    notes = await ctx.db
            .query('notes')
            .withIndex('by_org', (q) => q.eq('orgId', args.orgId))
            .order('desc')
            .collect();
        }
        
        const notesWithFavoriteRelation = notes.map((note) => {
            return ctx.db
                .query('userNoteFavorites')
                .withIndex('by_user_note', (q) =>
                    q
                        .eq('userId', identity.subject)
                        .eq('noteId', note._id)
                )
                .unique()
                .then((favorite) => {
                    return {
                        ...note,
                        isFavorite: !!favorite,
                    };
                });
        });
        
        const notesWithFavoriteBoolean = Promise.all(notesWithFavoriteRelation);
        
        return notesWithFavoriteBoolean;
    },
});