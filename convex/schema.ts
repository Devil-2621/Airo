import { v } from 'convex/values';
import { defineSchema, defineTable } from 'convex/server';

export default defineSchema({
    boards: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string(),
    })
        .index('by_org', ['orgId'])
        .searchIndex('search_title', {
            searchField: 'title',
            filterFields: ['orgId']
        }),
    userFavorites: defineTable({
        orgId: v.string(),
        userId: v.string(),
        boardId: v.id('boards'),
    })
    .index('by_board', ['boardId'])
    .index('by_user_org', ['userId', 'orgId'])
    .index('by_user_board', ['userId', 'boardId'])
    .index('by_user_board_org', ['userId', 'boardId', 'orgId']),
    // notes: defineTable({
    //     title: v.string(),
    //     orgId: v.string(),
    //     authorId: v.string(),
    //     authorName: v.string(),
    //     imageUrl: v.string(),
    // })
    //     .index('by_org', ['orgId'])
    //     .searchIndex('search_title', {
    //         searchField: 'title',
    //         filterFields: ['orgId']
    //     }),
    // userNoteFavorites: defineTable({
    //     orgId: v.string(),
    //     userId: v.string(),
    //     noteId: v.id('notes'),
    // })
    // .index('by_note', ['noteId'])
    // .index('by_user_org', ['userId', 'orgId'])
    // .index('by_user_note', ['userId', 'noteId'])
    // .index('by_user_note_org', ['userId', 'noteId', 'orgId'])
});