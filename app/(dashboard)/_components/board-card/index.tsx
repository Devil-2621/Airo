"use client"

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { Footer } from "./footer";

import { Skeleton } from "@/components/ui/skeleton";

import { formatDistanceToNow } from 'date-fns';
import { useAuth } from "@clerk/nextjs";

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavorite,
}: BoardCardProps) => {
    const { userId } = useAuth();

    const authorLabel = userId === authorId ? 'You' : 'AuthorName';
    const createdAtlabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    return (
			<Link href={`/board/${id}`}>
				<div className='group aspect-[100/127] border shadow-lg hovershadow-xl hover:shadow-violet-300 rounded-lg flex flex-col justify-between overflow-hidden'>
					<div className='relative flex-1 bg-amber-50'>
						<Image
							src={imageUrl}
							alt={title}
							fill
                        className='object-fit'
                        priority={true}
						/>
						<Overlay />
					</div>
					<Footer
						isFavorite={isFavorite}
						title={title}
						authorLabel={authorLabel}
						createdAtLabel={createdAtlabel}
						onClick={() => {}}
						disabled={false}
					/>
				</div>
			</Link>
		);
};

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    )
}