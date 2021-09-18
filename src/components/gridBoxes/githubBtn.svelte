<script lang="ts">
</script>

<div class="container">
  <div class="clip-border box">
    <div class="title">Github</div>
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
    width: 100%;
    height: 100%;
    background: white;
    opacity: 0.4;
    position: absolute;
  }
  .box::after {
    top: 100%;
    left: 0px;
    clip-path: polygon(100% 0%, 100% 100%, 0% 100%, 100% 0%);
    transition: all 0.3s ease 0.25s;
  }
  .box::before {
    bottom: 100%;
    left: 0px;
    clip-path: polygon(0% 0%, 100% 0%, 0% 100%, 0% 0%);
    transition: all 0.3s ease;
  }

  .box:hover::after {
    top: 0%;
    opacity: 0.15;
  }
  .box:hover::before {
    bottom: 0%;
    opacity: 0.15;
  }

  .title {
    font-size: 4.5vw;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .container {
    padding: 1rem;
    height: 100%;
  }
</style>
