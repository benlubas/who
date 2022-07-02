<div class="quote">
  <slot />
</div>

<style>
  .quote {
    margin-left: 1.6rem;
    position: relative;
  }
  .quote::after {
    content: "";
    position: absolute;
    top: 0;
    left: -1rem;
    width: 0.5rem;
    height: 100%;
    background: white;
    border-radius: 0.1rem;
  }
</style>
