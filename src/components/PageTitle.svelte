<script lang="ts">
  import { url } from "@sveltech/routify";
  import Shape from "../components/shape.svelte";

  export let title = "New Page";
</script>

<div class="title-container">
  <div class="page-title">
    {title}
    <Shape shapeInvert />
    <Shape shapeInvert />
    <Shape shapeInvert />
    <Shape shapeColor circle />
  </div>

  <a href={$url("/")}>&leftarrow; Back</a>
  <br /><br />
</div>

<style>
</style>
