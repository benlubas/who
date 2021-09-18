<script lang="ts">
</script>

<div class="container">
  <div class="box">
    <div class="title">About</div>
  </div>
</div>

<style>
  .box {
    border: 5px solid white;
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
    opacity: 0.4;
    height: 100%;
    width: calc(50% + 0.5px);
    transition: all 0.3s ease;
    z-index: 2;
  }
  .box::after {
    right: -1px;
    top: 100%;
  }
  .box::before {
    left: 0px;
    bottom: 100%;
  }

  .box:hover::after {
    top: 0px;
    opacity: 0.15;
  }
  .box:hover::before {
    bottom: 0px;
    opacity: 0.15;
  }
  .title {
    font-size: 4.5vw;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .container {
    padding: 1rem;
    height: 100%;
  }
</style>
