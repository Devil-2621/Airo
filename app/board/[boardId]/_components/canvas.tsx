'use client';

import { useCallback, useMemo, useState } from 'react';
import {
	Camera,
	CanvasMode,
	CanvasState,
	Color,
	LayerType,
	Point,
} from '../../../../types/canvas';
import React from 'react';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';
import { Status } from '../_components/status';
import { LostConnectionToasts } from '../_components/lost-connection-toast';
import {
	useHistory,
	useCanUndo,
	useCanRedo,
	useMutation,
	useStorage,
	useOthersMapped,
} from '@/liveblocks.config';
import { connectionIdToColor, pointerEventToCanvasPoint } from '@/lib/utils';

import { CursorPresence } from "./cursors-presence";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { update } from '../../../../convex/board';
import { set } from "date-fns";
const MAX_LAYERS = 100;

interface CanvasProps {
	boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);

	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.None,
	});
	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
	const [lastUsedColor, setLastUsedColor] = useState<Color>({
		g: 0,
		r: 0,
		b: 0,
	});

	const history = useHistory();
	const canUndo = useCanUndo();
	const canRedo = useCanRedo();

	const insertLayer = useMutation(
		(
			{ storage, setMyPresence },
			LayerType:
				| LayerType.Ellipse
				| LayerType.Rectangle
				| LayerType.Text
				| LayerType.Note,
			position: Point
		) => {
			const liveLayers = storage.get('layers');
			if (liveLayers.size >= MAX_LAYERS) {
				return;
			}

			const liveLayerIds = storage.get('layerIds');
			const layerId = nanoid();
			const layer = new LiveObject({
				type: LayerType,
				x: position.x,
				y: position.y,
				height: 100,
				width: 100,
				fill: lastUsedColor,
			});

			liveLayerIds.push(layerId);
			liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );
  

  const translateSelectedLayer = useMutation((
    { storage, self },
    point: Point,
  ) => {
    if (canvasState.mode !== CanvasMode.Translating) {
      return;
    }


    const offset ={
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y,
    };
    

    const liveLayers = storage.get("layers");
    for (const id of self.presence.selection) {
      const layer = liveLayers.get(id);

      if (layer) {
        layer.update({
          x: layer.get("x") + offset.x,
          y: layer.get("y") + offset.y,
        });
    }


    };

  
    setCanvasState({ mode: CanvasMode.Translating,current:point });
  }, [canvasState]);



  const unselectLayer = useMutation((
    {self,setMyPresence}
  ) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  },[])
  const resizeSelectedLayer = useMutation((
    { storage, self },
    point: Point,
  ) => {
    if (canvasState.mode !== CanvasMode.Resizing) {
      return;
    }

    const bounds = resizeBounds(
      canvasState.initialBounds,
      canvasState.corner,
      point,
    );

    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(self.presence.selection[0]);

    if (layer) {
      layer.update(bounds);
    };
  }, [canvasState]);

  const onResizeHandlePointerDown = useCallback((
    corner: Side,
    initialBounds: XYWH
  )=>{
    // console.log({corner, initialBounds});
    history.pause();
    setCanvasState({
      mode: CanvasMode.Resizing,
      corner,
      initialBounds,
    });
  },[history])



	const onWheel = useCallback((e: React.WheelEvent) => {
		// console.log({
		//   x:e.deltaX,
		//   y:e.deltaY});
		setCamera((camera) => ({
			x: camera.x - e.deltaX,
			y: camera.y - e.deltaY,
		}));
	}, []);

	const onPointerMove = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			e.preventDefault();
			const current = pointerEventToCanvasPoint(e, camera);




      if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayer(current);
      }

      if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      }

      setMyPresence({ cursor: current });
    },
    [
      camera,
      canvasState,
      resizeSelectedLayer,
      translateSelectedLayer,
    ]
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);


  const onPointerDown = useCallback(
    (e:React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      // console.log({
      //   point,
      //   mode: canvasState.mode,
      // });

      if (canvasState.mode === CanvasMode.Inserting) {
return;
      }
      setCanvasState({origin:point,mode: CanvasMode.Pressing})
      }, 
    [camera, canvasState.mode, setCanvasState]
  );


	const onPinterUp = useMutation(
		({}, e) => {
			const point = pointerEventToCanvasPoint(e, camera);

			// console.log({
			//   point,
			//   mode: canvasState.mode,
			// });


      if (
        canvasState.mode === CanvasMode.None,
        canvasState.mode === CanvasMode.Pressing
        ) {
          unselectLayer();


        setCanvasState({mode: CanvasMode.None});
      }




      else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      history.resume();
    },
    [
      camera, 
      canvasState, 
      history, 
      insertLayer,
      unselectLayer,
    ]
  );



	const selections = useOthersMapped((other) => other.presence.selection);

	const onLayerPointerDown = useMutation(
		({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
			if (
				canvasState.mode === CanvasMode.Pencil ||
				canvasState.mode === CanvasMode.Inserting
			) {
				return;
			}

			history.pause();
			e.stopPropagation();

			const point = pointerEventToCanvasPoint(e, camera);

			if (!self.presence.selection.includes(layerId)) {
				setMyPresence({ selection: [layerId] }, { addToHistory: true });
			}
			setCanvasState({ mode: CanvasMode.Translating, current: point });
		},
		[setCanvasState, camera, history, canvasState.mode]
	);

	const layerIdsToColorSelection = useMemo(() => {
		const layerIdsToColorSelection: Record<string, string> = {};

		for (const user of selections) {
			const [connectionId, selection] = user;

			for (const layerId of selection) {
				layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
			}
		}

		return layerIdsToColorSelection;
	}, [selections]);

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <div className="absolute right-2 bottom-3">
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
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >

{layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor = {layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox
                    onResizeHandlePointerDown={onResizeHandlePointerDown}

          />

					<CursorPresence />
				</g>
			</svg>
			<LostConnectionToasts />
		</main>
	);
};

export default Canvas;