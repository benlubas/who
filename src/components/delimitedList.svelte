<script lang="ts">
  // to be used with <DelimitedListItem>
  export let justify = false;
</script>

<ul class="dl-list" class:justify>
  <slot />
</ul>

<style>
  ul {
    padding: 0;
    margin: 0;
  }
  ul.justify {
    text-align: justify;
    text-align-last: justify;
  }
</style>
