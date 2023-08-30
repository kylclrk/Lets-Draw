<script lang="ts">
  import type { CanvasEvents } from "../types";
  import { getContext, onDestroy } from "svelte";
  import type { Writable } from "svelte/store";
  import { stage } from "./stores";
  import type { KonvaDragTransformEvent } from "svelte-konva";
  import Konva from "konva";

  const events = getContext<Writable<CanvasEvents>>("canvas-events");
  const transformer = getContext<Writable<Konva.Transformer>>("transformer");
  let selectedShape: Konva.Node | null = null;

  function handleDown(event: KonvaDragTransformEvent) {
    if (event.detail.target === $stage) {
      selectedShape.draggable(false);
      selectedShape = null;
      updateTransformer();
      return;
    }

    // Clicked on transformer
    if (event.detail.target.getParent().className === "Transformer") {
      return;
    }

    selectedShape = event.detail.target;
    selectedShape.draggable(true);
    updateTransformer();
  }

  function updateTransformer() {
    if ($transformer.nodes().includes(selectedShape)) {
      return;
    }

    if (selectedShape === null) {
      $transformer.nodes([]);
    } else {
      $transformer.nodes([selectedShape]);
    }
  }

  onDestroy(() => {
    if (selectedShape !== null) {
      selectedShape.draggable(false);
    }
    $transformer.nodes([]);
  });

  $events = {
    handleDown,
    handleMove() {},
    handleUp() {},
  };
</script>
