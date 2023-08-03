import { writable, type Writable } from 'svelte/store';
import Konva from "konva";
import type { LineConfig } from "konva/lib/shapes/Line";


export const data: Writable<LineConfig[]> = writable([]);
export const stage: Writable<Konva.Stage> = writable(new Konva.Stage({container: '#app'}));