<script lang="ts">
  import type { CanvasEvents, ShapeWithData } from "../types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { data, stage } from "./stores";
  import { Line } from "svelte-konva";

  const selectedColor = getContext<Writable<string>>("selectedColor");
  const events = getContext<Writable<CanvasEvents>>("canvas-events");

  let isPainting: boolean = false;
  let workingLine: ShapeWithData;

  $events = {
    handleDown() {
      isPainting = true;
      const pos = $stage.getPointerPosition();

      workingLine = {
        config: {
          draggable: true,
          stroke: $selectedColor,
          strokeWidth: 3,
          points: [pos.x, pos.y, pos.x, pos.y],
        },
        shape: Line,
        meta: "It's a line!",
      };

      $data = [...$data, workingLine];
    },
    handleMove() {
      if (!isPainting) {
        return;
      }
      const pos = $stage.getPointerPosition();

      workingLine.config.points = [...workingLine.config.points, pos.x, pos.y];
      $data = $data;
    },
    handleUp() {
      isPainting = false;
      // In this mode, the user can draw freely,
      // but when they let go, it will be a straight line.
      const points = workingLine.config.points;
      const start = points.slice(0, 2);
      const end = points.slice(points.length - 2, points.length);
      workingLine.config.points = [...start, ...end];
      $data = $data;
    },
  };
</script>
