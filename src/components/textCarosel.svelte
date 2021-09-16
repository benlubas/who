<script lang="ts">
  import { fly } from "svelte/transition";
  export let list;

  let shown = -1;

  setInterval(() => (shown = (shown + 1) % list.length), 2500);
</script>

{#each list as val, i ({})}
  <div
    in:fly={{ x: 200, duration: 1000 }}
    out:fly={{ x: -200, duration: 1000 }}
    class:hide={shown !== i}
    class="subtitle"
  >
    {val}
  </div>
{/each}

<style>
  .hide {
    display: none;
  }
  .subtitle {
    font-size: 1.5rem;
    font-family: Roboto, sans-serif;
    font-weight: 100;
    padding-top: 5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translateY(1rem);
    pointer-events: none;
  }
</style>
