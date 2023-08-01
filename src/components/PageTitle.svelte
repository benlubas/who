<script lang="ts">
  import { url } from "@roxi/routify";
  import Shape from "../components/shape.svelte";
    import ThemeSwitcher from "./themeSwitcher.svelte";

  export let title = "New Page";
</script>

<div class="title-container">
  <div class="title">
    <div class="title-text">{title}</div>
    <ThemeSwitcher />
    <Shape shapeInvert />
    <Shape shapeInvert />
    <Shape shapeInvert />
    <Shape shapeColor circle />
  </div>

  <a href={$url("/")}>&leftarrow; Back</a>
  <br /><br />
</div>

<style>
  .title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .title-text {
    font-size: 5rem;
    font-family: Montserrat, sans-serif;
  }
</style>
