<script lang="ts">
  import { Layer, Transformer } from "svelte-konva";
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
  import type Konva from "konva";
  import SelectTool from "./lib/SelectTool.svelte";

  const nothing = () => {};
  let width: number;
  let height: number;

  let drawMode: DrawMode = "LINE";
  let selectedColor: Writable<string> = setContext("selectedColor", writable("#F1F1F1"));
  let backgroundColor: string = "#1E1E1E";

  const transformer: Writable<Konva.Transformer> = setContext("transformer", writable());

  function reset() {
    $data = [];
  }

  setContext<Writable<CanvasEvents>>(
    "canvas-events",
    writable({ handleDown: nothing, handleMove: nothing, handleUp: nothing })
  );
</script>

<div class="container">
  <div class="floating-controls">
    <button on:click={reset}>Reset</button>
    <DrawModeButton bind:drawMode mode="FREE">Free Mode</DrawModeButton>
    <DrawModeButton bind:drawMode mode="FREE-LINE">Free Line</DrawModeButton>
    <DrawModeButton bind:drawMode mode="LINE">Line Mode</DrawModeButton>
    <DrawModeButton bind:drawMode mode="RECTANGLE">Rectangle Mode</DrawModeButton>
    <DrawModeButton bind:drawMode mode="SELECT">Select Mode</DrawModeButton>
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
  {:else if drawMode === "SELECT"}
    <SelectTool />
  {/if}
  <div style="background-color: {backgroundColor}">
    <Canvas {width} {height}>
      <Layer>
        {#each $data as item}
          <svelte:component this={item.shape} config={item.config} />
        {/each}
        <Transformer bind:handle={$transformer} />
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
