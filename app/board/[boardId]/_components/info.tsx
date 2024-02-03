import { Skeleton } from '@/components/ui/skeleton';
export const Info = () => {
    return (
			<div className='h-12 p-2 flex items-center justify-center bg-white rounded-md shadow-md '>
				TODO: The Information about the board
			</div>
		);
}


Info.Skeleton = function InfoSkeleton(){
    return (
			<div
				className='h-12 bg-white rounded-md shadow-md w-[300px]
        '
			>
				<Skeleton className='h-full w-full bg-slate-300' />
			</div>
		);
}