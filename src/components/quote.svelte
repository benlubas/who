<div class="quote">
  <slot />
</div>

<style>
  .quote {
    margin-left: 1.6rem;
    position: relative;
    font-style: italic;
    opacity: 0.8;
  }
  .quote::after {
    content: "";
    position: absolute;
    top: 0;
    left: -1rem;
    width: 0.4rem;
    height: 100%;
    background: var(--accent);
    border-radius: 0.1rem;
  }
</style>
