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

    Then I went off to college at Northeastern University. In my time here I've
    learned Racket (a functional language), and deepened my knowledge of Python,
    JavaScript/TypeScript, Java, and React. I also picked up Rust, and used it
    in a language agnostic class for a little while.

    <br /> <br />

    Northeastern in a co-op school as well, you can read more about that on the
    <a href={$url("/work")}>work</a>
    page. The short version is I've gained more than a year of working experience
    as a software engineer in my time at Northeastern. Between those two co-ops I've
    worked in Java, Ruby on Rails, React, Python, and Clojure, and I've worked with
    many additional supporting technologies and platforms.

    <div class="subtitle">Skills</div>
    I'll elaborate a little bit on the "Languages and Frameworks" and "Software"
    sections of my resume.
    <ul>
      <li>
        <strong>Python</strong> - One of my most comfortable languages. I've used Python in
        school for years, I've done AI/ML projects, and I've worked in large
        production Python codebases at both Wayfair and Pubmark.
      </li>
      <li>
        <strong>Java (Spring Boot)</strong> - Java is frankly a language that I would prefer not
        to work with but know very well. Worked with backend micro-services
        setup with Spring Boot at Wayfair. If I work in a Java project again I
        would highly prefer to write Kotlin instead.
      </li>
      <li>
        <strong>TypeScript</strong> - JavaScript was my first programming language, and for a
        long time was my most comfortable programming language. TypeScript just
        takes JS and makes it so much harder to shoot yourself in the foot, and
        so much easier to tell what's happening.
      </li>
      <li>
        <strong>Rust</strong> - Rust is currently my favorite language, but also one that I've
        picked up only recently. I took a course that let you choose your
        language, and I chose Rust. It was very enjoyable to work in. I also
        interviewed in Rust for my co-op at Pubmark!
      </li>
      <li>
        <strong>HTML/CSS, Svelte, and React</strong> - I'm grouping these together because, yeah.
        I prefer Svelte to React. And I actually enjoy writing custom CSS
        (sometimes). I know both class-based react and functional react. Both
        Pubmark and Wayfair had React-based frontends.
      </li>
      <li>
        <strong>SQL</strong> - Learned MySQL originally, since then, I've used Google Big Query
        and Microsoft SQL server at Wayfair. I worked with some 100+ line GBQ
        queries somewhat regularly at Wayfair. I've used Snowflake at Pubmark.
      </li>
      <li>
        <strong>Docker and K8s</strong> - My experience here is, admittedly, limited. I worked
        with Docker and Kubernetes at Wayfair. The team I was one maintained
        multiple micro-services distributed using Docker/K8s.
      </li>
      <li>
        <strong>Vim</strong> - I've used vim keybinds since late 2017, and I'm now daily driving
        NeoVim. I've found that I can work much faster in vim than even VS Code
        with the vim extension.
      </li>
      <li>
        <strong>Nix</strong> - This is so much better than Docker (for dev environments) that I
        was actually shocked by it. We used Nix at Pubmark, and I think this was
        unanimously liked by everyone. I was told how good it was before I was
        even hired there.
      </li>
    </ul>

    <div class="subtitle">Interests</div>
    I've got a couple interests listed on my resume. So I'll just run through those
    in order, and elaborate a little bit.

    <ul>
      <li>
        <strong>Keyboards</strong> - Long story short, I use a split keyboard with 36 keys on it.
        Each hand gets a column-staggered 3x5 grid + 3 thumb keys. A lot of
        people are surprised that I can actually work on a keyboard this small,
        and I'm surprised that I was ever able to work for long periods of time
        on a laptop keyboard.
      </li>
      <li>
        <strong>Neovim</strong> - (Even though this is a software, I'm also interested in it) I
        picked up Neovim during the summer after my Wayfair co-op. I've used Vim
        bindings since high school, but I always just used the VS Code
        extension. After some heavy configuration, I could never go back to VS
        Code. NeoVim is fast, it's lightweight, and incredibly powerful. As a
        bonus, the core of how I edit (vim) is present on every server by
        default.
      </li>
      <li><strong>Gaming</strong> - I mainly play Rocket League these days.</li>
      <li>
        <strong>Hockey</strong> - I played in high school and I still enjoy watching and skating
        whenever I can.
      </li>
      <li>
        <strong>Artificial Intelligence</strong> - Honestly, as time goes on this is less
        something that I'm interested in and more something I'm paying attention
        to because it's both awe-inspiring and terrifying.
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
    already used React, but I liked this much better. In my opinion, Svelte
    components are cleaner and make more sense than React components.

    <br /> <br />

    More technical stuff about the site, it's just a front end, I wanted to be
    able to host it for free. I'm only using the Svelte framework with
    <a href="https://routify.dev" target="_blank" rel="noopener noreferrer"
      >Routify</a
    >
    for page routing. No additional external JS, no external CSS. I should note,
    that I am making use of some of Svelte's built in animation functionality for
    the text carousel. But everything else was written by me.

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
    AP Calc BC, AP Stat (statistics was 'stat' at my high school the same way mathematics
    was 'math'), and AP Physics C.

    <br /> <br />

    You can read more about the projects that I did in my time in high school on
    the <a href={$url("/projects")}> projects page.</a>

    <div class="subtitle">Education&mdash;College</div>
    I'm currently attending Northeastern University in Boston. I'm a Computer Science
    major, graduating in 2024. Northeastern has a very 'focused' curriculum. That
    is to say, I take a lot of CS and CS adjacent courses, and not very many extra
    courses. Don't get me wrong, I have my share of history and writing, but the
    majority of my coursework is in the CS field. That's one of the reasons that
    I really like this school.

    <br /> <br />

    Additionally, this school has a co-op program, so the second semesters of my
    second and third years, I don't have classes and I just work a full time job
    in the CS field instead. I've already taken two co-ops! You can read more
    about how they went on the <a href={$url("/work")}> work page.</a>
  </div>
</div>
