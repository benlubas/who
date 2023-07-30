<script lang="ts">
  import PageTitle from "../components/PageTitle.svelte";
  import Resume from "../components/resume.svelte";

  // TODO: Implement this functionality later on. Add some other options to show/hide things?
  // add the ability to edit the list of skills. Maybe show a little plus when you hover the section
  // to add new entries
  // let showAvailability = true;
</script>

<div class="page-cont">
  <div class="text">
    <div class="no-print">
      <PageTitle title="Resume" />
      This is my resume! It's still a work in progress, as I'd like it to be more
      interactive. That said, it's still a resume, and it's printable. Also, parts
      of the resume are editable.

      <!-- TODO: add this back with the availability work <input -->
      <!--   type="checkbox" -->
      <!--   id="showAvailability" -->
      <!--   bind:checked={showAvailability} -->
      <!-- /> -->
      <!-- <label for="showAvailability">Show Availability</label> -->
    </div>
    <div class="flex-center">
      <div class="resume-border">
        <Resume />
      </div>
    </div>
  </div>
</div>

<style>
  .resume-border {
    border: 1px solid var(--primary);
    display: inline-block;
  }

  @page {
    size: 8.5in 11in;
  }

  @media print {
    .no-print {
      display: none !important;
    }
    .resume-border {
      border: none;
    }
    .page-cont {
      padding: 0;
      margin: 0;
    }
    .text {
      padding: 0;
      margin: 0;
    }
  }
</style>
