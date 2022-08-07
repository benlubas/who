<script lang="ts">
  import PageTitle from "../components/PageTitle.svelte";
</script>

I'm just going to scrap this page as a whole I think. Replace it with work. This is 
both boring to read and write. On top of that, I remember very little from all of 
these classes. 
<div class="page-cont">
  <div class="text">
    <PageTitle title="Course Work" />
    On this page I'll briefly discuss the CS courses that I've taken at Northeastern. 
    Note that apparent semester gaps are when I'm on co-op. 

    <div class="subtitle">Fall 2021</div>
    <div class="projectTitle">Systems -</div>
    <br />

    <div class="projectTitle">Foundations of AI -</div>
    This class starts with search and graph basics, and continues into A*, reinforcement
    learning, and Bayesian Networks, among others.<br />

    <div class="projectTitle">Fundamentals of Cyber Security -</div>
    How to not leave horribly obvious back doors in systems.<br />

    <div class="subtitle">Freshmen Year (2020-21)</div>
    <div class="projectTitle">Fundies 1 & 2</div>
    Fundamentals of Computer Science 1 & 2 are the two entry level courses at Northeastern,
    the first is taught in Racket (I had never heard of it either), the second was
    in Java. I learned about Functional and OO Programming, the differences, advantages,
    and disadvantages of each. I'll briefly mention a few of the more interesting
    projects from Fundies 2.

    <br />
    <div class="projectTitle">Maze Solver</div>
    <br />

    The more interesting projects came towards the end of the second course. We
    made a maze generator and solver making use of Kruskal's algorithm to
    generate a minimum spanning tree of grid cells that were connected with
    random weights. The tree that was generated became the path for the maze,
    start and end cells were chosen in opposite corners. We built two solvers,
    one that used BFS, and another that used DFS. The thing was animated and it
    was just so satisfying to watch it run. Especially after hitting our heads
    against a few bugs.

    <br />
    <div class="projectTitle">Seam Carving</div>
    <br />

    Seam carving is a process of finding the least "important" line of pixels in
    an image so that you can remove it to compress the image (horizontally or
    vertically) without warping the image (to some extent). The concept of
    "important" was defined by pixel color values in relation to surrounding
    pixels. We then used a dynamic programming approach to find the seam with
    minimum value and removed it from the image.
    <br />
    <br />
    This process was also animated and incredibly satisfying to watch. The images
    got really distorted at the end, but I was surprised with how well the algorithm
    worked to keep the most interesting pixels in the image.

    <div class="subtitle">Object Oriented Design</div>
    Fun course, lots of work, took it over the summer. Fun projects illustrated below:

    <br />
    <div class="projectTitle">Image Editing GUI</div>
    <br />
    This was the last project that we did, it was the culmination of the year of
    work. We basically created a very primitive image editor that was capable of
    scaling images down, applying basic filters and effects, and then exporting those
    images. We used Java Spring to build the UI. This, unlike the other two projects,
    was not very satisfying, it was slow and clunky, and it looked really bad.
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
