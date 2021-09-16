<script lang="ts">
  export let shapeColor = false;
  export let shapeInvert = true;

  let ref: HTMLElement;

  const rand = (min: number, max: number) => {
    return (Math.random() * (max - min) + min) | 0;
  };
  const dist = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };
  let size = rand(50, 250);

  let dx = rand(-10, 10) / 5;
  let dy = rand(-10, 10) / 5;
  let x = rand(0, window.innerWidth - size);
  let y = rand(0, window.innerHeight - size);

  $: if (ref) {
    ref.style.width = size + "px";
    ref.style.height = size + "px";
  }

  // for shape movement
  setInterval(() => {
    ref.style.top = `${y}px`;
    ref.style.left = `${x}px`;
    x += dx;
    y += dy;
    //COLLISION LOGIC
    if (x + size >= window.innerWidth) {
      dx *= -1;
      x = window.innerWidth - size;
    }
    if (x < 0) {
      dx *= -1;
      x = 0;
    }
    if (y + size >= window.innerHeight) {
      dy *= -1;
      y = window.innerHeight - size;
    }
    if (y < 0) {
      dy *= -1;
      y = 0;
    }

    // the factor that speed deacys (higher = faster decay = shapes slow down faster)
    let decay = 0.1;
    //decay to slower speed
    if (dx > 2) {
      dx -= decay;
    }
    if (dx < -2) {
      dx += decay;
    }
    if (dy > 2) {
      dy -= decay;
    }
    if (dy < -2) {
      dx += decay;
    }

    // So the shapes don't flash at (0,0) before JS sets their position
    ref.style.visibility = "visible";
  }, 1000 / 30);

  // the absolute position of the mouse
  let m = { x: size / 2, y: size / 2 };
  // the absolute vector direction that the mouse is traveling in.
  let v = { x: 0, y: 0 };
  $: centerX = x + size / 2;
  $: centerY = y + size / 2;

  // Dampens the mouse vector moving shapes (smaller = mouse has less effect on shapes)
  let dampener = 0.025;
  const handleMouseMove = (e: MouseEvent) => {
    v.x = e.clientX - m.x;
    v.y = e.clientY - m.y;
    m.x = e.clientX;
    m.y = e.clientY;

    let d = dist(centerX, centerY, m.x, m.y);
    if (d < size + 20) {
      let dFact = 20 ** -(d / 400);
      dx += v.x * dampener * dFact;
      dy += v.y * dampener * dFact;
    }
  };
</script>

<svelte:window on:mousemove={handleMouseMove} />

<div bind:this={ref} class="shape" class:shapeColor class:shapeInvert />

<style>
  .shape {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0px;
    left: 0px;
    visibility: hidden;
  }
  .shapeColor {
    background: var(--accent);
    opacity: 50%;
    z-index: 5;
  }
  .shapeInvert {
    backdrop-filter: invert(100%);
    z-index: 10;
  }
</style>
