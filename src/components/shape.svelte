<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let shapeColor = false;
  export let shapeInvert = true;
  export let circle = false;
  export let fullScreen = false;

  // distance from the shape that your mouse will interact with it.
  const INTERACTION_DISTANCE = 5;
  const DAMPENING_CONST = 0.025;
  // the factor that speed decays (higher = faster decay = shapes slow down faster)
  const DECAY = 0.07;

  let ref: HTMLElement;
  let boundingBox: DOMRect;
  let bodyRef: HTMLElement;

  let x: number;
  let y: number;
  let size: number;
  let interval: any;

  onMount(() => {
    // So the shapes don't flash at (0,0) before JS sets their position
    setTimeout(() => (ref.style.visibility = "visible"), 400);
    ref.parentElement.style.position = "relative";

    if (fullScreen) {
      boundingBox = bodyRef.getBoundingClientRect();
    } else {
      boundingBox = ref.parentElement.getBoundingClientRect();
    }
    let lim = Math.min(boundingBox.width, boundingBox.height, 500);
    size = circle ? rand(0.25 * lim, 0.03 * lim) : rand(0.25 * lim, 0.55 * lim);
    ref.style.width = size + "px";
    ref.style.height = size + "px";
    x = rand(boundingBox.left, boundingBox.width - size);
    y = rand(boundingBox.top, boundingBox.height - size);

    // for shape movement
    interval = setInterval(() => {
      ref.style.left = `${x - boundingBox.left}px`;
      ref.style.top = `${y - boundingBox.top}px`;
      x += dx;
      y += dy;
      //COLLISION LOGIC
      if (x >= boundingBox.right - size) {
        dx *= -1;
        x = boundingBox.right - size;
      }
      if (x <= boundingBox.left) {
        dx *= -1;
        x = boundingBox.left;
      }
      if (y >= boundingBox.bottom - size) {
        dy *= -1;
        y = boundingBox.bottom - size;
      }
      if (y <= boundingBox.top) {
        dy *= -1;
        y = boundingBox.top;
      }

      //decay to slower speed
      if (dx > 2) {
        dx -= DECAY;
      }
      if (dx < -2) {
        dx += DECAY;
      }
      if (dy > 2) {
        dy -= DECAY;
      }
      if (dy < -2) {
        dx += DECAY;
      }
    }, 1000 / 30);
  });

  const rand = (min: number, max: number) => {
    return (Math.random() * (max - min) + min) | 0;
  };
  const dist = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };

  let dx = rand(-10, 10) / 5;
  let dy = rand(-10, 10) / 5;

  // the absolute position of the mouse
  let m = { x: 0, y: 0 };
  // the absolute vector direction that the mouse is traveling in.
  let v = { x: 0, y: 0 };
  $: centerX = x + size / 2;
  $: centerY = y + size / 2;

  // Dampens the mouse vector moving shapes (smaller = mouse has less effect on shapes)
  const handleMouseMove = (e: MouseEvent) => {
    let relMX = e.clientX;
    let relMY = e.clientY;
    v.x = relMX - m.x;
    v.y = relMY - m.y;
    m.x = relMX;
    m.y = relMY;

    let d = dist(centerX, centerY, m.x, m.y);
    if (d < size / 2 + INTERACTION_DISTANCE) {
      let dFact = 20 ** -(d / 400);
      dx += v.x * DAMPENING_CONST * dFact;
      dy += v.y * DAMPENING_CONST * dFact;
    }
  };
  const handleResize = () => {
    if (fullScreen) {
      boundingBox = bodyRef.getBoundingClientRect();
    } else {
      boundingBox = ref.parentElement.getBoundingClientRect();
    }
  };
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<svelte:window on:resize={handleResize} />

<svelte:body bind:this={bodyRef} on:mousemove={handleMouseMove} />

<div
  bind:this={ref}
  class="shape"
  class:shapeColor
  class:shapeInvert
  class:circle
/>

<style>
  .shape {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0px;
    left: 0px;
    visibility: hidden;
    pointer-events: none;
  }
  .shapeInvert {
    backdrop-filter: invert(100%);
    -webkit-backdrop-filter: invert(100%);
    z-index: 10;
  }
  /* This is a CSS hack to target only firefox. Firefox doesn't support backdrop-filter, which makes it really annoying 
  to use the effect */
  @media (min--moz-device-pixel-ratio: 0) {
    .shapeInvert {
      background: white;
      opacity: 0.3;
    }
  }
  .shapeColor {
    background: var(--accent);
    opacity: 50%;
    z-index: 11;
  }
  .circle {
    border-radius: 50%;
  }
</style>
