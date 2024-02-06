'use client';

import Link from 'next/link';
import Image from 'next/image';

import { OrganizationSwitcher } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';


export const OrgSidebar = () => {
	const searchParams = useSearchParams();
	const favorites = searchParams.get('favorites');

	return (
		<div className='hidden lg:flex flex-col space-y-6 w-[206px] px-3 pt-5 sticky'>
			<Link href='/'>
				<div className='flex items-center gap-x-2 rounded-full mx-8 fixed'>
					<Image
						src='/logo.png'
						alt='Logo'
						height={120}
						width={120}
						className='h-auto w-auto'
					/>
				</div>
			</Link>
			<div className='text-wrap fixed max-w-48 top-24'>
				<OrganizationSwitcher
					hidePersonal
					appearance={{
						elements: {
							rootBox: {
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
							},
							organizationSwitcherTrigger: {
								padding: '6px',
								width: '100%',
								borderRadius: '8px',
								border: '1px solid #E5E7EB',
								justifyContent: 'space-between',
								backgroundColor: 'white',
								marginLeft: '10px',
								marginRight: '8px',

							},
						},
					}}
				/>
			</div>
			<div className='space-y-1 w-full'>
				<Button
					variant={favorites ? 'ghost' : 'secondary'}
					asChild
					size='lg'
					className='font-normal justify-start px-1 w-full gap-2 text-wrap fixed max-w-48 top-48'
				>
					<Link href='/'>
						{/* <LayoutDashboard className='h-4 w-4 mr-2' /> */}
						<Image
							src='/icons/Category2.svg'
							alt='TeamBoard icon'
							height={32}
							width={32}
							className='h-8 w-8'
						/>
						Team boards & notes
					</Link>
				</Button>
				<Button
					variant={favorites ? 'secondary' : 'ghost'}
					asChild
					size='lg'
					className='font-normal justify-start px-1 w-full gap-2 text-wrap fixed max-w-48 top-60'
				>
					<Link
						href={{
							pathname: '/',
							query: { favorites: true },
						}}
					>
						{/* <Star className='h-4 w-4 mr-2' /> */}
						<Image
							src='/icons/Star.svg'
							alt='Favorites icon'
							height={32}
							width={32}
							className='h-8 w-8'
						/>
						Favorite boards & notes
					</Link>
				</Button>
			</div>
		</div>
	);
};
