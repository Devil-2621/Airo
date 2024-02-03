"use client";

import React from 'react'
import {Info} from "./info"
import {Participants} from "./participants"
import {Toolbar} from "./toolbar"
import { CanvasLogo } from './logo';

interface CanvasProps {
    boardId: string;
}

const Canvas = ({
    boardId,
}: CanvasProps) => {
  return (
    <main
    className='h-full w-full relative bg-neutral-100 touch-none'
    >
      <header className='bg-transparent w-full flex justify-between items-center m-2 fixed'>
      <Info />
      <CanvasLogo />
      <Participants/>
      </header>
      <Toolbar/>
    </main>
  )
}

export default Canvas
