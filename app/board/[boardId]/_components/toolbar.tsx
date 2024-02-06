import { Skeleton } from '@/components/ui/skeleton';
import { ToolButton } from './tool-button';
import {
	Circle,
	MousePointer2,
	Pen,
	Redo,
	Square,
	StickyNote,
	Type,
	Undo,
} from 'lucide-react';
import { CanvasState, CanvasMode, LayerType } from '../../../../types/canvas';

interface ToolbarProps {
	canvasState: CanvasState;
	setCanvasState: (newState: CanvasState) => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
}

export const Toolbar = ({
	canvasState,
	setCanvasState,
	undo,
	redo,
	canUndo,
	canRedo,
}: ToolbarProps) => {
	return (
		<div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
			<div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
				<ToolButton
					label='Select'
					icon={MousePointer2}
					onClick={() => setCanvasState({ mode: CanvasMode.None })}
					isActive={
						canvasState.mode === CanvasMode.None ||
						canvasState.mode === CanvasMode.Selectionnet ||
						canvasState.mode === CanvasMode.Pressing ||
						canvasState.mode === CanvasMode.Resizing ||
						canvasState.mode === CanvasMode.Translating
					}
					isDisabled={false}
				/>
				<ToolButton
					label='Text'
					icon={Type}
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Text,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Text
					}
					isDisabled={false}
				/>
				<ToolButton
					label='Sticky Note'
					icon={StickyNote}
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Note,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Note
					}
					isDisabled={false}
				/>
				<ToolButton
					label='Rectangle'
					icon={Square}
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Rectangle,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Rectangle
					}
					isDisabled={false}
				/>
				<ToolButton
					label='Ellipse'
					icon={Circle}
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Ellipse,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Ellipse
					}
					isDisabled={false}
				/>
				<ToolButton
					label='Pen'
					icon={Pen}
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.Pencil,
						})
					}
					isActive={canvasState.mode === CanvasMode.Pencil}
					isDisabled={false}
				/>
			</div>
			<div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
				<ToolButton
					label='Undo'
					icon={Undo}
					onClick={undo}
					isActive={false}
					isDisabled={!canUndo}
				/>
				<ToolButton
					label='Redo'
					icon={Redo}
					onClick={redo}
					isActive={false}
					isDisabled={!canRedo}
				/>
			</div>
		</div>
	);
};

export const ToolbarSkeleton = () => {
	return (
		<div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[56px] shadow-md rounded-md p-2'>
			<Skeleton className='h-full w-full bg-slate-300' />
		</div>
	);
};
