<script lang="ts">
  import TextCarosel from "./../textCarosel.svelte";
</script>

<div class="title">Ben Lubas</div>
<TextCarosel
  list={[
    "Software Dev",
    "Web Dev",
    "Svelte Advocate",
    "React Adept",
    "Java Disciple",
    "Python Aficionado",
    "AI Whisperer",
    "PHP *Sucks*",
    "Google Poweruser",
    "CSS God",
  ]}
/>

<style>
  .title {
    font-size: 3rem;
    font-family: Roboto, sans-serif;
    font-weight: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
</style>
