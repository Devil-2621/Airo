"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { useOrganizations } from "@clerk/nextjs/app-beta/client";
import { Hint } from "@/components/hint";

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
};

export const Item = ({
    id, name, imageUrl,
}: ItemProps) => {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const isActive = organization?.id === id;

    const onClick = () => {
        if (!setActive) return;

        setActive({ organization: id });
    }

    return (
			<div className='aspect-square relative'>
            <Hint
                label={ name }
                side="right"
                align="start"
                sideOffset={18}
            >
					<Image
						src={imageUrl}
						alt={name}
						onClick={onClick}
						fill
						className={cn(
							'rounded-lg cursor-pointer opacity-75 hover:opacity-100 transition bg-[#6bffdf]/60 hover:bg-[#6bffdf]',
							isActive && 'opacity-100 bg-[#6bffdf]'
						)}
					/>
				</Hint>
			</div>
		);
}