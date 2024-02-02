'use client';

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "./ui/dropdown-menu";
import { ConfirmModal } from "@/components/confirm-modal";

import { useApiMutation } from "@/hooks/use-api-mutation";

import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps['side'];
    sideOffset?: DropdownMenuContentProps['sideOffset'];
    id: string;
    title: string;
};

export const Actions = ({
    children, side, sideOffset, id, title
}: ActionProps) => {
	const { onOpen } = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard.writeText(
        `${window.location.origin}/board/${id}`,
        )
            .then(() => toast.success('Link copied!'))
            .catch(() => toast.error('Failed to copy link'))
    }
    
    const onDelete = () => {
        mutate({ id })
			.then(() => toast.success('Board deleted successfully'))
			.catch(() => toast.error('Failed to delete board'));
    }

    return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent
					side={side}
					sideOffset={sideOffset}
					onClick={(e) => e.stopPropagation()}
					className='w-60'
				>
					<DropdownMenuItem
						onClick={onCopyLink}
						className='px-1 py-3 cursor-pointer gap-2'
					>
						<Link
							href='/'
							className='h-4 w-4 mr-2'
						/>
						<Image
							src='/icons/Copy.svg'
							alt='Copy icon'
							width={28}
							height={28}
							className='shadow-sm rounded-lg'
						/>
						Copy board link
                </DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => onOpen(id, title)}
						className='px-1 py-3 cursor-pointer gap-2'
					>
						<Link
							href='/'
							className='h-4 w-4 mr-2'
						/>
						<Image
							src='/icons/Edit2.svg'
							alt='Copy icon'
							width={28}
							height={28}
							className='shadow-sm rounded-lg'
						/>
						Rename this board
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <ConfirmModal
                    header="Delete board?"
                    description="This will delete the board and all of its contents."
                    disabled={ pending }
                    onConfirm={onDelete}
                >
					<Button
                        variant='ghost'
						className='px-1 py-3 cursor-pointer text-sm w-full justify-start  text-red-400 hover:text-red-500 font-extrabold h-full gap-2 bg-red-50 hover:bg-red-100'
					>
						<Link
							href='/'
							className='h-4 w-4 mr-2'
						/>
						<Image
							src='/icons/Trash.svg'
							alt='Trash icon'
							width={28}
							height={28}
							className='shadow-sm rounded-lg'
						/>
						Delete this board
					</Button>
                </ConfirmModal>
				</DropdownMenuContent>
			</DropdownMenu>
		);
}