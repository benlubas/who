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
      <div class="website" contenteditable bind:innerHTML={website}>
        {website}
      </div>
    </div>
  </div>
  <div class="r-body">
    <div class="top-body">
      <div id="education">
        <div class="r-section-title">Education</div>
        <div class="edu-section">
          <div class="activity-heading">
            <strong>Northeastern University</strong>
            <div class="activity-date">2020-2024</div>
          </div>
          <p>Khoury College of Computer Science</p>
          <p>Candidate for Bachelor of Science Computer Science, 2024</p>
          <p>Dean’s List | GPA: 3.68/4.00</p>
        </div>
        <div class="edu-section">
          <div class="edu-head">
            <strong>Plymouth Whitemarsh High School</strong>
            <div class="activity-date">2016-2020</div>
          </div>
          <p>4x Honor Roll | GPA: 3.97/4.00</p>
        </div>
      </div>
      <div id="knowledge-interests">
        <div class="tech-knowledge">
          <div class="r-section-title">Technical Knowledge</div>
          <div class="skill-list">
            Rails | TypeScript | React | Rust | HTML/CSS | Svelte | Clojure |
            SQL | Docker | K8s | Airflow
          </div>
        </div>
        <div class="interests">
          <div class="r-section-title">Interests</div>
          <ul>
            <li>Keyboards (with 36 keys)</li>
            <li>Gaming</li>
            <li>Hockey</li>
            <li>Artificial Intelligence</li>
          </ul>
        </div>
      </div>
    </div>
    <div id="work">
      <div class="r-section-title">Work Experience</div>
      <div class="job">
        <div class="activity-heading">
          <div class="job-title">
            <strong>Software Engineering Co-op</strong>, BookBub
          </div>
          <div class="activity-date">2022</div>
        </div>
        <ul>
          <li class="job-bullet">I did pretty well here</li>
          <li class="job-bullet">I did something else too</li>
        </ul>
      </div>
      <div class="job">
        <div class="activity-heading">
          <div class="job-title">
            <strong>Software Engineering Co-op</strong>, Wayfair
          </div>
          <div class="activity-date">2022</div>
        </div>
        <ul>
          <li class="job-bullet">I did pretty well here</li>
          <li class="job-bullet">I did something else too</li>
        </ul>
      </div>
    </div>
    <div id="projects">
      <div class="r-section-title">Projects</div>
      <div class="project">
        <div class="activity-heading">
          <div class="job-title">
            <strong>Dive Sheet Generator</strong>, Svelte | CSS
          </div>
          <div class="activity-date">August 2021</div>
        </div>
        <ul>
          <li class="job-bullet">
            Developed a web-based application that converts a CSV file to
            printable, league standard dive sheets
          </li>
          <li class="job-bullet">
            Saved approximately three minutes per diver&dash;upwards of 75
            minutes in total, per dive meet
          </li>
        </ul>
      </div>
      <div class="project">
        <div class="activity-heading">
          <div class="job-title">
            <strong>PW Voting Site</strong>, React | Node | MongoDB
          </div>
          <div class="activity-date">Jan-Jun, 2020</div>
        </div>
        <ul>
          <li class="job-bullet">
            Designed, prototyped, and developed a website capable of generating
            and distributing secure polls for the student body
          </li>
          <li class="job-bullet">
            Explained site usage and benefits to staff members
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Lora&family=Roboto:wght@300&family=Roboto+Condensed:wght@300&display=swap");
  .resume {
    border: 1px solid white;
    width: 8.5in;
    height: 11in;
    line-height: 1.4;

    padding: 1in;
    font-size: 9pt;

    --resume-accent: #0073ff;
  }

  .top-body {
    display: grid;
    grid:
      [r1-start] "education knowledge-interests" 100% [r1-end]
      / 60fr 40fr;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 2px solid var(--resume-accent);
    margin-bottom: 8px;
  }

  .activity-heading {
    display: flex;
    justify-content: space-between;
    font-size: 10pt;
  }

  .activity-date {
    font-style: italic;
  }

  .name {
    font-family: "Lora", serif;
    font-size: 20pt;
  }

  #knowledge-interests {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }
  #knowledge-interests ul {
    list-style: none;
    margin-left: 0;
  }

  .resume-subtitle {
    text-transform: uppercase;
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 300;
    font-size: 14pt;
  }

  .r-section-title {
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 14pt;
    margin-bottom: 8px;
    margin-top: 8px;
  }
  .r-section-title::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--resume-accent);
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
