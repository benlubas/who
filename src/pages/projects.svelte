<script lang="ts">
  import PageTitle from "../components/PageTitle.svelte";
</script>

<div class="page-cont">
  <div class="text">
    <PageTitle title="Projects" />
    I plan to go into more depth on this page about each of my projects. They're
    listed in reverse chronological order. In the future this page might become many,
    but for now it will just be a scrolling archive of projects I've worked on.
    <div class="subtitle">Diving Sheets (Svelte)</div>
    This one is my most recent project, and it's much smaller than the other projects
    on this page. I decided to make this thing one weekend and had a working prototype
    in like three days. Fixed some bugs and it was 'done' in a week or two. That
    being said, out of all the things I've made, this is probably the thing that
    has gotten the most use, and has certainly saved the most time.

    <br /><br />

    To understand the project, I need to explain a little bit about diving. Not
    scuba diving, but diving board diving (like at the Olympics). I coached
    diving at my local pool over the summer (2021). For each dive meet, teams
    must submit a dive sheet for each diver that lists their dives, along with
    some other information. Most teams will just fill these out by hand, as it's
    not that much work for ten divers. But when you have upwards of 40 divers
    competing in one meet, you can see how even two minutes per sheet can
    quickly add up.

    <br /><br />

    I didn't have any interest in writing these out by hand, and neither did any
    of the other coaches. We already maintained a spreadsheet of our divers and
    the dives they competed, so I figured that I could use that to generate the
    sheets automatically.

    <br /><br />

    I knew of a few different ways to generate PDFs files, but because of my
    background in web development, I was most comfortable with the Chrome
    browser's ctrl + p -> 'save as PDF'. So I went about writing the HTML/CSS
    required to generate a dive sheet. I chose to use Svelte for the easy code
    reuse, and because I knew this would be a small project. Something like
    React would have added an unnecessary amount of overhead.

    <br /><br />

    The technical challenge of this project was almost entirely getting HTML and
    CSS to generate something identical to something you would create in MS
    Word. It certainly developed my CSS skills further.

    <br /><br />

    This project also gave me a little more familiarity with CSS media rules and
    the differences between browsers. Some of the things that I took for granted
    would work in Chrome, just do not work or display in the same way on
    Firefox. Luckily, I didn't have to deal with this for such a small project,
    I knew that the end users (myself and the other coaches) all used Chromium
    based browsers.

    <br /><br />

    I'm now more aware that modern browsers are not equal. The project is also
    the reason that the floating shape effect still 'works' on Firefox (I had to
    go out of my way to make the squares show up).

    <br /><br />

    This project also gave me great satisfaction; I was able to use it myself,
    and I was able to watch others I was close to use it to save inordinate
    amounts of time. And it only took me a week to make the thing!

    <!-- PW POLL SITE -->
    <div class="subtitle">PW Poll (MERN stack)</div>
    My senior year, I took an independent study called Advanced Web Dev. The curriculum
    required that I build a website that filled a need in the school. I chose to
    build the site with React, Node and MongoDB&mdash;three technologies that I had
    never used before.

    <br /><br />

    I wanted to use this class as a learning opportunity. I taught myself how
    the MERN stack worked over the summer and put that knowledge to use in the
    class. I also chose to write all of the CSS for this site from scratch. This
    is something that I'm really glad I did. It forced me to really learn CSS.
    Previously, we had used Bootstrap for almost everything, so I didn't truly
    understand how CSS positions or z-index or box-sizing worked.

    <br /><br />

    My CSS experience with the Polling Project has been instrumental in every
    website that I've worked on since.
    <br /><br />
    In addition to that, I got to learn about document databases through my use of
    MongoDB. Previously, I had only ever used SQL, so this was a breath of fresh
    air. I found Mongo really intuitive and easy to pick up. That being said, I don't
    have a strong preference for one over the other.

    <br /><br />

    Then there is NodeJS. Node is really cool in that it lets you write a
    backend in the same language you write your front end in. But I really see
    no real need for this, and I kind of wish I had written a Java or C++
    backend instead. I did enjoy the conveniences of working with a full JS
    project, but at the same time, I was working with a full JS project.
    Debugging was a nightmare sometimes.

    <br /><br />

    Looking back on this project, it definitely had the largest impact on the
    way that I work on web based projects. I now almost exclusively use front
    end frameworks instead of vanilla JS, and my interest in frameworks lead me
    to start using TypeScript. I still like to write my own styles for websites
    that I work on, and I actually enjoy writing CSS now (for the most part).

    <!-- DISNEY TRIP SITE  -->
    <div class="subtitle">Disney Trip Website (PHP)</div>
    I worked on this project in my junior year of high school. My school's capstone
    course curriculum consisted mostly of creating a website for the school. First,
    we had to find someone in the school that needed a website for "school" purposes.
    We had a few options: a guidance appointment scheduling system; a polling site
    for senior superlatives (most likely to xyz); or a site to help organize and
    deliver information about the senior trip to Disney World.
    <br /><br />
    I hope it is obvious why we chose the last one.
    <br /><br />
    After deciding on our project, we interviewed people who were involved in the
    Disney trip to understand the scope of the task we were taking on. This interview
    process allowed us to understand more about our end users, so that we could make
    a site that was more suited to them.
    <br />
    <br />
    The next part of our task was design, for this, the class split into two groups,
    and offered two competing designs. The better of the two was chosen and we moved
    on to fleshing out the site's functionality which involved student permission
    and medical information forms, student balance tracking, and a payment system
    via PayPal, and a roommate system. In addition to this, we built an analytics
    page, and a system for allowing the trip coordinators to update and view all
    of the information. All of this was kept behind a sign in screen with Google's
    oAuth API. While this list isn't exhaustive, I think it accurately covers the
    bulk of the work that we did.
    <br />
    <br />
    Once the site functionality was built out, we spent a few weeks testing and tweaking
    before delivering our final presentation to the trip coordinators, and school
    administrative staff.
    <br /><br />
    The next year, my class got to make use of the site. It seemed to be going great,
    until COVID hit, and our trip got canceled...
    <br /><br />
    Trip or not, I walked away with a ton of close to "real world" experience. Working
    in a large group environment and managing work between multiple people is something
    that you just need to learn by doing, and this project allowed me to do that
    and more.
  </div>
</div>

<style>
</style>
