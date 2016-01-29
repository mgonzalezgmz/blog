---
layout: project
title:  "Local & Regional Spain Election Results"
date:   2015-05-24 13:43:21
client: <a href="http://www.elespanol.com">EL ESPAÑOL</a>
permalink: local-regional-elections
---
<div class="row">
    <div class="six columns m-b-2">
        <p>While <a href="https://twitter.com/lukas_appelhans">Lukas Appelhans</a> and I were sharing a flat on Barcelona, we started to think on projects we could do together. As the elections approached, it seemed handy to create a good map to visualize the results.</p>
        <p>We started working on a <a href="http://kairoshacks2015.devpost.com/">hackathon</a> to get a prototype. Afterwards, we were able to get <a href="http://www.elespanol.com">EL ESPAÑOL</a> onboard for the Spanish local and regional election.</p>
        <h4 class="projectHeadline m-t-2">Local elections</h4>
        <p>The map is created with SVG and D3, getting the results from a C++ parser of the government data.</p>
        <p>I was involved in the overall design, writing a series of bash scripts that smashed the country shapefiles together. The result: a (very) simplified TopoJSON with more than 8.000 cities.</p>
        <h4 class="projectHeadline m-t-2">Regional election</h4>
        <p>For the regional election we had to create a different layout. We opted for a long scroll with a fixed header, which allowed us to have full width maps. Each region (15 on this election) had a different website to get the data, with a separate login. It was a total mess.</p>
        <hr />
        <p>In the end the app got 150.000 visits and was praised by data visualization experts as <a href="https://twitter.com/albertocairo/status/602863572373217280?lang=en">Alberto Cairo</a>. It got traction on the <a href="https://news.ycombinator.com/item?id=9599266">Hacker News</a> frontpage and <a href="http://inconsolata.com/post/119861096487/colores24m">specialized blogs</a>.</p>
        <p class="u-italic">Tools: D3.js, GDAL, TopoJSON, Bash scripting, jQuery, Bootstrap and SASS.</p>
        <p class="u-italic">With <a href="https://twitter.com/lukas_appelhans">Lukas Appelhans</a>.</p>
        <a class="button btn-primary" href="http://resultados24m.elespanol.com/app/">Go to the interactive</a>
    </div>
    <div class="six columns">
        <img class="img-responsive" data-src="/images/projects/elvis_7.png" />
        <img class="img-responsive" data-src="/images/projects/elvis_6.png" />
    </div>
</div>
<div class="row">
    <img class="img-responsive" data-src="/images/projects/elvis_2.png" />
    <img class="img-responsive" data-src="/images/projects/elvis_3.png" />
    <img class="img-responsive" data-src="/images/projects/elvis_5.png" />
    <img class="img-responsive" data-src="/images/projects/elvis_4.png" />
</div>
