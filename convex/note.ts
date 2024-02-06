import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

const images = [
    '/placeholders/1.svg',
    '/placeholders/2.svg',
    '/placeholders/3.svg',
    '/placeholders/4.svg',
    '/placeholders/5.svg',
    '/placeholders/6.svg',
    '/placeholders/7.svg',
    '/placeholders/8.svg',
    '/placeholders/9.svg',
    '/placeholders/10.svg',
    '/placeholders/11.svg',
    '/placeholders/12.svg',
    '/placeholders/13.svg',
    '/placeholders/14.svg',
    '/placeholders/15.svg',
    '/placeholders/16.svg',
    '/placeholders/17.svg',
    '/placeholders/18.svg',
    '/placeholders/19.svg',
    '/placeholders/20.svg',
    '/placeholders/21.svg',
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) { 
            throw new Error('Unauthorized');
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const note = await ctx.db.insert('notes', {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        });

        return note;
    }
})

export const remove = mutation({
    args: { id: v.id('notes') },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        
        if (!identity) {
            throw new Error('Unauthorized');
        }

        const userId = identity.subject;
        
        const existingFavorite = await ctx.db
            .query('userNoteFavorites')
            .withIndex('by_user_note', (q) => 
                q
                    .eq('userId', userId)
                    .eq('noteId', args.id)
            )
            .unique();
        
        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id);
        };

        await ctx.db.delete(args.id);
    },
});

export const update = mutation({
    args: { id: v.id('notes'), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized');
        };

        const title = args.title.trim();

        if (!title) {
            throw new Error('Title is required');
        };

        if (title.length > 60) {
            throw new Error('Title cannot be longer than 60 characters')
        };

        const note = await ctx.db.patch(args.id, {
            title: args.title,
        });

        return note;
    },
});

export const favorite = mutation({
    args: { id: v.id('notes'), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized');
        }

        const note = await ctx.db.get(args.id);

        if (!note) {
            throw new Error('note not found');
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query('userNoteFavorites')
            .withIndex('by_user_note', (q) =>
                q
                    .eq('userId', userId)
                    .eq('noteId', note._id)
            )
            .unique();
        
        if (existingFavorite) {
            throw new Error('note already favorited');
        }

        await ctx.db.insert('userNoteFavorites', {
            userId,
            noteId: note._id,
            orgId: args.orgId,
        });

        return note;
    },
});

export const unfavorite = mutation({
	args: { id: v.id('notes')},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Unauthorized');
		}

		const note = await ctx.db.get(args.id);

		if (!note) {
			throw new Error('note not found');
		}

		const userId = identity.subject;

		const existingFavorite = await ctx.db
			.query('userNoteFavorites')
			.withIndex('by_user_note', (q) =>
                q
                    .eq('userId', userId)
                    .eq('noteId', note._id)
                // TODO: Check if orgId needed
			)
			.unique();

		if (!existingFavorite) {
			throw new Error('favorited note not found');
		}

        await ctx.db.delete(existingFavorite._id);

		return note;
	},
});

export const get = query({
    args: { id: v.id('notes') },
    handler: async (ctx, args) => {
        const note = ctx.db.get(args.id);

        return note;
    },
});