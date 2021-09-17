<script lang="ts">
  import { url } from "@sveltech/routify";

  export let title = "New Page";
</script>

<div class="title-container">
  <div class="page-title">{title}</div>

  <a href={$url("/")}>&leftarrow; Back</a>
  <br /><br />
</div>
