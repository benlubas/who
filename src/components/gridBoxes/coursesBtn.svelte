<script lang="ts">
</script>

<div class="container">
  <div class="clip-border box">
    <div class="title">Courses</div>
  </div>
</div>

<style>
  .box {
    border: 5px solid white;
    /* border-radius: 15px; */
    padding: 10px;
    height: 100%;
    position: relative;
  }
  .box::after {
    content: "";
    position: absolute;
    top: 0px;
    left: -5px;
    width: 5px;
    height: 100%;
    background: white;
    transition: all 0.3s ease;
  }
  .box:hover::after {
    left: 100%;
  }
  .box::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0%;
    height: 100%;
    background: white;
    opacity: 0.45;
    transition: width 0.3s ease, opacity 0.4s linear;
  }
  .box:hover::before {
    width: 100%;
    opacity: 0.1;
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

  /* .clip-border {
    --width: 5px;
    background: white;
    clip-path: polygon(
      0% 0%,
      0% 100%,
      var(--width) 100%,
      var(--width) var(--width),
      calc(100% - var(--width)) var(--width),
      calc(100% - var(--width)) calc(100% - var(--width)),
      var(--width) calc(100% - var(--width)),
      0 100%,
      100% 100%,
      100% 0%
    );
  } */
</style>
