"use client";

import React from 'react'
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { useSelf } from '@/liveblocks.config';
import { Status } from '../_components/status';
import { LostConnectionToasts } from '../_components/lost-connection-toast';

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({
  boardId,
}: CanvasProps) => {
  const info = useSelf((me) => me.info);

  return (
    <main
    className='h-full w-full relative bg-neutral-100 touch-none'
    >
      <Info />
      <Participants />
      <div className='absolute right-2 bottom-3'>
      <Status />
      </div>
      <Toolbar />
      <LostConnectionToasts />
    </main>
  )
}

export default Canvas
