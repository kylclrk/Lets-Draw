<script lang="ts">
  import Konva from "konva";
  import { Layer, Stage, Line } from "svelte-konva";
  import type { DrawMode, LineWithData } from "./types";
  import DrawModeButton from "./DrawModeButton.svelte";

  let lines: LineWithData[] = [];

  let stage: Konva.Stage;
  let width: number;
  let height: number;

  let isPainting: boolean = false;
  let drawMode: DrawMode = "FREE";
  let workingLine: LineWithData;
  let selectedColor: string = "#F1F1F1";
  let backgroundColor: string = "#1E1E1E";

  function onMouseDown() {
    isPainting = true;
    const pos = stage.getPointerPosition();

    workingLine = {
      line: new Konva.Line({
        stroke: selectedColor,
        strokeWidth: 3,
        points: [pos.x, pos.y, pos.x, pos.y],
      }),
      // We can put whatever data we want about the line here.
      meta: {
        time: new Date(),
      },
    };

    lines = [...lines, workingLine];
  }

  function onMouseMove() {
    if (!isPainting) {
      return;
    }
    const pos = stage.getPointerPosition();

    if (drawMode === "LINE") {
      // While drawing a line, we only need to keep the first and current/last point
      workingLine.line.points([...workingLine.line.points().slice(0, 2), pos.x, pos.y]);
    } else {
      // A free hand line is simply a combination of all the points the user has moved over
      workingLine.line.points([...workingLine.line.points(), pos.x, pos.y]);
    }
  }

  function onMouseUp() {
    isPainting = false;

    if (drawMode === "FREE-LINE") {
      // In this mode, the user can draw freely,
      // but when they let go, it will be a straight line.
      const points = workingLine.line.points();
      const start = points.slice(0, 2);
      const end = points.slice(points.length - 2, points.length);
      workingLine.line.points([...start, ...end]);
    }
  }

  function reset() {
    lines = [];
  }
</script>

<div class="container">
  <div class="floating-controls">
    <button on:click={reset}>Reset</button>
    <DrawModeButton bind:drawMode mode="FREE">Free Mode</DrawModeButton>
    <DrawModeButton bind:drawMode mode="FREE-LINE">Free Line</DrawModeButton>
    <DrawModeButton bind:drawMode mode="LINE">Line Mode</DrawModeButton>
    <br />
    <label for="color">
      Color
      <input id="color" type="color" bind:value={selectedColor} />
    </label>
    <label for="background">
      Background
      <input id="background" type="color" bind:value={backgroundColor} />
    </label>
  </div>

  <div style="background-color: {backgroundColor}">
    <Stage
      config={{ width, height }}
      on:mousedown={onMouseDown}
      on:touchstart={onMouseDown}
      on:mousemove={onMouseMove}
      on:touchmove={onMouseMove}
      on:mouseup={onMouseUp}
      on:touchend={onMouseUp}
      bind:handle={stage}
    >
      <Layer>
        {#each lines as l}
          <Line
            config={{}}
            bind:handle={l.line}
            on:click={() => {
              console.log(l.meta.time);
            }}
          />
        {/each}
      </Layer>
    </Stage>
  </div>
</div>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<style>
  .container {
    position: relative;
    overscroll-behavior: none;
  }
  .floating-controls {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 100;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  label {
    color: #eeeeee;
  }
</style>
