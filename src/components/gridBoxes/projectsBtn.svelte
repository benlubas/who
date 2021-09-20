<script lang="ts">
</script>

<div class="container">
  <div class="box">
    <div class="line" />
    <div class="bg" />
    <div class="btn-title">Projects</div>
  </div>
</div>

<style>
  .line {
    position: absolute;
    width: 5px;
    height: 100%;
    background: white;
    top: calc(100% - 5px);
    right: -6px;
    transform-origin: 50% 0px;
    transform: rotate(45deg);
    transition: all 0.3s ease;
  }
  .bg {
    background: white;
    opacity: 0.4;
    transition: all 0.3s ease;
    position: absolute;
    width: 100%;
    height: 100%;
    top: -100%;
    left: 0px;
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 75%,
      calc(100% - 33vh * 0.25) 100%,
      0% 100%,
      0% 0%
    );
  }
  .box:hover .bg {
    opacity: 0.15;
    top: 0px;
  }
  .box:hover .line {
    transform: translate(-25%, -25%) rotate(45deg);
  }
  .box {
    border-left: 5px solid white;
    border-top: 5px solid white;
    padding: 10px;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .box::after,
  .box::before {
    content: "";
    position: absolute;
    background: white;
    transition: all 0.3s ease;
  }
  .box::after {
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 5px;
  }
  .box::before {
    top: 0px;
    right: 0px;
    width: 5px;
    height: 100%;
  }

  .box:hover::after {
    width: calc(100% - 33vh * 0.25 + 6px);
  }
  .box:hover::before {
    height: 75%;
  }

  .container {
    padding: 1rem;
    height: 100%;
  }
</style>
