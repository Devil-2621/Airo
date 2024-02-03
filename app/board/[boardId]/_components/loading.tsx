'use client';

import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';
import Image from 'next/image';
// import { Loader } from "lucide-react";
// import { InfoSkeleton } from "./info";
// import { ToolbarSkeleton, Toolbar } from './toolbar';
// import { ParticipantsSkeleton } from "./participants";

export const Loading = () => {
	return (
		<main className='h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
			{/* <Loader className="h-6 w-6 text-muted-foreground animate-spin" /> */}
			<Image
				src='/loader2.gif'
				alt='loader'
				width={220}
				height={220}
				priority={true}
			/>
			<Info.Skeleton />
			<Participants.Skeleton />
			<Toolbar.Skeleton />
		</main>
	);
};
