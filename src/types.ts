import { Line } from '../node_modules/konva/lib/shapes/Line';

export type DrawMode = "FREE" | "LINE" | "FREE-LINE";

export type LineWithData = {
  line: Line;
  meta: any;
}