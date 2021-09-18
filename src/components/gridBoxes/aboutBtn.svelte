<script lang="ts">
</script>

<div class="container">
  <div class="box">
    <div class="title">About</div>
  </div>
</div>

<style>
  .box {
    border-top: 5px solid white;
    border-bottom: 5px solid white;
    padding: 10px;
    height: 100%;
    position: relative;
  }
  .box::after,
  .box::before {
    content: "";
    position: absolute;
    background: white;
    top: 0px;
    height: 100%;
    width: 5px;
    transition: all 0.3s ease;
  }
  .box::after {
    right: 0px;
    transform-origin: 0% -5px;
  }
  .box::before {
    left: 0px;
    transform-origin: 100% calc(100% + 5px);
  }

  .box:hover::after {
    transform: rotate(90deg);
  }
  .box:hover::before {
    transform: rotate(90deg);
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
