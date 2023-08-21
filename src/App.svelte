<script lang="ts">
  import { Layer } from "svelte-konva";
  import type { CanvasEvents, DrawMode } from "./types";
  import { writable, type Writable } from "svelte/store";
  import { setContext } from "svelte";
  import FreeTool from "./lib/FreeTool.svelte";
  import { data } from "./lib/stores";
  import DrawModeButton from "./DrawModeButton.svelte";
  import LineTool from "./lib/LineTool.svelte";
  import FreeLineTool from "./lib/FreeLineTool.svelte";
  import RectangleTool from "./lib/RectangleTool.svelte";
  import Canvas from "./lib/Canvas.svelte";

  let width: number;
  let height: number;

  let drawMode: DrawMode = "LINE";
  let selectedColor: Writable<string> = setContext("selectedColor", writable("#F1F1F1"));
  let backgroundColor: string = "#1E1E1E";

  function reset() {
    $data = [];
  }

  // let events: CanvasEvents;

  const events: Writable<CanvasEvents> = setContext(
    "canvas-events",
    writable({ handleDown: () => {}, handleMove: () => {}, handleUp: () => {} })
  );
</script>

<div class="container">
  <div class="floating-controls">
    <button on:click={reset}>Reset</button>
    <DrawModeButton bind:drawMode mode="FREE">Free Mode</DrawModeButton>
    <DrawModeButton bind:drawMode mode="FREE-LINE">Free Line</DrawModeButton>
    <DrawModeButton bind:drawMode mode="LINE">Line Mode</DrawModeButton>
    <DrawModeButton bind:drawMode mode="RECTANGLE">Rectangle Mode</DrawModeButton>
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

  {#if drawMode === "FREE"}
    <FreeTool />
  {:else if drawMode === "LINE"}
    <LineTool />
  {:else if drawMode === "FREE-LINE"}
    <FreeLineTool />
  {:else if drawMode === "RECTANGLE"}
    <RectangleTool />
  {/if}
  <div style="background-color: {backgroundColor}">
    <Canvas events={$events} {width} {height}>
      <Layer>
        {#each $data as item}
          <svelte:component this={item.shape} config={item.config} />
        {/each}
      </Layer>
    </Canvas>
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
