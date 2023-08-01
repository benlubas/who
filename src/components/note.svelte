<script lang="ts">
  export let mobile = false;
  export let glow = false;
</script>

<div class="note" class:mobile class:glow>
  <slot />
</div>

<style>
  .note {
    font-size: 0.8rem;
    filter: brightness(0.8);
    position: relative;
    padding-left: 0.5rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
  .note.glow {
    filter: brightness(1);
  }

  .note::before {
    content: " ";
    position: absolute;
    transition: background 0.5s ease-in-out;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: var(--primary);
    opacity: 0.8;
  }
  .note.glow::before {
    box-shadow: 0 0 10px var(--accent);
    background: var(--accent);
  }

  .mobile {
    display: none;
  }

  @media (max-width: 768px) {
    .mobile {
      display: block;
    }
  }
</style>
