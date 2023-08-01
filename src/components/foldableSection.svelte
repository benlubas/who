<script>
  export let title = "Foldable Section";
  let open = false;
</script>

<div class="foldable" class:open>
  <div class="foldable-title" on:click={() => (open = !open)}>
    <div class="title">{title}</div>
    <button class="transparent-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
      >
        <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License
- https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
          d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8
          0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352
          160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8
          0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
        />
      </svg>
    </button>
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
  svg {
    fill: var(--primary);
    rotate: 0;
    transition: rotate 0.5s ease-in-out;
  }
  .open svg {
    rotate: 90deg;
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

  .content {
    margin-left: 1.5rem;
    transition: max-height 0.5s ease-in-out;
    position: relative;
    overflow: hidden;
  }
  .content :global(li) {
    margin-left: 2rem;
  }
  .open .content {
    max-height: 100vh;
  }
  :not(.open) .content {
    max-height: 0vh;
  }
</style>
