import { InfoSkeleton } from './info';
import { ParticipantsSkeleton } from './participants';
import Image from 'next/image';

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
			<InfoSkeleton />
			<ParticipantsSkeleton />
		</main>
	);
};
