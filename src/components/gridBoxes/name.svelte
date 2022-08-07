<script lang="ts">
  import TextCarousel from "../textCarousel.svelte";
</script>

<div class="title">Ben Lubas</div>
<TextCarousel
  list={[
    "Student",
    "Software Dev",
    "Google Poweruser",
  ]}
/>

<style>
  .title {
    font-size: 3rem;
    font-family: Roboto, sans-serif;
    font-weight: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    white-space: nowrap;
  }
</style>
