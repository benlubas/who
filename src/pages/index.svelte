<script lang="ts">
  import Name from "../components/gridBoxes/name.svelte";
  import ProjectsBtn from "../components/gridBoxes/projectsBtn.svelte";
  import AboutBtn from "../components/gridBoxes/aboutBtn.svelte";
  import { url } from "@sveltech/routify";
</script>

<div class="container">
  <div class="shapes" />
  <div class="grid-item" id="center">
    <Name />
  </div>
  <div id="tl">
    <a href={$url("/projects")}> <ProjectsBtn /></a>
  </div>
  <div id="br">
    <a href={$url("/about")}> <AboutBtn /></a>
  </div>
  <div id="right" />
  <div id="bottom" />
</div>

<style>
  #center {
    grid-area: center;
  }
  #tl {
    grid-area: tl;
  }
  #tr {
    grid-area: tr;
  }
  #br {
    grid-area: br;
  }
  #bl {
    grid-area: bl;
  }
  #top {
    grid-area: top;
  }
  #left {
    grid-area: left;
  }
  #right {
    grid-area: right;
  }
  #bottom {
    grid-area: bottom;
  }

  .grid-item {
    height: 100%;
    width: 100%;
    padding: 5px;
    position: relative;
  }

  .shapes {
    position: absolute;
    width: 150px;
    /* filter: invert(); */
    background: white;
    height: 150px;
    border-radius: 50%;
    top: 0px;
    left: 0px;
  }

  .container {
    display: grid;
    height: 100vh;
    width: 100%;
    grid:
      [row1-start] "tl top tr" calc(100vh / 3) [row1-end]
      [row2-start] "left center right" calc(100vh / 3) [row2-end]
      [row3-start] "bl bottom br" calc(100vh / 3) [row3-end]
      / 1fr 1fr 1fr;
  }
</style>
