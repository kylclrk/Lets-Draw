<script lang="ts">
  import Konva from "konva";
  import DrawModeButton from "../DrawModeButton.svelte";
  import type { DrawMode, RectangleWithData } from "../types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let stage: Konva.Stage;
  export let layer: Konva.Layer;
  export let drawMode: DrawMode;
  const selectedColor = getContext<Writable<string>>("selectedColor");
  let isPainting: boolean = false;
  let workingRect: RectangleWithData;

  const clickHandler = () => {
    stage.removeEventListener("mousedown touchstart mousemove touchmove mouseup touchend");
    stage.on("mousedown touchstart", onMouseDown);
    stage.on("mousemove touchmove", onMouseMove);
    stage.on("mouseup touchend", onMouseUp);
  };

  function onMouseDown() {
    isPainting = true;
    const pos = stage.getPointerPosition();

    workingRect = {
      rectangle: new Konva.Rect({
        stroke: $selectedColor,
        strokeWidth: 3,
        x: pos.x,
        y: pos.y,
        width: 1,
        height: 1,
      }),
      // We can put whatever data we want about the line here.
      meta: {
        time: new Date(),
      },
    };

    layer.add(workingRect.rectangle);
  }

  function onMouseMove() {
    if (!isPainting) {
      return;
    }
    const pos = stage.getPointerPosition();

    workingRect.rectangle.width(pos.x - workingRect.rectangle.width());
    workingRect.rectangle.height(pos.y - workingRect.rectangle.height());
  }

  function onMouseUp() {
    isPainting = false;
  }
</script>

<DrawModeButton bind:drawMode {clickHandler} mode="RECTANGLE">Rectangle Tool</DrawModeButton>
