import type { LineConfig } from 'konva/lib/shapes/Line';
import type { RectConfig } from 'konva/lib/shapes/Rect';
import type { KonvaMouseEvent, KonvaTouchEvent, Line, Rect } from 'svelte-konva';

export type DrawMode = "FREE" | "LINE" | "FREE-LINE" | "RECTANGLE" | "SELECT";

export type ShapeWithData = {
  meta: any;
  shape: Line['default'] | Rect['default'];
  config: LineConfig | RectConfig;
}

export type CanvasEvents = {
  handleDown: (event?: KonvaMouseEvent | KonvaTouchEvent) => void;
  handleMove: (event?: KonvaMouseEvent | KonvaTouchEvent) => void;
  handleUp: (event?: KonvaMouseEvent | KonvaTouchEvent) => void;
}