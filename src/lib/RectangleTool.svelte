<script lang="ts">
  import type { CanvasEvents, ShapeWithData } from "../types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { data, stage } from "./stores";
  import { Rect } from "svelte-konva";

  const selectedColor = getContext<Writable<string>>("selectedColor");
  const events = getContext<Writable<CanvasEvents>>("canvas-events");

  let isPainting: boolean = false;
  let workingRect: ShapeWithData;

  $events = {
    handleDown() {
      isPainting = true;
      const pos = $stage.getPointerPosition();

      workingRect = {
        config: {
          stroke: $selectedColor,
          strokeWidth: 3,
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
        },
        shape: Rect,
        meta: "It's a rectangle!",
      };
      $data = [...$data, workingRect];
    },

    handleMove() {
      if (!isPainting) {
        return;
      }
      const pos = $stage.getPointerPosition();

      workingRect.config.width = pos.x - workingRect.config.x;
      workingRect.config.height = pos.y - workingRect.config.y;
      $data = $data;
    },

    handleUp() {
      isPainting = false;
    },
  };
</script>
