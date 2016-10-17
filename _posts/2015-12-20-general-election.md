---
layout: project
category: project
title:  "Spain General Election"
client: <a href="http://www.elespanol.com">EL ESPAÑOL</a>
date:   2015-12-20 13:43:21
permalink: general-election
---
<div class="row">
    <div class="seven columns projectIntro">
        <p>I was the main lead of the General Election graphics coverage. It integrated the live results, <a href="http://datos.elespanol.com/elecciones-generales/pactos/">two</a> <a href="http://datos.elespanol.com/elecciones-generales/2015-20D/resultados/analisis">analysis</a> and a <a href="http://datos.elespanol.com/elecciones-generales/la-cocina-20d">prediction</a>.</p>
        <p class="u-italic">Tools: Bash scripting, GDAL, TopoJSON, Mapshaper, QGIS and Bootstrap. With <a href="https://twitter.com/lukas_appelhans">Lukas Appelhans</a>.</p>
        <a class="button btn-primary" href="http://datos.elespanol.com/elecciones-generales/2015-20D/resultados/congreso/">Go to the interactive</a>
    </div>
</div>

<div class="row">
    <div class="six columns m-b-2">
        <h4 class="projectHeadline m-t-2">Election map</h4>
        <p>This app, the result of a month’s worth of work, it’s an iteration of the <a href="/local-regional-elections">previous</a> <a href="/catalan-election">election</a> visualizations I did with <a href="https://twitter.com/lukas_appelhans">Lukas Appelhans</a>.</p>

        <p>My job was to generate the map, design the piece and create a solid layout. I had to write a lot of Bash scripts and play with the simplification to create an efficient TopoJSON. The file contains 52 provinces and more than 8.000 cities, which were matched with a <a href="https://github.com/google/protobuf">Protobuf</a> generated in real time with the results.</p>

        <p>I also added the adjacent frontiers. This created a familiar shape of the country. The map also features city labels and roads (which were <a href="https://blog.newsapps.io/cleaning-openstreetmap-roads-with-qgis-and-grass-c4a628452037">cleaned with GRASS</a>).</p>

        <p>It was featured on <a href="http://www.theguardian.com/world/live/2015/dec/20/spain-election-results-live-updates-podemos-ciudadanos?page=with:block-56770b52e4b0c713d00aaeec#block-56770b52e4b0c713d00aaeec">The Guardian</a> live election blog.</p>
    </div>
    <div class="six columns">
        <img class="img-responsive b-lazy m-b-1"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/touchdown_1.png" />
    </div>
</div>

<img class="img-responsive b-lazy m-b-1"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/touchdown_3.png" />
<img class="img-responsive b-lazy m-b-1"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/touchdown_4.png" />
<img class="img-responsive b-lazy m-b-1"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/touchdown_5.png" />

<div class="row">
    <div class="six columns m-b-2">
        <h4 class="projectHeadline m-t-4">The analysis</h4>
        <p>Using the <a href="/interactive-boilerplate">interactive boilerplate</a>, I designed and developed the layout for the special page we ran the day after the elections.</p>

        <p>We prepared a visual piece with dozens of graphics and pictures, explaining the outcome for every major party. It was published the next day in the morning.</p>
        <p>It was a long night.</p>

        <p class="u-italic">Tools: Bootstrap and SASS.</p>
        <a class="button btn-primary" href="http://datos.elespanol.com/elecciones-generales/2015-20D/resultados/analisis/">Go to the piece</a>
    </div>
    <div class="six columns">
        <img class="img-responsive b-lazy m-b-1"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/touchdown_2.png" />
    </div>
</div>

<img class="img-responsive img-shadow b-lazy m-b-1"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/touchdown_6.png" />
