'use client';

interface DisplayRoomProps {
	params: {
		boardId: string;
		noteId: string;
	};
}

import { usePathname } from 'next/navigation';
import BoardIdPage from './board/[boardId]/page';
import NoteIdPage from './note/[noteId]/page';

export default function DisplayRoom({ params }: DisplayRoomProps) {
	const path = usePathname();
	const currentPath = path.includes('board').toString();
	console.log(currentPath);

	return (
		<>
			{currentPath == 'true' ? (
				<BoardIdPage params={params} />
			) : (
				<NoteIdPage params={params} />
			)}
		</>
	);
}
