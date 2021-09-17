<script lang="ts">
  import PageTitle from "../components/PageTitle.svelte";
</script>

<div class="page-cont">
  <div>
    <PageTitle title="Course Work" />
    <div class="text">
      On this page I'll discuss my coursework, the interesting classes I've
      taken, smaller projects that I've done, and the courses that I'm looking
      forward to. Of note, the two projects from high school are on the projects
      page.

      <br />
      <div class="subtitle">Fundies 1 & 2</div>
      Fundementals of Computer Science 1 & 2 are the two entry level courses at Northeastern,
      the first is taught in Racket (I had never heard of it either), the second
      was in Java. I learned about Functional and OO Programming, the differences,
      advantages, and disadvantages of each. I'll briefly mention a few of the more
      interesting projects from Fundies 2.

      <br />
      <div class="projectTitle">Maze Solver</div>
      <br />

      The more interesting projects came towards the end of the second course.
      We made a maze generator and solver making use of Kruskals algorithm to
      generate a minimum spanning tree of grid cells that were connected with
      random weights. The tree that was generated became the path for the maze,
      start and end cells were chosen in oposite corners. We built two solvers,
      one that used BFS, and another that used DFS. The thing was animated and
      it was just so satisfying to watch it run. Especially after hitting our
      heads against a few bugs.

      <br />
      <div class="projectTitle">Seam Carving</div>
      <br />

      Seam carving is a process of finding the least "important" line of pixels
      in an image so that you can remove it to compress the image (horizonatally
      or vertically) without warping the image (to some extent). The concept of
      "important" was defined by pixel color values in relation to surrounding
      pixels. We then used a dynamic programming approach to find the seam with
      minimum value and removed it from the image.
      <br />
      <br />
      This process was also animated and increadibly satisfying to watch. The images
      got really distorted at the end, but I was surprised with how well the algorithm
      worked to keep the most interesting pixels in the image.

      <div class="subtitle">Object Oriented Design</div>
      Fun course, lots of work, took it over the summer. Fun projects illustrated
      below:

      <br />
      <div class="projectTitle">Image Editing GUI</div>
      <br />
      This was the last project that we did, it was the culmination of the year of
      work. We basically created a very primitive image editor that was capable of
      scaling images down, applying basic filters.
    </div>
  </div>
</div>

<style>
  .projectTitle {
    font-size: 1.6rem;
    position: relative;
    display: inline-block;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  .projectTitle::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 2px;
    background: var(--accent);
  }
</style>
