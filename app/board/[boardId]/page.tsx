import { Room } from '@/components/room';
import React from 'react';
import { Loading } from './_components/loading';
import { Canvas } from './_components/canvas';

interface BoardIdPageProps {
    params: {
      boardId: string;
    };
}

const BoardIdPage = (
    {
      params,
    }: BoardIdPageProps
) => {

  // return <Loading/>;

  return (
		<Room
			roomId={params.boardId}
			fallback={<Loading />}
		>
			<Canvas boardId={params.boardId} />
		</Room>
	);
}

export default BoardIdPage