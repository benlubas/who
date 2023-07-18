<script lang="ts">
  const name = "Ben Lubas";
  const subtitle = "computer science major";
  const availability = undefined;
  let phone = "xxx-xxx-xxxx";
  let email = "benmlubas@gmail.com";
  let website = "benlubas.com";
</script>

<div class="no-print">
  <p>
    This is my resume. You might notice my phone number missing. I don't want a
    bot to scrape it.
  </p>
  <p>
    Because this is a webpage, it's interactive! You can click links, hover for
    more info, and even edit parts of the page. It's also printable!
  </p>
</div>

<div class="resume">
  <div class="head">
    <div class="title-box">
      <div class="name">
        {name}
      </div>
      <div class="resume-subtitle">
        {subtitle}
      </div>
    </div>
    {#if availability}
      <div class="availability">{availability}</div>
    {/if}
    <div class="contact">
      <div class="phone" contenteditable bind:innerHTML={phone}>{phone}</div>
      <div class="email" contenteditable bind:innerHTML={email}>{email}</div>
      <div class="website" contenteditable bind:innerHTML={website}>{website}</div>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto:wght@300&family=Roboto+Condensed:wght@300&display=swap');
  .resume {
    border: 1px solid white;
    width: 960px;

    padding: 1in;

    --resume-accent: #0073ff;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 2px solid var(--resume-accent);
  }

  .name {
    font-family: 'Lora', serif;
    font-size: 28pt;
  }

  .resume-subtitle {
    text-transform: uppercase;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 300;
  }

  .contact div {
    text-align: right;
  }

  @page {
    size: 8.5in 9in;
  }

  @media print {
    .no-print {
      display: none !important;
    }
    .resume {
      border: none;
    }
  }
</style>
