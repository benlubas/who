<script>
  export let title = "Foldable Section";
  let open = false;
</script>

<div class="foldable" class:open>
  <div class="foldable-title" on:click={() => (open = !open)}>
    <div class="title">{title}</div>
    <button>{open ? "close" : "open"}</button>
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .foldable-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    position: relative;
  }
  .foldable-title:hover {
    cursor: pointer;
  }
  .foldable-title::after {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 1px;
    top: 100%;
    left: 0;
    background: var(--primary);
  }
  .title {
    font-family: var(--title-font);
    font-size: calc(var(--subtitle-font-size) - 0.6rem);
    font-weight: 600;
    margin-top: 0;
  }

  button {
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    margin: 0;
    color: var(--primary);
  }
  button:active {
    outline: none;
    border: none;
  }

  .content {
    margin-left: 2.5rem;
    transition: max-height 0.5s ease;
    position: relative;
    overflow: hidden;
  }
  .open .content {
    max-height: 100vh;
  }
  :not(.open) .content {
    max-height: 0vh;
  }
</style>
