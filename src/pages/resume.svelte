<script lang="ts">
  import PageTitle from "../components/PageTitle.svelte";
  import FoldableSection from "../components/foldableSection.svelte";
  import Note from "../components/note.svelte";
  import Resume from "../components/resume.svelte";
  import ThemeSwitcher from "../components/themeSwitcher.svelte";
  import { theme } from "../stores";

  // TODO: Implement this functionality later on. Add some other options to show/hide things?
  // add the ability to edit the list of skills. Maybe show a little plus when you hover the section
  // to add new entries
  // let showAvailability = true;

  let style = 0;
  const styles = ["plain", "cookie-cutter"];
  $: style %= styles.length;
</script>

<div class="page-cont">
  <div class="text">
    <div class="no-print">
      <PageTitle title="Resume" />
      <Note mobile glow>
        You are on a small screen, and might have a bad experience on this page.
        If you need to use the small screen, I'd recommend printing this page,
        and viewing the resume in a PDF viewer.
      </Note>

      This is my resume! It's still a work in progress, as I'd like it to be
      more interactive. It's currently printable, with some editable parts.
      There are two styles, you can
      <span class="text-btn" on:click={() => (style = style + 1)}>switch</span>
      between them by clicking
      <span class="text-btn" on:click={() => (style = style + 1)}>switch</span>.
      <Note>
        Note: My phone number is missing as I'd rather not have it get scraped.
      </Note>

      <!-- TODO: add this back with the availability work <input -->
      <!--   type="checkbox" -->
      <!--   id="showAvailability" -->
      <!--   bind:checked={showAvailability} -->
      <!-- /> -->
      <!-- <label for="showAvailability">Show Availability</label> -->
    </div>
    <div class="flex-center resume-container">
      <div class="resume-border">
        <Resume style={styles[style]} />
      </div>
    </div>
    <div class="print-instructions no-print">
      <div class="subtitle">Printing</div>
      {#if $theme === "dark"}
        Firstly, you probably want the light theme, click this icon to change
        the theme: <ThemeSwitcher />
        <br />
      {/if}
      You can follow these short, browser-specific, instructions to print the resume
      properly:
      <FoldableSection title="Chrome/Chromium">
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
    box-shadow: 0 0 15px var(--box-shadow);
    transition: box-shadow 0.5s ease-in-out;
    display: inline-block;
    margin-top: 1rem;
    overflow: scroll;
  }

  .text-btn {
    cursor: pointer;
    color: var(--accent);
    font-weight: bold;
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
      margin-top: 0;
    }
    .page-cont {
      padding: 0;
      margin: 0;
      background: var(--print-bg);
    }

    .text {
      padding: 0;
      margin: 0;
    }
  }
</style>
