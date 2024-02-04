'use client';

interface InfoProps {
	boardId: string;
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
import { useRenameModal } from '@/store/use-rename-modal';
import { Actions } from '@/components/actions';

const pop = Poppins({
	subsets: ['latin'],
	weight: '600'
});

export const Info = ({
	boardId,
}: InfoProps) => {
	const { onOpen } = useRenameModal();
	const data = useQuery(api.board.get, {
		id: boardId as Id<'boards'>,
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
			<Actions
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
			</Actions>
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
