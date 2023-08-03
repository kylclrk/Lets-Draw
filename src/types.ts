import { Line } from '../node_modules/konva/lib/shapes/Line';
import { Rect } from '../node_modules/konva/lib/shapes/Rect';

export type DrawMode = "FREE" | "LINE" | "FREE-LINE" | "RECTANGLE" | "SELECT";

export type LineWithData = {
  line: Line;
  meta: any;
}

export type RectangleWithData = {
  rectangle: Rect;
  meta: any;
}

export type CanvasEvents = {
  handleDown: () => void,
  handleMove: () => void,
  handleUp: () => void
}