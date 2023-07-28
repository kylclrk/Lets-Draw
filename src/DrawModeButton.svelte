<script lang="ts">
  import type { DrawMode } from "./types";

  export let drawMode: DrawMode;
  export let mode: DrawMode;
</script>

<button
  on:click={() => {
    drawMode = mode;
  }}
  disabled={drawMode === mode}><slot /></button
>
