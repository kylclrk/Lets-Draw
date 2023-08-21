import Konva from 'konva';
import { writable, type Writable } from 'svelte/store';

import type { ShapeWithData } from '../types';

export const data: Writable<ShapeWithData[]> = writable([]);
export const stage: Writable<Konva.Stage> = writable(new Konva.Stage({ container: '#app' }));