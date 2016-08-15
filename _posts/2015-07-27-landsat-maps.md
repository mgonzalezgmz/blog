---
layout: project
category: project
title:  "Satellite Imagery Processing"
date:   2015-07-27 13:43:21
permalink: landsat-maps
---
<div class="row">
    <div class="six columns">
        <p>Being quite interested in cartography and spatial analysis, I started to tinker with Landsat imagery. After learning a bit about <a href="https://www.mapbox.com/blog/putting-landsat-8-bands-to-work/">bands</a> we even started to integrate custom satellite processing <a href="http://www.elespanol.com/enfoques/20151006/69493080_0.html">in our reporting</a>.</p>
        <p>To generate these natural color images I had to apply panchromatic sharpening and curve adjustments with Photoshop.</p>
        <p class="u-italic">Tools: Photoshop, GDAL, Landsat-util.</p>
    </div>
    <div class="zoom js-zoom-1 six columns m-b-4">
        <img class="img-responsive b-lazy articleImg"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/landsat_1.jpg" />
    </div>
</div>
<div class="row">
    <span class="zoom zoom-container js-zoom-2 m-b-4">
        <img class="img-responsive b-lazy articleImg"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/landsat_2.jpg" />
    </span>
    <span class="zoom zoom-container js-zoom-3 m-b-4">
        <img class="img-responsive b-lazy articleImg"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/projects/landsat_3.jpg" />
    </span>
</div>

<!-- without these script tags here jquery refuses to work lol -->
<script src="/js/vendor.js"></script>
<script src="/js/jquery.zoom.min.js"></script>

<script>
// callin' the zoom plugin
$('.js-zoom-1').zoom({url: '/images/projects/landsat_1_big.jpg'});
$('.js-zoom-2').zoom({url: '/images/projects/landsat_2_big.jpg'});
$('.js-zoom-3').zoom({url: '/images/projects/landsat_3_big.jpg'});
</script>
