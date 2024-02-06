'use client';

import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';

import { EmptyNotes } from './empty-notes';
import { EmptyFavorites } from '../empty-favorites';
import { EmptySearch } from '../empty-search';
import { NewNoteButton } from './new-note-button';
import { NoteCard } from '../note-card';

interface NoteListProps {
	orgId: string;
	query: {
		search?: string;
		favorites?: string;
	};
}

export const NoteList = ({ orgId, query }: NoteListProps) => {
	const data = useQuery(api.notes.get, { orgId,...query });

	if (data === undefined) {
		return (
			<div>
				<h2 className='text-3xl font-semibold'>
					{query.favorites ? 'Favorites Notes' : 'Team Notes'}
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:;grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
					<NewNoteButton
						orgId={orgId}
						disabled
					/>
					<NoteCard.Skeleton />
					<NoteCard.Skeleton />
					<NoteCard.Skeleton />
					<NoteCard.Skeleton />
					<NoteCard.Skeleton />
					<NoteCard.Skeleton />
				</div>
			</div>
		);
	}
	if (!data?.length && query.search) {
		return <EmptySearch />;
	}

	if (!data?.length && query.favorites) {
		return <EmptyFavorites />;
	}

	if (!data?.length) {
		return <EmptyNotes />;
	}

	return (
		<div>
			<h2 className='text-3xl font-semibold'>
				{query.favorites ? 'Favorites Notes' : 'Team Notes'}
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:;grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
				<NewNoteButton orgId={orgId} />
				{data.map((note) => (
					<NoteCard
						key={note._id}
						id={note._id}
						title={note.title}
						imageUrl={note.imageUrl}
						authorId={note.authorId}
						authorName={note.authorName}
						createdAt={note._creationTime}
						orgId={note.orgId}
						isFavorite={note.isFavorite}
					/>
				))}
			</div>
		</div>
	);
};
