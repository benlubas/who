<script lang="ts">
</script>

<div class="container">
  <div class="outer-box">
    <div class="box">
      <!-- <div class="line" /> -->
      <div class="bg" />
      <div class="btn-title">Projects</div>
    </div>
  </div>
</div>

<style>
  .bg {
    background: white;
    opacity: 0.4;
    transition: all 0.3s ease;
    position: absolute;
    width: 100%;
    height: 100%;
    top: -100%;
    left: 0px;
  }
  .box:hover .bg {
    opacity: 0.15;
    top: 0px;
  }

  .box {
    border: 5px solid white;
    padding: 10px;
    height: 100%;
    position: relative;
  }
  .outer-box::after {
    content: "";
    position: absolute;
    background: var(--bg);
    border: 5px solid var(--primary);
    transition: all 0.3s ease;
    top: 100%;
    left: 50%;
    width: 100%;
    height: 75%;
    pointer-events: none;
    transform-origin: top;
    rotate: -45deg;
  }

  .outer-box:hover::after {
    transform: translate(0, -31%);
  }

  .outer-box {
    position: relative;
    overflow: hidden;
    height: 100%;
    position: relative;
  }

  .container {
    padding: 1rem;
    height: 100%;
  }
</style>
