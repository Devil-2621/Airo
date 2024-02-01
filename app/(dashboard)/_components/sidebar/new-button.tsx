"use client"

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Hint } from "@/components/hint";

export const NewButton = () => {
    return (
			<Dialog>
				<DialogTrigger asChild>
					<div className='aspect-square'>
                    <Hint
                        label="Create organization"
                        side="right"
                        align="start"
                        sideOffset={18}
                    >
							<button className='bg-[#6bffdf]/60 h-full w-full rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-[#6bffdf]/90 transition shadow-lg  hover:shadow-violet-600/70'>
								<Plus />
							</button>
						</Hint>
					</div>
				</DialogTrigger>
				<DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
					<CreateOrganization
					// appearance={ {
					//         elements: { pageScrollBox: 'bg-[#e8a178]/50', },

					// 	}}
					/>
				</DialogContent>
			</Dialog>
		);
};