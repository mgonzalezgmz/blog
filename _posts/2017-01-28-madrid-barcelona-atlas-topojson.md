---
layout: post
title: "Madrid and Barcelona TopoJSON"
date: 2017-01-28
permalink: madrid-barcelona-atlas-topojson
categories: notes
image: /images/posts/madrid-barcelona-atlas/madrid_barcelona.png
---
Following [es-atlas](/es-atlas-spain-topojson), it made sense to create some scripts to convert the vector data from Madrid and Barcelona.

These [two](https://github.com/martgnz/madrid-atlas) [projects](https://github.com/martgnz/barcelona-atlas) provide all the basic administrative divisions of Madrid and Barcelona in just one [TopoJSON](https://github.com/topojson/topojson), ready to use with D3 and your data. Census tracts, neighborhoods, districts, no problem!

<a href="https://github.com/martgnz/madrid-atlas"><img class="img-responsive b-lazy m-t-2"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://cloud.githubusercontent.com/assets/1236790/22272536/f742bd7a-e29a-11e6-8dd8-5f618b82acc5.png" /></a>

---

<a href="https://github.com/martgnz/barcelona-atlas"><img class="img-responsive b-lazy m-t-2"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://cloud.githubusercontent.com/assets/1236790/22386529/ca66b7ae-e4d7-11e6-942b-19f83226bccc.png" /></a>

The source shapefiles are already projected, so I ended up using [d3.geoProject](https://github.com/d3/d3-geo-projection#geoproject) and [d3.geoIdentity](https://github.com/d3/d3-geo#geoIdentity) to maintain the same projection and apply some transformations in the geometry.

In the end this means that you shouldn't specify a projection while making the map. The calculations are already done and the rendering is faster. 

#### Getting started
Download the zip or clone the [Madrid](https://github.com/martgnz/madrid-atlas) or the [Barcelona](https://github.com/martgnz/barcelona-atlas) repo, go to the folder with your terminal and run `npm install`. The script will start downloading the files and converting them. In the end you'll find the output in the `madrid` or `barcelona` folder, respectively.

I am also maintaining two URLs with the files:

- [https://martingonzalez.net/madrid-tracts.v1.json](https://martingonzalez.net/madrid-tracts.v1.json)
- [https://martingonzalez.net/barcelona-tracts.v1.json](https://martingonzalez.net/barcelona-tracts.v1.json)

---

#### ¿Open data? Not in Barcelona
The Barcelona City Council has a platform that hosts all the geographic data of the city, [CartoBCN](http://w20.bcn.cat/cartobcn/). This shouldn't be a problem if they provided public URLs, of at least the basic administrative divisions. Instead, they only let you download the datasets after registering in a marketplace-like interface.

This is hostile and disallows automatic retrieval of the data. In places like [Madrid](https://github.com/martgnz/madrid-atlas/blob/master/prepublish#L9), [Spain](https://github.com/martgnz/es-atlas/blob/master/prepublish#L12), or the [US](https://github.com/topojson/us-atlas/blob/master/prepublish#L7), the administration serves this information in the open.

To circumvent this, I had to create a [public mirror](https://github.com/martgnz/bcn-shp-zip) of the data.

I already contacted them, but I haven't gotten any response yet.

---

*Thanks to [Luis Sevillano](https://github.com/luissevillano) for helping with the Madrid script.*
