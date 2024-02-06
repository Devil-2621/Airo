import { Room } from '@/components/room';
import React from 'react';
import { Loading } from './_components/loading';
import Canvas from './_components/canvas';

interface NoteIdPageProps {
	params: {
		noteId: string;
	};
}

const NoteIdPage = ({ params }: NoteIdPageProps) => {
	// return <Loading/>;

	return (
		<Room
			roomId={params.noteId}
			fallback={ <Loading /> }
		>
			<Canvas noteId={params.noteId} />
		</Room>
	);
};

export default NoteIdPage;
