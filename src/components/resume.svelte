<script>
  import DelimitedList from "./delimitedList.svelte";
  import DelimitedListItem from "./delimitedListItem.svelte";

  export let style = "plain";

  const name = "Ben Lubas";
  let subtitle = "software engineer";
  let showLocation = true;
  let location = "Boston - Willing to relocate";
  let phone = "xxx-xxx-xxxx";
  let email = "benmlubas@gmail.com";
  let website = "benlubas.com";

  const expertSkills = [
    "Python",
    "TypeScript",
    "Rails",
    "git",
    "Lua",
    "SQL",
    "React",
    "HTML",
    "CSS",
    "(Neo)Vim",
    "Java",
    "Bash",
  ];

  const advancedSkills = [
    "Rust",
    "C++",
    "Svelte",
    "Clojure",
    "Docker",
    "Airflow",
    "AWS",
  ];

  const interests = ["Tiny Keyboards", "Neovim", "Gaming"];

  const jobs = [
    {
      company: "BookBub",
      title: "Software Engineer",
      date: "Jan-Jul 2023",
      bullets: [
        "Partially automated the migration of JavaScript tests from Enzyme to RTL + Jest decreasing\
        the projected port time from five months to just under two months",
        "Conducted experiments on the ads platform, collected and analyzed data, and presented\
        actionable insights to improve ad revenue",
        "Triaged, sized, planned, and executed on tickets and bug fixes to ensure smooth internal\
        and partner-facing platform operation",
      ],
    },
    {
      company: "Wayfair",
      title: "Software Engineer",
      date: "Jan-Jun 2022",
      bullets: [
        'From my manager at Wayfair: "[Ben] quickly onboarded and fully contributed as a member of\
        the squad for the majority of his coop. Ben stretched himself beyond just executing on\
        tickets to fully leading epics for the team. He is consistently strong in his data driven\
        communication and works well cross functionally. At this point he is performing way above\
        the expectations of a coop and is operating at the level of an L2 engineer on the team"',
        "Lead a small to medium scoped epic—including writing the solution design, creating\
        tickets, executing on tickets, and communicating progress and results",
      ],
    },
  ];

  const projects = [
    {
      title: "Molten",
      date: "Oct 2023 - Present",
      technologies: "Python | Lua | Jupyter | Neovim",
      bullets: [
        "Develop and maintain an opensource Neovim plugin for: interactively running code via the\
        Jupyter Kernel; rendering output (including images) inside Neovim; and saving/loading\
        notebook data.",
        "Integrate with and contribute to other opensource software to create an incredible\
        Jupyter-notebook-esque experience in Neovim",
        "Implement multiple large user requested features without breaking existing plugin users",
      ],
    },
    {
      title: "Dive Sheet Generator",
      date: "August 2021",
      technologies: "Svelte | CSS",
      bullets: [
        "Developed a web-based application that converts a CSV file to printable, league standard dive sheets",
        "Saved approximately three minutes per diver—upwards of 75 minutes in total, per dive meet",
      ],
    },
    {
      title: "PW Voting Site",
      date: "Jan-Jun 2020",
      technologies: "React | Node/Express | MongoDB",
      bullets: [
        "Designed, prototyped, and developed a website capable of generating and distributing\
        secure polls for the student body",
        "Presented site usage and benefits to school staff members",
      ],
    },
  ];
</script>

<div class={`resume ${style}`}>
  <div class="head">
    <div class="title-box">
      <div class="name-box">
        <div class="name">
          {name}
        </div>
        {#if showLocation}
          <div class="availability">
            <span contenteditable bind:innerHTML={location} />
          </div>
        {/if}
      </div>
      <div class="resume-subtitle" contenteditable bind:innerHTML={subtitle} />
    </div>
    <div class="contact">
      <div
        class="phone"
        contenteditable
        spellcheck={false}
        bind:innerHTML={phone}
      />
      <div
        class="email"
        contenteditable
        spellcheck={false}
        bind:innerHTML={email}
      />
      <div
        class="website"
        contenteditable
        spellcheck={false}
        bind:innerHTML={website}
      />
    </div>
  </div>
  <div class="r-body">
    <div class={`top-body ${style}`}>
      <div id="education" class="r-section">
        <div class="r-section-title">Education</div>
        <div class="edu-section">
          <div class="activity-heading">
            <strong>Northeastern University</strong>
            <div class="activity-date">2020-2024</div>
          </div>
          <p>Khoury College of Computer Science</p>
          <p>Degree: Bachelor of Science Computer Science</p>
          <p>Magna Cum Laude | GPA: 3.73/4.00</p>
        </div>
        <div class="edu-section">
          <div class="activity-heading">
            <strong>Plymouth Whitemarsh High School</strong>
            <div class="activity-date">2016-2020</div>
          </div>
          <p>4x Honor Roll | GPA: 3.97/4.00</p>
        </div>
      </div>
      <div id="knowledge-interests" class={style}>
        <div class="tech-knowledge r-section">
          <div class="r-section-title">Technical Knowledge</div>
          <DelimitedList justify={style == "plain"}>
            <div class="delimited-list-label">Expert:&nbsp;</div>
            {#each expertSkills as skill}
              <DelimitedListItem>{skill}</DelimitedListItem>
            {/each}
          </DelimitedList>
          <DelimitedList justify={style == "plain"}>
            <div class="delimited-list-label">Advanced:&nbsp;</div>
            {#each advancedSkills as skill}
              <DelimitedListItem>{skill}</DelimitedListItem>
            {/each}
          </DelimitedList>
        </div>
        {#if style === "plain"}
          <!-- this doesn't fit on the page with the cookie-cutter layout -->
          <div class="interests r-section">
            <div class="r-section-title">Interests</div>
            <DelimitedList justify={style == "plain"}>
              {#each interests as interest}
                <DelimitedListItem>{interest}</DelimitedListItem>
              {/each}
            </DelimitedList>
          </div>
        {/if}
      </div>
    </div>
    <div id="work" class="r-section">
      <div class="r-section-title">Work Experience</div>
      {#each jobs as job}
        <div class="job">
          <div class="activity-heading">
            <div class="job-title">
              <strong>{job.title}</strong>, {job.company}
            </div>
            <div class="activity-date">{job.date}</div>
          </div>
          <ul>
            {#each job.bullets as bullet}
              <li class="job-bullet">{bullet}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
    <div id="projects" class="r-section">
      <div class="r-section-title">Projects</div>
      {#each projects as project}
        <div class="project">
          <div class="activity-heading">
            <div class="job-title">
              <strong>{project.title}</strong>, {project.technologies}
            </div>
            <div class="activity-date">{project.date}</div>
          </div>
          <ul>
            {#each project.bullets as bullet}
              <li class="job-bullet">{bullet}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Lora&family=Roboto:wght@300&family=Roboto+Condensed:wght@300&display=swap");
  .resume {
    width: 8.5in;
    height: 11in;
    line-height: 1.4;

    padding: 1in;
    font-size: 10pt;
    box-sizing: border-box;

    --resume-accent: var(--accent);
  }

  .resume.cookie-cutter {
    padding: 0.65in;
  }

  .top-body.plain {
    display: grid;
    grid:
      [r1-start] "education knowledge-interests" 100% [r1-end]
      / 60fr 40fr;
  }

  .top-body.cookie-cutter {
    display: grid;
    grid:
      [r1-start] "education" auto [r1-end]
      [r2-start] "knowledge-interests" auto [r2-end]
      / 100%;
  }

  .head {
    display: grid;
    grid:
      [r1-start] "name contact-info" 100% [r1-end]
      / 60fr 40fr;
    width: 100%;
    margin-bottom: 8px;
  }

  .edu-section {
    margin-bottom: 8px;
  }

  /* this is kinda fun, but idk */
  /* .r-section:hover .r-section-title { */
  /*   filter: drop-shadow(0 0 1rem var(--primary)); */
  /* } */

  .delimited-list-label {
    display: inline;
    font-weight: bold;
  }

  .activity-heading {
    display: flex;
    justify-content: space-between;
    font-size: 11pt;
  }

  .activity-date {
    font-style: italic;
  }

  .name-box {
    display: flex;
    justify-content: space-between;
    align-items: end;
    border-bottom: 2px solid var(--resume-accent);
  }

  .name {
    font-family: "Lora", serif;
    font-size: 24pt;
    line-height: 1;
  }

  #knowledge-interests {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }

  #knowledge-interests.cookie-cutter {
    padding-left: 0;
  }

  .resume-subtitle {
    text-transform: uppercase;
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 300;
    font-size: 11pt;
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

  @media print {
    .resume {
      background: var(--print-bg);
    }
  }
</style>
