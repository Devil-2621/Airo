"use client";

import { useCallback, useState } from 'react';
import {Camera, CanvasMode,CanvasState} from "../../../../types/canvas";
import React from 'react'
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { Status } from '../_components/status';
import { LostConnectionToasts } from '../_components/lost-connection-toast';
import { 
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation

} from '@/liveblocks.config';
import { pointerEventToCanvasPoint } from '@/lib/utils';

import { CursorPresence } from './cursors-presence';



interface CanvasProps {
    boardId: string;
}

export const Canvas = ({
  boardId,
}: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({x:0,y:0});

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    // console.log({
    //   x:e.deltaX,
    //   y:e.deltaY});
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);


  



const onPointerMove = useMutation(({setMyPresence},e:React.PointerEvent
  ) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e,camera);

    setMyPresence({cursor:current});
  },[])


  const onPointerLeave = useMutation((
    {setMyPresence}) => {
      setMyPresence({cursor:null});
    },[])

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
      <svg
              className="h-[100vh] w-[100vw]"
              onWheel={onWheel}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorPresence/>

        </g>
      </svg>
      <LostConnectionToasts />
    </main>
  )
}

export default Canvas
