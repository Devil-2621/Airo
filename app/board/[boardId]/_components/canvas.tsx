"use client";

import { useState } from 'react';
import {CanvasMode,CanvasState} from "../../../../types/canvas";
import React from 'react'
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { Status } from '../_components/status';
import { LostConnectionToasts } from '../_components/lost-connection-toast';
import { useHistory,useCanUndo,useCanRedo } from '@/liveblocks.config';

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({
  boardId,
}: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();


  return (
    <main
    className='h-full w-full relative bg-neutral-100 touch-none'
    >
      <Info boardId={boardId} />
      <Participants />
      <div className='absolute right-2 bottom-3'>
      <Status />
      </div>
      <Toolbar 
      canvasState={canvasState}
      setCanvasState={setCanvasState}
      undo={history.undo}
      redo={history.redo}
      canUndo={canUndo}
      canRedo={canRedo}

      />
      <LostConnectionToasts />
    </main>
  )
}

export default Canvas
