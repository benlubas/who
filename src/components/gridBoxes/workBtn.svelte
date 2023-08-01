<script lang="ts">
</script>

<div class="container">
  <div class="clip-border box">
    <div class="btn-title">Work</div>
  </div>
</div>

<style>
  .box {
    border: 5px solid var(--primary);
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
    background: var(--primary);
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
    background: var(--primary);
    opacity: 0.45;
    transition: width 0.3s ease, opacity 0.4s linear;
  }
  .box:hover::before {
    width: 100%;
    opacity: 0.15;
  }
  .container {
    padding: 1rem;
    height: 100%;
  }
</style>
