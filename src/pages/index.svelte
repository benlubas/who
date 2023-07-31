<script lang="ts">
  import Name from "../components/gridBoxes/name.svelte";
  import ProjectsBtn from "../components/gridBoxes/projectsBtn.svelte";
  import AboutBtn from "../components/gridBoxes/aboutBtn.svelte";
  import { url, prefetch } from "@roxi/routify";
  import Shape from "../components/shape.svelte";
  import WorkBtn from "../components/gridBoxes/workBtn.svelte";
  import GithubBtn from "../components/gridBoxes/githubBtn.svelte";
  import ResumeBtn from "../components/gridBoxes/resumeBtn.svelte";

  prefetch("/projects", { validFor: 24 * 60 });
  prefetch("/about", { validFor: 24 * 60 });
  prefetch("/resume", { validFor: 24 * 60 });
</script>

<div class="container">
  <div class="shapes" />
  <div class="grid-item" id="center">
    <Name />
  </div>
  <div id="tl">
    <a href={$url("/about")}><AboutBtn /></a>
  </div>
  <div id="tr">
    <a href={$url("/resume")}><ResumeBtn /></a>
  </div>
  <div id="right">
    <a href={$url("/work")}><WorkBtn /></a>
  </div>
  <div id="bl">
    <a
      href="https://github.com/benlubas"
      target="_blank"
      rel="noopener noreferrer"><GithubBtn /></a
    >
  </div>
  <div id="br">
    <a href={$url("/projects")}><ProjectsBtn /></a>
  </div>
  <Shape shapeInvert />
  <Shape shapeInvert />
  <Shape shapeInvert />
  <Shape shapeInvert />
  <Shape shapeColor circle />
</div>

<style>
  a {
    font-style: normal;
  }
  a:hover {
    color: inherit;
    text-decoration: none;
  }
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
  /* #top { */
  /*   grid-area: top; */
  /* } */
  /* #left { */
  /*   grid-area: left; */
  /* } */
  #right {
    grid-area: right;
  }
  /* #bottom { */
  /*   grid-area: bottom; */
  /* } */

  .grid-item {
    height: 100%;
    width: 100%;
    padding: 5px;
    position: relative;
  }

  .container {
    display: grid;
    height: 100vh;
    width: 100%;
    grid:
      [row1-start] "tl top tr" calc(100vh / 3) [row1-end]
      [row2-start] "left center right" calc(100vh / 3) [row2-end]
      [row3-start] "bl bottom br" calc(100vh / 3) [row3-end]
      / 1fr 1.5fr 1fr;
  }
  @media (max-width: 1012px), (orientation: portrait) {
    .container {
      grid:
        [row1-start] "center center" calc(100vh / 4) [row1-end]
        [row2-start] "tl tr" calc(100vh / 4) [row2-end]
        [row3-start] "right bl" calc(100vh / 4) [row3-end]
        [row4-start] "br br" calc(100vh / 4) [row4-end]
        / 1fr 1fr;
    }
  }
  @media (max-width: 600px) {
    .container {
      height: unset;
      grid:
        [row1-start] "center" calc(100vh / 3) [row1-end]
        [row2-start] "tl" calc(100vh / 3) [row2-end]
        [row3-start] "tr" calc(100vh / 3) [row3-end]
        [row4-start] "right" calc(100vh / 3) [row4-end]
        [row5-start] "br" calc(100vh / 3) [row5-end]
        [row6-start] "bl" calc(100vh / 3) [row6-end]
        / 1fr;
    }
  }
</style>
