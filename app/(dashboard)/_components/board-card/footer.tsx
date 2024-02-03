import Image from 'next/image';
import FavSelected from '../../../../public/icons/Fav-Selected-Star.svg';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface FooterProps {
	title: string;
	authorLabel: string;
	createdAtLabel: string;
	isFavorite: boolean;
	onClick: () => void;
	disabled: boolean;
};

export const Footer = ({
	title,
	authorLabel,
	createdAtLabel,
	isFavorite,
	onClick,
	disabled,
}: FooterProps) => {
    const handleClick = (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>
		) => {
			event.stopPropagation();
			event.preventDefault();

			onClick();
    };
    
    return (
			<div className='relative bg-white p-3'>
				<p className='text-[13px] truncate max-w-[calc(100%-20px)]'>{title}</p>
				<p className='opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate'>
					{authorLabel}, {createdAtLabel}
				</p>
				<button
					disabled={disabled}
					onClick={handleClick}
					className={cn(
						'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600',
						disabled && 'cursor-not-allowed opacity-75'
					)}
			>
				{
					isFavorite ? (
					<Image
						src='/icons/Fav-Selected-Star.svg'
						alt='Favorite Selected icon'
						width={25}
						height={25}
						className='opacity-80'
					/>
					) : (<Image
						src='/icons/Star.svg'
						alt='Favorite icon'
						width={25}
						height={25}
						className='opacity-85 hover:opacity-100'
					/>
					)
				}
					{/* <Image
						src='/icons/Star-Fav.svg'
						alt='Favorite icon'
						width={25}
						height={25}
						className={cn(isFavorite && '.favselected')}
					/> */}
					{/* <Star
						className={cn(
							'h-4 w-4',
							isFavorite && 'fill-blue-600 text-blue-600'
						)}
					/> */}
				</button>
			</div>
		);
};