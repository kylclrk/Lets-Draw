<script lang="ts">
  import { Stage } from "svelte-konva";
  import type { CanvasEvents } from "../types";
  import { stage } from "./stores";

  export let width: number;
  export let height: number;
  export let events: CanvasEvents;
</script>

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
  <slot />
</Stage>
