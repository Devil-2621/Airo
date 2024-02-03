import { Skeleton } from '@/components/ui/skeleton';
export const Info = () => {
	return (
		<div className='absolute top-2 left-2 bg-white  rounded-md p-2 h-12 flex items-center shadow-md'>
			TODO: The Information about the board
		</div>
	);
};

Info.Skeleton = function InfoSkeleton() {
	return (
		<div
			className='absolute top-2 left-2 bg-white rounded-md p-2 h-12 flex items-center shadow-md w-[300px]'
		>
			<Skeleton className='h-full w-full bg-slate-300' />
		</div>
	);
};
