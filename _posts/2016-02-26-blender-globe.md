---
layout: project
title: "Rendering the Earth with Blender"
date: 2016-02-26 13:43:21
permalink: blender-globe
---
<!-- Article styles -->
<style>
    body {
        background-color: rgb(0,0,0);
        color: rgb(230, 230, 230);
    }
    a {
        color: rgb(230, 230, 230);
    }
    p > a:hover,
    .copy a:hover {
        color: rgb(230, 230, 230);
        background-color: transparent;
    }
    .siteTitle--link,
    .siteTitle--link:hover {
        color: rgb(230, 230, 230);
    }
    .articleHeadline,
    .articleMeta {
        text-align: center;
    }
    .p-centered {
        margin: 0 auto;
        max-width: 500px;
        margin-bottom: 1.3rem;
    }
    .footer {
        border-top: 1px solid rgba(255, 255, 255, 0.2)
    }
</style>

<div class="row m-t-2">
    <div class="twelve columns projectIntro">
        <img class="img-responsive" data-src="/images/projects/blender_1.png" />
    </div>
</div>

<div class="row center-block">
    <div class="twelve columns m-b-2 ">
        <h4 class="projectHeadline m-t-2">Hello, world</h4>
        <p class="p-centered balance-text">Beautiful, isn't it? This is a 3D model of our planet, using NASA imagery.</p>
        <img class="img-responsive m-b-2" data-src="/images/projects/blender_2.png" />
        <p class="p-centered balance-text">I have started to think about Blender after testing <a href="https://en.wikipedia.org/wiki/Orthographic_projection">orthographic projections</a> on QGIS. They are complicated to setup, requiring Python scripting and long steps every time you rotate or tilt the globe.</p>
        <img class="img-responsive m-t-3 m-b-3" data-src="/images/projects/blender_4.png" />
        <p class="p-centered balance-text m-b-0"><a href="http://www.blenderguru.com/tutorials/create-a-realistic-earth/">Doing this</a> with Blender is easy: move or rotate the camera and then render the result!</p>
    </div>
</div>
