<script lang="ts">
  import SubTitle from "./subTitle.svelte";
</script>

<div class="full">
  <div class="title">Ben Lubas</div>

  <SubTitle
    list={[
      "Software Dev",
      "Web Dev",
      "Svelte Advocate",
      "React User",
      "Java Disciple",
      "Python Aficionado",
      "AI Whisperer",
      "PHP *Sucks*",
      "Knows How to Google",
      "CSS God",
    ]}
  />
</div>

<style>
  .title {
    font-size: 3rem;
    font-family: Roboto, sans-serif;
    font-weight: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .full {
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--bg);
    color: var(--primary);
  }
</style>
