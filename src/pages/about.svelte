<script lang="ts">
  import PageTitle from "../components/PageTitle.svelte";
  import { url } from "@roxi/routify";
</script>

<div class="page-cont">
  <div class="text">
    <PageTitle title="About" />
    Hi, I'm Ben Lubas! I'm currently a student at Northeastern University studying
    computer science. Firstly, welcome to my website! I hope you enjoyed the homepage,
    I had a ton of fun making it. I'm going to split this about page into categories,
    so feel free to skip over the boring parts. First up...

    <div class="subtitle">Programming Experience</div>
    I got my start in computer science in high school, where I took two intro to
    web dev courses, APCS A, and APCS Principles (which was a capstone course at
    my school). In them, I learned HTML, CSS, JavaScript, PHP, and SQL. I went on
    to take an independent study in computer science titled Advanced Web Dev. During
    that class time I taught myself React, Node/Express, and MongoDB and created
    another website for the school.

    <br /> <br />

    The next summer I heard about Svelte, and decided that I'd like to learn how
    to use it. I made a small practice site and followed the tutorial, and I
    remade parts of an older React project. Nothing too crazy, but it was more
    than enough to decide that I liked it better than React.

    <br /> <br />

    Then I went off to college, learned a functional language called Racket
    that's only used for teaching. After that most of the early course work was
    in Java. Luckily, in my seconds and third year I've been taking more courses
    that move away from Java. At the time of writing, I have three different
    courses all in different languages: Software Engineering in TypeScript;
    Machine Learning and Data Mining in Python; and Networks and Distributed
    Systems, which is language agnostic, so I chose Rust.

    <br /> <br />

    <div class="subtitle">Skills</div>
    I'll elaborate a little bit on the "Languages and Frameworks" and "Software"
    sections of my resume.
    <ul>
      <li>
        Python - One of my most comfortable languages. Used Python for school
        for years, I've done AI/ML projects, and I worked in a large production
        Python codebase at Wayfair.
      </li>
      <li>
        Java (Spring Boot) - Java is frankly a language that I would prefer not
        to work with but know very well. Worked with backend micro-services
        setup with Spring Boot at Wayfair.
      </li>
      <li>
        TypeScript - JS was my first programming language, and for a long time
        was my most comfortable programming language. TypeScript just takes JS
        and makes it so much harder to shoot yourself in the foot.
      </li>
      <li>
        Rust - Rust is my favorite language (apparently so much so that it was
        on an earlier version of resume twice...whoops), but also the one that
        I've picked up most recently. I'm taking a Networks class and using Rust
        for all the assignments, and it's been really enjoyable to work in.
      </li>
      <li>
        HTML/CSS, Svelte, and React - I'm grouping these together because, yeah.
        Svelte &gt; React. And I actually enjoy writing custom CSS (sometimes).
      </li>
      <li>
        SQL - Learned MySQL originally. Since then, I've used Google Big Query
        and Microsoft SQL server at Wayfair. I worked with some 100+ line GBQ
        queries somewhat regularly at Wayfair.
      </li>
      <li>
        Docker and K8s - My experience here is, admittedly, limited. I worked
        with Docker and Kubernetes at Wayfair. The team I was one maintained
        multiple micro-services distributed using Docker/K8s.
      </li>
    </ul>

    <div class="subtitle">Interests</div>
    I've got a couple interests listed on my resume. So I'll just run through those
    in order, and elaborate a little bit.

    <ul>
      <li>
        Keyboards:
        <br />
        Long story short: I use a keyboard with 36 keys on it. Each hand has a column-staggered
        3x5 grid + 3 thumb keys. A lot of people are surprised that I can actually
        work on a keyboard this small and still type around 100 wpm, and I'm surprised
        that I was ever able to work for long periods of time on a laptop keyboard.
      </li>
      <li>
        Neovim:
        <br />
        Actually going to list this as an interest even though it's under the "Software"
        section of my resume. <br />
        I picked up Neovim during the summer after my Wayfair co-op. I've used Vim
        bindings for a long time, but I always just used the VS Code extension. I
        didn't even realize you could actually use Vim full-time. I didn't think
        you would still have all the convince of LSP or autocomplete or snippets
        or spellcheck etc. Of course, the configuration is a lot of work, but I had
        a lot of free time, and now that I'm setup, I really enjoy working in Neovim.
        It's fast, it's lightweight, and I don't feel like I'm making compromises.
      </li>
      <li>Gaming: <br /> I mainly play Rocket League these days.</li>
      <li>
        Hockey: <br /> I played in high school and I still enjoy watching and skating
        whenever I can.
      </li>
      <li>
        Artificial Intelligence: <br /> Honestly, as time goes on I'm less interested
        and more paying attention because it's both awe-inspiring and terrifying.
      </li>
    </ul>

    <div class="subtitle">This Website and Svelte</div>
    This site is built with Svelte, Svelte is basically a web framework like React
    as far as writing components goes. The difference is in what happens next. Basically,
    Svelte just compiles what you write to optimized HTML, CSS, and JS. If you'd
    like to learn more, I'll link their
    <a href="https://www.svelte.dev" target="_blank" rel="noopener noreferrer">
      site</a
    >
    and you can look around.

    <br /> <br />

    I ran into Svelte when v3.0 was launched, and started to learn it. I had
    already used React, but I liked this much better. Svelte components are
    cleaner and make more sense than React components.

    <br /> <br />

    More technical stuff about the site, it's just a front end, I wanted to be
    able to host it for free. I'm only using the Svelte framework with
    <a href="https://routify.dev" target="_blank" rel="noopener noreferrer"
      >Routify</a
    >
    for page routing. No additional external JS, no external CSS. I should note,
    that I am making use of some of Svelte's built in animation functionality for
    the text carousel. But everything else has been written by me.

    <br /><br />

    This entire website is hosted on GitHub and the source code is visible there
    as well.
    <a
      href="https://www.github.com/benlubas/who"
      target="_blank"
      rel="noopener noreferrer">Link.</a
    >

    <div class="subtitle">Education&mdash;High School</div>
    I graduated from high school in 2020; I was around the top of my class. I had
    a 4.958 weighted GPA, took a bunch of AP classes, and was the assistant captain
    of the Varsity Ice Hockey team. As a freshman I took two introductory CS courses,
    CS1 & CS2. These introduced HTML, CSS, and JavaScript. Next year I took APCS
    A (a course in Java). The year after I took APCS Principles (our capstone course),
    along side AP Chem. Senior year I did an independent study in web development,
    AP Calc BC, AP Stat (it was statistics was 'stat' at my high school the same
    way mathematics was 'math'), and AP Physics C.

    <br /> <br />

    You can read more about the projects that I did in my time in high school on
    the <a href={$url("/projects")}> projects page.</a>

    <div class="subtitle">Education&mdash;College</div>
    I'm currently attending Northeastern University in Boston. I'm a CS major, graduating
    in 2024 (assuming that nothing crazy happens). Northeastern has a very 'focused'
    curriculum. That is to say, I take a lot of CS and CS adjacent courses, and not
    very many extra courses. Don't get me wrong, I have my share of history and writing,
    but the majority of my coursework is in the CS field. That's one of the reasons
    that I really like this school.

    <br /> <br />

    Additionally, this school has a co-op program, so the second semesters of my
    second and third years, I don't have classes and I just work a full time job
    in the CS field instead. The first co-op I took was at Wayfair, and I'm in
    the process of searching for the second at the time of writing. You can read
    more about how that went on the <a href={$url("/work")}> work page.</a>
  </div>
</div>
