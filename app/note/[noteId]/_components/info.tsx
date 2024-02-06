'use client';

interface InfoProps {
	noteId: string;
};

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Hint } from '@/components/hint';
import { Separator } from '@/components/ui/separator';
import { useNoteRenameModal } from '@/store/use-note-rename-modal';
import { NoteActions } from '@/app/(dashboard)/_components/note/note-actions';

const pop = Poppins({
	subsets: ['latin'],
	weight: '600'
});

export const Info = ({
	noteId,
}: InfoProps) => {
	const { onOpen } = useNoteRenameModal();
	const data = useQuery(api.note.get, {
		id: noteId as Id<'notes'>,
	});

	if (!data) {
		return <InfoSkeleton />;
	}

	return (
		<div className='absolute top-2 left-2 bg-white  rounded-md p-2 h-12 flex items-center shadow-md'>
			<Hint
				label='Go to boards'
				side='bottom'
				sideOffset={10}
			>
				<Button
					asChild
					className='px-2'
					variant='board'
				>
					<Link href='/'>
						<Image
							src='/logo.png'
							alt='Board Logo'
							height={40}
							width={55}
							className='rounded-full h-auto w-auto'
						/>
						<span className={cn('text-black text-lg pl-2', pop.className)}>
							Airo Board
						</span>
					</Link>
				</Button>
			</Hint>
			<Separator
				orientation='vertical'
				className='m-1 w-0.5'
			/>
			<Hint
				label='Edit title'
				side='bottom'
				sideOffset={10}
			>
				<Button
					variant='board'
					onClick={() => onOpen(data._id, data.title)}
					className='text-base font-normal px-2'
				>
					{data.title}
				</Button>
			</Hint>
			<Separator orientation='vertical' className='w-0.5 m-1' />
			<NoteActions
				id={ data._id }
				title={ data.title }
				side='bottom'
				sideOffset={10}
			>
				<div>
					<Hint label='Main Menu' side='bottom' sideOffset={10}>
						<Button size='icon' variant='board'>
							<Image
								src='/icons/Burger.svg'
								alt='Menu icon'
								width={ 30 }
								height={2}
							/>
					</Button>
					</Hint>
				</div>
			</NoteActions>
		</div>
	);
};

export const InfoSkeleton = () => {
	return (
		<div
			className='absolute top-2 left-2 bg-white rounded-md p-2 h-12 flex items-center shadow-md w-[300px]'
		>
			<Skeleton className='h-full w-full bg-slate-300' />
		</div>
	);
};
