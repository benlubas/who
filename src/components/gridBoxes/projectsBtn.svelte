<script lang="ts">
</script>

<div class="container">
  <div class="box">
    <div class="title">Projects</div>
  </div>
</div>

<style>
  .box {
    border-left: 5px solid white;
    border-right: 5px solid white;
    padding: 10px;
    height: 100%;
    position: relative;
  }
  .box::after,
  .box::before {
    content: "";
    position: absolute;
    background: white;
    left: 0px;
    width: 100%;
    height: 5px;
    transition: all 0.3s ease;
  }
  .box::after {
    bottom: 0px;
  }
  .box::before {
    top: 0px;
  }

  .box:hover::after {
    width: 0%;
  }
  .box:hover::before {
    width: 0%;
    left: 100%;
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
