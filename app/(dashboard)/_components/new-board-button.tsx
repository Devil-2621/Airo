"use client";

import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {useRouter} from 'next/navigation';

interface NewBoardButtonProps {
    orgId: string,
    disabled?: boolean,
};

export const NewBoardButton = ({
    orgId, disabled,
}: NewBoardButtonProps) => {
    const router = useRouter();
    const { mutate, pending } = useApiMutation(api.board.create);
    
    const onClick = () => {
        mutate({
            orgId, title: 'Untitled'
        })
            .then((id) => {
                toast.success('Board created successfully');
                // router.push(`/board/${id}`);

                // TODO: Redirect to board/{id}
            })
            .catch(() => toast.error('Failed to create board'));
    }

    return (
        <button
            disabled={ pending || disabled }
            onClick={ onClick }
            className={ cn("col-span-1 aspect-[100/127] bg-violet-600 rounded-lg hover:bg-violet-800 flex flex-col items-center justify-center py-6",
            (pending || disabled) && 'opacity-75 hover:bg-violet-600 cursor-not-allowed'
            )}>
            <div />
            <Image
                src='/icons/Plus.svg'
                alt="Create Board Plus icon"
                height={ 40 }
                width={ 40 }
                className=""
            />
            <p className="text-md text-white font-light">
                New Board
            </p>
        </button>
    );
};