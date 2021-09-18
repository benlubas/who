<script lang="ts">
  import Name from "../components/gridBoxes/name.svelte";
  import ProjectsBtn from "../components/gridBoxes/projectsBtn.svelte";
  import AboutBtn from "../components/gridBoxes/aboutBtn.svelte";
  import { url } from "@roxi/routify";
  import Shape from "../components/shape.svelte";
  import CoursesBtn from "../components/gridBoxes/coursesBtn.svelte";
  import GithubBtn from "../components/gridBoxes/githubBtn.svelte";
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
  <div id="right">
    <a href={$url("/courses")}><CoursesBtn /></a>
  </div>
  <div id="bl">
    <a href="https://github.com/benlubas"><GithubBtn /></a>
  </div>
</div>

<Shape shapeInvert />
<Shape shapeInvert />
<Shape shapeInvert />
<Shape shapeInvert />
<Shape shapeColor circle />

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
</style>
