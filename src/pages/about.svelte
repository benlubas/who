<script lang="ts">
  import PageTitle from "../components/PageTitle.svelte";
  import { url } from "@sveltech/routify";
</script>

<div class="page-cont">
  <div>
    <PageTitle title="About" />

    <div class="text">
      Hi, I'm Ben Lubas! I'm currently a student at Northeastern University
      studying computer science. Firstly, welcome to my website! I hope you
      enjoyed the homepage, I had a ton of fun making it. I'm going to split
      this about page into catagories, so feel free to skip over the parts that
      you don't care about. First up...
      <div class="subtitle">Programming Experience</div>
      Woo, can you tell I'm writing this for employers? I got my start in comuper
      science in high school, where I took two into to web dev courses, APCS A and
      APCS Princlples (which was a capstone course at my school). In them, I learned
      HTML, CSS, JavaScript, PHP, and SQL. I went on to take an independant study
      in computer scient titled Advanced Web Dev. Durring that class time I taught
      myself React, Node/Express, and ModgoDB and created another website for the
      school.
      <br />
      <br />
      As a side note, my senior year I also took a Math Python course that explored
      basic mathematical modeling in Python, so I learned Python.
      <br />
      <br />
      The next summer I learned about Svelte, and decided that I'd like to know how
      that works. I made a small practice site and followed the tutorial, and I remade
      parts of an older React project.
      <br />
      <br />
      Then I went off to college, learned a functional language called Racket that's
      only used to teaching. After that mode of the course work has been in Java.
      In the Fall 2021 semester, I'm taking courses that start to use C, and a few
      courses have sprinkled in some Python here or there.

      <br />
      <br />
      Of note, throughout highschool I was learning some Git, and I stored my entire
      senior year project on GitHub (in a private repo). This helped me learn terminal
      commands, and I'm learning even more of those this semester. I'm also a Vim
      user, I have the Vim extension configured on every editor that allows it.

      <div class="subtitle">This Website and Svelte</div>
      This site is built with Svelte, Svelte is basically a web framwork like React
      as far as writing components goes. The difference is in what happens next.
      Basically, Svelte just compiles what you write to optimized HTML, CSS, and
      JS. If you'd like to learn more, I'll link their
      <a href="https://www.svelte.dev"> site</a> and you can look around.
      <br />
      <br />
      I ran into Svelte when v3.0 was launched, and started to learn it. I had already
      used React, but I liked this much better. There's something about the way Svelte
      components are written, they make more sense, they're cleaner. I also like
      that it's not backed by Facebook.

      <div class="subtitle">Education&mdash;High School</div>
      I graduated from high school in 2020; I was around the top of my class. I had
      a 4.958 weighted GPA, took a bunch of AP classes, and was the assitant captain
      of the Varsity Ice Hockey team. As a freshman I took two intoductory CS courses,
      CS1 & CS2. These introduced HTML, CSS, and JavaScript. Next year I took APCS
      A. The year after I took APCS Principles (our capstone course), along side
      AP Chem. Senior year I did an independant study in web development, AP Calc
      BC, AP Stat, and AP Physics C.
      <br />
      <br />
      You can read more about the projects that I did in my time in high school on
      the <a href={$url("/projects")}> projects page.</a>

      <div class="subtitle">Education&mdash;College</div>
      I'm currently attending Northeastern University in Boston. I'm a CS major,
      graduating in 2024 (assuming that nothing crazy happens). I'm not planning
      on getting a Masters&mdash;I don't see it as being very valuable, or cost effective
      at this time. Northeastern has a very 'focused' curriculum. That is to say,
      I take a lot of CS and CS adjacent courses, and not very many extra courses.
      Don't get me wrong, I have my share of history and writting, but the majority
      of my coursework is in the CS field. That's one of the reasons that I really
      like this school.

      <br />
      <br />
      In addition to that, I have the co-op experience coming up (this is the reason
      that I'm making this website in the first place!). I'm really excited to go
      on co-op, I'm also a little nervous for interviews, but I'll get through it.
      I'm extreamely gratefull that Northeastern has the co-op program.

      <br />
      <br />
      If you want to read about my course work at Northeastern,
      <a href={$url("/courses")}> click here.</a>
    </div>
  </div>
</div>