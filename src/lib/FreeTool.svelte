<script lang="ts">
  import type { CanvasEvents } from "../types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { LineConfig } from "konva/lib/shapes/Line";
  import { data, stage } from "./stores";

  const selectedColor = getContext<Writable<string>>("selectedColor");
  let isPainting: boolean = false;
  let workingLine: LineConfig;

  export const events: CanvasEvents = {
    handleDown() {
      isPainting = true;
      const pos = $stage.getPointerPosition();

      workingLine = {
        draggable: true,
        stroke: $selectedColor,
        strokeWidth: 3,
        points: [pos.x, pos.y, pos.x, pos.y],
      };
      $data = [...$data, workingLine];
    },
    handleMove() {
      if (!isPainting) {
        return;
      }
      const pos = $stage.getPointerPosition();

      workingLine.points = [...workingLine.points, pos.x, pos.y];
      $data = $data;
    },
    handleUp() {
      isPainting = false;
    },
  };
</script>
