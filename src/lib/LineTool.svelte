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

      workingLine.config.points = [...workingLine.config.points.slice(0, 2), pos.x, pos.y];
      $data = $data;
    },
    handleUp() {
      isPainting = false;
    },
  };
</script>
