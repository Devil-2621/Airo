import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import { Circle, MousePointer2, Pen, Redo, Square, StickyNote, Type, Undo } from "lucide-react";

export const Toolbar = () => {
  return (
		<div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
			<div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
				<ToolButton
					label='Select'
					icon={MousePointer2}
					onClick={() => {}}
					isActive={false}
					isDisabled={false}
				/>
				<ToolButton
					label='Text'
					icon={Type}
					onClick={() => {}}
					isActive={false}
					isDisabled={false}
				/>
				<ToolButton
					label='Sticky Note'
					icon={StickyNote}
					onClick={() => {}}
					isActive={false}
					isDisabled={false}
				/>
				<ToolButton
					label='Rectangle'
					icon={Square}
					onClick={() => {}}
					isActive={false}
					isDisabled={false}
				/>
				<ToolButton
					label='Cirlce'
					icon={Circle}
					onClick={() => {}}
					isActive={false}
					isDisabled={false}
				/>
				<ToolButton
					label='Pen'
					icon={Pen}
					onClick={() => {}}
					isActive={false}
					isDisabled={false}
				/>
			</div>
			<div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
				<ToolButton
					label='Undo'
					icon={Undo}
					onClick={() => {}}
					isActive={false}
					isDisabled={true}
				/>
				<ToolButton
					label='Redo'
					icon={Redo}
					onClick={() => {}}
					isActive={false}
					isDisabled={true}
				/>
			</div>
		</div>
	);
};



export const ToolbarSkeleton = () => {
  return(
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[56px] shadow-md rounded-md p-2">
      <Skeleton className="h-full w-full bg-slate-300" />
    </div>
    
  )
}
