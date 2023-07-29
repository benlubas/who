<script lang="ts">
</script>

<li><slot /></li>

<style>
  li {
    display: inline;
  }

  /*
    this is a really cool trick from stack overflow:
    https://stackoverflow.com/questions/37052659/responsive-separator-for-horizontal-list 
  */
  li::after {
    content: " ";
    word-spacing: 1em;
    background-image: linear-gradient(
      -0.2turn,
      transparent 0 calc(50% - 0.03em),
      currentcolor 0 calc(50% + 0.03em),
      transparent 0
    );
  }
</style>
