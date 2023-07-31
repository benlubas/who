<script lang="ts">
</script>

<div class="note">
  Note: <slot />
</div>

<style>
  .note {
    font-size: 0.8rem;
    filter: brightness(0.8);
    position: relative;
    padding-left: 0.5rem;
  }

  .note::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: var(--primary);
    opacity: 0.8;
  }
</style>
