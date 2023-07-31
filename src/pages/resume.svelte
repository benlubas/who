<script lang="ts">
  import PageTitle from "../components/PageTitle.svelte";
  import FoldableSection from "../components/foldableSection.svelte";
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
      interactive.

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
    <div class="print-instructions no-print">
      <div class="subtitle">Printing</div>
      Please follow these simple instructions to print this resume properly:
      <FoldableSection title="Chrome(ium Based)">
        <ol>
          <li>
            Open the print dialog with <strong>control + p</strong> (or
            <strong>command + p</strong> on mac)
          </li>
          <li>Margins &gt; None</li>
          <li>Check <em>Background Graphics</em></li>
        </ol>
      </FoldableSection>
      <FoldableSection title="FireFox">
        <ol>
          <li>
            Open the print dialog with <strong>control + p</strong> (or
            <strong>command + p</strong> on mac)
          </li>
          <li>Click <em>More settings</em></li>
          <li>Margins &gt; None</li>
          <li>Check <em>Print backgrounds</em></li>
          <li>Make sure <em>Print headers and footers</em> is unchecked</li>
        </ol>
      </FoldableSection>
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
