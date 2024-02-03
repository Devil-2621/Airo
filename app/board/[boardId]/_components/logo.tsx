import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
export const CanvasLogo = () => {
	return (
		<div className='max-sm:hidden h-12 p-2 flex items-center justify-center bg-white rounded-md shadow-md'>
			<Link href='/'>
				<Image
					src='/logo.png'
					alt='Canvas Logo'
					width={90}
					height={90}
				/>
			</Link>
		</div>
	);
};

CanvasLogo.Skeleton = function CanvasLogoSkeleton() {
	return (
		<div
			className='h-12 bg-white rounded-md shadow-md w-[300px]
        '
		>
			<Skeleton className='h-full w-full bg-slate-300' />
		</div>
	);
};
