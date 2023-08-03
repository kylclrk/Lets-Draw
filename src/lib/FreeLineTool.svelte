<script lang="ts">
  import Konva from "konva";
  import DrawModeButton from "../DrawModeButton.svelte";
  import type { DrawMode, LineWithData } from "../types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let stage: Konva.Stage;
  export let layer: Konva.Layer;
  export let drawMode: DrawMode;
  const selectedColor = getContext<Writable<string>>("selectedColor");
  let isPainting: boolean = false;
  let workingLine: LineWithData;

  const clickHandler = () => {
    stage.removeEventListener("mousedown touchstart mousemove touchmove mouseup touchend");
    stage.on("mousedown touchstart", onMouseDown);
    stage.on("mousemove touchmove", onMouseMove);
    stage.on("mouseup touchend", onMouseUp);
  };

  function onMouseDown() {
    isPainting = true;
    const pos = stage.getPointerPosition();

    workingLine = {
      line: new Konva.Line({
        stroke: $selectedColor,
        strokeWidth: 3,
        points: [pos.x, pos.y, pos.x, pos.y],
      }),
      // We can put whatever data we want about the line here.
      meta: {
        time: new Date(),
      },
    };

    layer.add(workingLine.line);
  }

  function onMouseMove() {
    if (!isPainting) {
      return;
    }
    const pos = stage.getPointerPosition();

    workingLine.line.points([...workingLine.line.points(), pos.x, pos.y]);
  }

  function onMouseUp() {
    isPainting = false;
    // In this mode, the user can draw freely,
    // but when they let go, it will be a straight line.
    const points = workingLine.line.points();
    const start = points.slice(0, 2);
    const end = points.slice(points.length - 2, points.length);
    workingLine.line.points([...start, ...end]);
  }
</script>

<DrawModeButton bind:drawMode {clickHandler} mode="FREE-LINE">Free Line</DrawModeButton>
