<script lang="ts">
</script>

<div class="container">
  <div class="clip-border box">
    <div class="btn-title">Resume</div>
  </div>
</div>

<style>
  .box {
    border: 5px solid var(--primary);
    padding: 10px;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .box::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: -5px;
    width: 150%;
    rotate: -90deg;
    transform-origin: left 0;
    height: 5px;
    background: var(--primary);
    transition: all 0.3s ease;
  }
  .box:hover::after {
    rotate: 0deg
  }
  .box::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    rotate: -90deg;
    transform-origin: left 100%;
    width: 150%;
    height: 100%;
    background: var(--primary);
    opacity: 0.45;
    transition: rotate 0.3s ease, opacity 0.4s linear;
  }
  .box:hover::before {
    rotate: 0deg;
    opacity: 0.15;
  }
  .container {
    padding: 1rem;
    height: 100%;
  }
</style>
