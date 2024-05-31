<script lang="ts">
  import PageTitle from "../components/PageTitle.svelte";
  import Note from "../components/note.svelte";
</script>

<div class="page-cont">
  <div class="text">
    <PageTitle title="Projects" />
    <Note>
      I don't really update this page. Please visit
      <a href="https://github.com/benlubas">my github</a>
      page if you're interested in checking out my current work.
    </Note>
    <br />

    Here, I go into more depth about each of my projects. They're listed in
    reverse chronological order. In the future this page might become many, but
    for now it will just be a scrolling archive of projects I've worked on.

    <div class="subtitle">Diving Sheets (Svelte)</div>
    This one is my most recent project, and it's much smaller than the other projects
    on this page. I decided to make this thing one weekend and had a working prototype
    in like three days. Fixed some bugs and it was 'done' in a week or two. That
    being said, out of all the things I've made, this is probably the thing that
    has gotten the most use, and has certainly saved the most time.

    <br /><br />

    To understand the project, I need to explain a little bit about diving. Not
    scuba diving, but diving board diving (like you see at the Olympics). I
    coached diving at my local swim club over the summer of 2021. For each dive
    meet, teams must submit a dive sheet for each diver. The sheet lists each
    dive, along with some other information about the dive. Most teams will just
    fill these out by hand, as it's not that much work for ten divers. But when
    you have upwards of 40 divers competing in one meet, you can see how even
    two minutes per sheet can quickly add up.

    <br /><br />

    I didn't have any interest in writing these out by hand, and neither did any
    of the other coaches. We already maintained a spreadsheet of our divers and
    the dives they competed, so I figured I could use that to generate the
    sheets automatically.

    <br /><br />

    I knew of a few different ways to generate PDF files, but because of my
    background in web development, I was most comfortable with the Chrome
    browser's <code>ctrl + p -&gt; 'save as PDF'</code>. So I went about writing
    the HTML/CSS required to generate a dive sheet. I chose to use Svelte for
    the easy code reuse, and because I knew this would be a small project.
    Something like React would have added an unnecessary amount of overhead.

    <br /><br />

    The 'technical' challenge of this project was almost entirely getting HTML
    and CSS to generate something identical to something you would create in MS
    Word. It was a very fun CSS challenge.

    <br /><br />

    This project also gave me a little more familiarity with CSS media rules and
    the differences between browsers. Some of the things that I took for granted
    would work in Chrome, just do not work or display in the same way on
    Firefox. Luckily, I didn't have to deal with this for such a small project,
    I knew that the end users (myself and the other coaches) all used Chromium
    based browsers.

    <br /><br />

    This project was immensely satisfying; I was able to use it myself, and I
    got to share it with the other coaches!
  </div>
</div>

<style>
</style>
