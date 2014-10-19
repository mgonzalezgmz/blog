---
layout: post-light-feature
title: "Stars, exoplanets and data"
permalink: exoplanets-hackathon-cccb
image: 
        feature: exoplanets.jpg
---
Last week a bunch of astronomy aficionados and data geeks gathered at [Estació Beta](http://bigbangdata.cccb.org/en/sec-beta-station/), in order to participate in an hackathon organized by the CCCB.

[The projects](http://astro.hackdash.org/) ranged from the development of a Wiimote interface for [Stellarium](http://stellarium.org), an open source planetarium software, to AstroRift, an Oculus Rift-powered visualization of celestial bodies.

I had to leave early, but in the meantime I did a little viz with the help of the [The Extrasolar Planets Encyclopaedia](http://exoplanet.eu/). This is the number of exoplanets discovered in the past decades. 2014 has been a good year, and the grow seems exponential.

<div class='chart'>
<div id='chart'></div>

<!-- Load c3.css -->
<link href="{{ site.url }}/assets/css/c3.css" rel="stylesheet" type="text/css">

<!-- Load d3.js and c3.js -->
<script src="{{ site.url }}/assets/js/d3.min.js" charset="utf-8"></script>
<script src="{{ site.url }}/assets/js/c3.min.js"></script>
<script src="https://dl.dropboxusercontent.com/u/55065502/spline.js" type="text/javascript"></script>