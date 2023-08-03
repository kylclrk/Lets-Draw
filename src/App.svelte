<script lang="ts">
  import { Layer, Line, Stage } from "svelte-konva";
  import type { CanvasEvents, DrawMode, LineWithData } from "./types";
  import { writable, type Writable } from "svelte/store";
  import { setContext } from "svelte";
  import FreeTool from "./lib/FreeTool.svelte";
  import { data, stage } from "./lib/stores";
  import DrawModeButton from "./DrawModeButton.svelte";
  import LineTool from "./lib/LineTool.svelte";

  let lines: LineWithData[] = [];

  // let stage: Konva.Stage;
  let width: number;
  let height: number;

  let drawMode: DrawMode = "SELECT";
  let selectedColor: Writable<string> = setContext("selectedColor", writable("#F1F1F1"));
  let backgroundColor: string = "#1E1E1E";

  function reset() {
    $data = [];
  }

  let events: CanvasEvents = {
    handleDown() {},
    handleMove() {},
    handleUp() {},
  };
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
      <input id="color" type="color" bind:value={$selectedColor} />
    </label>
    <label for="background">
      Background
      <input id="background" type="color" bind:value={backgroundColor} />
    </label>
  </div>

  <div style="background-color: {backgroundColor}">
    {#if drawMode === "FREE"}
      <FreeTool bind:events />
    {:else if drawMode === "LINE"}
      <LineTool bind:events />
    {/if}
    <Stage
      config={{ width, height }}
      bind:handle={$stage}
      on:mousedown={events.handleDown}
      on:touchstart={events.handleUp}
      on:mouseup={events.handleUp}
      on:touchend={events.handleUp}
      on:mousemove={events.handleMove}
      on:touchmove={events.handleMove}
    >
      <Layer>
        {#each $data as l}
          <Line config={l} />
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
