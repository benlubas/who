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
      These are the two entry level courses, the first was in Racket (I had never
      heard of it either). The second was in Java. The more interesting projects
      came towards the end of the second course. We made a maze generator and solver
      making use of Kruskals algorithm to generate a minimum spanning tree of grid
      cells that were connected with random weights. The tree that was generated
      became the path for the maze, start and end cells were chosen in oposite corners.
      We built two solvers, one that used BFS, and another that used DFS. The thing
      was animated and it was just so satisfying to watch it run. Especially after
      hitting our heads against a few bugs.

      <br />

      Shortly after this project came the seam carving algorithm. Seam carving
      is a process of finding the least "important" line of pixels in an image
      so that you can compress the image (horizonatally or vertically) without
      warping it (in theory). The concept of "important" was defined by pixel
      color values in relation to their surrounding pixels. We then used a
      dynamic programming approach to find the seam with minimum value and
      removed it from the image.
      <br />
      This process was also animated and was also increadibly satisfying to watch.
      The images got really distorted at the end, but I was surprised with how well
      the algorithm worked to keep the most interesting pixels in the image.
    </div>
  </div>
</div>
