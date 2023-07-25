<script lang="ts">
</script>

<li><slot /></li>

<style>
  li {
    display: inline;
  }

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
