'use client';

import Link from 'next/link';
import Image from 'next/image';

import { LayoutDashboard, Star } from 'lucide-react';
import { OrganizationSwitcher } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';


export const OrgSidebar = () => {
	const searchParams = useSearchParams();
	const favorites = searchParams.get('favorites');

	return (
		<div className='hidden lg:flex flex-col space-y-6 w-[206px] px-3 pt-5'>
			<Link href='/'>
				<div className='flex items-center gap-x-2 rounded-full mx-8'>
					<Image
						src='/logo.png'
						alt='Logo'
						height={120}
						width={120}
					/>
				</div>
			</Link>
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
						},
					},
				}}
			/>
			<div className='space-y-1 w-full'>
				<Button
					variant={favorites ? 'ghost' : 'secondary'}
					asChild
					size='lg'
					className='font-normal justify-start px-2 w-full'
				>
					<Link href='/'>
						<LayoutDashboard className='h-4 w-4 mr-2' />
						Team boards
					</Link>
				</Button>
				<Button
					variant={favorites ? 'secondary' : 'ghost'}
					asChild
					size='lg'
					className='font-normal justify-start px-2 w-full'
				>
					<Link
						href={{
							pathname: '/',
							query: { favorites: true },
						}}
					>
						<Star className='h-4 w-4 mr-2' />
						Favorite boards
					</Link>
				</Button>
			</div>
		</div>
	);
};
