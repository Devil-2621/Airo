"use client";

import React from 'react'
import { Info } from "./info"
import { Participants } from "./participants"
import { Status } from '../_components/status';
import { LostConnectionToasts } from '../_components/lost-connection-toast';
import { CollaborativeEditor } from './editor';

interface CanvasProps {
    noteId: string;
}

export const Canvas = ({
  noteId,
}: CanvasProps) => {
  return (
		<main className='w-full h-full relative flex flex-col bg-neutral-200 touch-none scroll-smooth z-10'>
				<Info noteId={noteId} />
				<Participants />
				<div className='absolute right-2 bottom-3'>
					<Status />
				</div>
				<CollaborativeEditor />
				<LostConnectionToasts />
		</main>
	);
}

export default Canvas
