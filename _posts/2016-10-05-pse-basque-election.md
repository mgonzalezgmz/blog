---
layout: project
category: project
title:  "Where did the Basque Socialists lost 40% of the vote?"
date:   2016-10-05
permalink: pse-basque-election
---
<div class="row">
    <div class="eight columns projectIntro mb1">
        <p>Before the latest <a href="https://en.wikipedia.org/wiki/Basque_parliamentary_election,_2016">Basque parliamentary election</a> took place I started working in an explainer. After seeing the election unfold the story was much clearer: the Socialist Party lost 40% of the vote. So we decided to focus on them.</p>
        <p class="u-italic">Tools: D3.js, R. With <a href="https://twitter.com/jorgegalindo">Jorge Galindo</a>.</p>
        <a class="button btn-primary" href="https://politibot.es/interactivo/caida-pse-pais-vasco-25s/">Go to the interactive</a>
    </div>
</div>

<div class="row m-b-4">
    <div class="twelve columns">
        <img class="img-responsive img-shadow b-lazy m-t-2"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/pse_2.png" />
        <small>Socialist loss between 2016 and 2009 in each city. Note the log scale in the <i>y</i> axis.</small>
    </div>
</div>


<div class="row">
    <div class="five columns m-b-2">
        <h4 class="projectHeadline">The bar chart</h4>
        <p>After sketching several charts in ggplot I settled down on a map, a scatterplot and a bar chart. I tried to simplify the bar chart axes as much as I could, thinking about small things as the vertical lines that go along the chart. I also an arrow to mark the difference between losing and winning votes.</p>

        <p>Another small detail that I like is the city label color. When the bars have a dark fill it’s white, but it switches to black when the background is lighter.</p>
    </div>
    <div class="seven columns">
        <img class="img-responsive img-shadow b-lazy m-t-1"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/pse_3.png" />
        <small>First sketch of the bar chart in ggplot.</small>
    </div>
</div>

<div class="row m-b-4">
    <div class="twelve columns">
        <img class="img-responsive img-shadow b-lazy m-t-2"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/pse_4.png" />
        <small>Final design.</small>
    </div>
</div>

<div class="row m-t-2">
    <div class="seven columns m-b-2">
        <h4 class="projectHeadline">Scatterplot</h4>
        <p>The scatterplot was more complicated. First, I used a log scale to dissipate differences between city sizes. Then I implemented a <a href="https://en.wikipedia.org/wiki/Voronoi_diagram">voronoi diagram</a> to make the tooltip seamless. While a normal voronoi would trigger the tooltip at any distance from the nearest circle, I used a <a href="https://github.com/Kcnarf/d3-distanceLimitedVoronoi">limited distance voronoi</a>, which only triggers a mouse event when the user hovers near a circle.</p>
    </div>
</div>

<div class="row">
    <div class="twelve columns">
        <img class="img-responsive img-shadow b-lazy"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/pse_5.png" />
        <small>First sketch with ggplot.</small>
    </div>
</div>

<div class="row m-t-2">
    <div class="seven columns m-b-2">
        <p>I made other small decisions. There are some dots that suffer from occlusion. To be able to distinguish them while hovering I drew the border of the selected circle again.</p>
        <img class="img-responsive img-shadow b-lazy"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/pse_6.png" />

        <h4 class="projectHeadline m-t-4">The map</h4>
        <p>The map opens the piece and it’s crucial to understand the spatial angle of the story: the socialists lost most of the vote in the cities with more population.</p>
    </div>
</div>

<div class="row">
    <div class="twelve columns">
        <img class="img-responsive img-shadow b-lazy"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/pse_1.png" />
    </div>
</div>
