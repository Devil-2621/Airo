import { Skeleton } from "@/components/ui/skeleton"

export const Participants = () => {
    return(
        <div
        className="h-12 mr-4 p-2 flex items-center justify-center bg-white rounded-md shadow-md"
        >
            List of users
        </div>
    )
}


Participants.Skeleton = function ParticipantsSkeleton(){
    return (
			<div
				className='bg-white rounded-md shadow-md w-[100px]'
			>
				<Skeleton className='h-full w-full bg-slate-300' />
			</div>
		);
}