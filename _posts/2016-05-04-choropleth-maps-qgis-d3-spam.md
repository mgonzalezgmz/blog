---
layout: vis
title: "Choropleth maps with QGIS, D3 and Spam"
date: 2016-05-04
permalink: choropleth-maps-qgis-d3-spam
categories: notes
image: /images/posts/choropleth/map.png
---
See this map? It represents the [rate of people with university studies](http://www.bcn.cat/estadistica/castella/dades/tpob/pad/padro/a2015/nivi/nivi11.htm) across the census areas of Barcelona. It's striking to see how well educated areas in the center and the northwest (like L'Eixample or Sarrià) [are rich](http://bl.ocks.org/martgnz/c6ef23788c61fac40b44817d1bf19870), while poor neighbourhoods of Nou Barris and La Mina have much lower values.

---

Now, let's get to work.

Here I'm going to explain my choropleth map workflow, from start to finish. These kind of maps are one of the most popular data visualization techniques, they are everywhere. If you have ever wondered how to make one, this is your tutorial.

I'm going to use [D3](https://d3js.org) and [Spam](https://github.com/newsappsio/spam), a library to create maps with Canvas. You'll also need a working installation of [QGIS](http://www.qgis.org/en/site/) to work with the geodata.

At the end you'll be able to create a choropleth map, the one of the beginning of the article. Everything that I'll explain is applied to that dataset but you can understand the principles and apply it to your own data.

<h3 id="data" class="postLead"><a href="#data" class="idLink">#</a> Getting the data</h3>

To find this dataset I had to look on the [website](http://www.bcn.cat/estadistica/angles/index.htm) of the local statistics department. If you live in a medium-sized city you should have something similar. This is the most important part: first, you should have data [that makes sense to map](http://www.ericson.net/content/2011/10/when-maps-shouldnt-be-maps/).

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/bcn-estadistica.png">
    <small>Urgh, this looks horrible.</small>
</div>

Neat! First, go to the [dataset website](http://www.bcn.cat/estadistica/castella/dades/tpob/pad/padro/a2015/nivi/nivi11.htm). You should try to find an ID that matches with your geographic data. This ID is the unique key of a row, a number that is not repeated elsewhere in the data and belongs to a certain figure. This number should correspond to a map geometry (for example, a country, a city, a district), so we can join them later and visualize the map.

In this case it seems that the `Dto.` and `SC`columns contain the unique ID that we need. A code that also appears in the official shapefiles of the city (`Dto.` is the abbreviation of district and `SC` of the census tracts).

Let's get this data in a usable form (CSV). In this case we are lucky and copying and pasting to Excel works fine. Make sure that you clear the format (Edit > Clear > Formats). This removes the formatting of the source (font, colors) and the automatic transformation that Excel sometimes applies to numbers or dates. We don't want anything weird happening in our spreadsheet.

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/excel1.png">
    <small>Much better, don't you think so?</small>
</div>

But something strange is indeed happening. In the `id` column the two identifiers are splitted by spaces. In this case I will use some find & replace, as the characters that separate them don't seem to be normal spaces (the `TRIM` function doesn't work). FYI, there are a lot of [funny Unicode spaces](https://www.cs.tut.fi/~jkorpela/chars/spaces.html).

This is not ideal, you should use [OpenRefine](http://openrefine.org/) or [R](https://www.r-project.org/) to have a reproducible workflow. But this is just a small example.

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/find-replace.gif">
    <small>After two sets of find & replace the <code>id</code> column is clean.</small>
</div>

 It seems that the same problem also exists at the end of the other columns. Replace the space with this technique and that’s it.

Now that the data is cleaned ([this is mine](https://gist.github.com/martgnz/3ecb4b9f7728d09d7cecc03e1df18e50)) save it as a CSV and you're done.

<h3 id="geodata" class="postLead"><a class="idLink" href="#geodata">#</a> Preparing the geodata</h3>

We are ready to start with the map. You can find the polygons (usually shapefiles) in the geographic agency of the government/city. If you want to make a world map or just need provinces of any country you can use [Natural Earth](http://www.naturalearthdata.com/downloads/) (cultural).

If everything fails, a Google search of `YOUR_REGION shapefile` works most of the time.

In case you're wondering, a shapefile is a set of different files which contain geographic data. You just need to know that the file with the `.shp` extension is the one we will be working with.

I have a repo, [bcn-geodata](https://github.com/martgnz/bcn-geodata/), with the shapefiles of Barcelona. [Download the zip](https://github.com/martgnz/bcn-geodata/archive/master.zip) if you're following along.

Go to the `src` folder. Locate the `BCN_Secció_Censal_ED50_SHP` files.

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/qgis.png">
</div>

Time to open QGIS. Go to the Attribute table (`Layer > Attribute Table`) and you'll see the data.

But hey, the census area code (`C_SecCens`) is not the same as in our CSV. It seems that our CSV id is splitted between the district and census area codes (`C_Distri` and `C_SecCens`).

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/excel1.png">
</div>

Look at this spreadsheet again and then at the shapefile attribute table. In the first row of the CSV the id is `11`. If we look at the shapefile, we should merge two columns to get the same number, `C_Distri` and `C_SecCens`.

How to fix that? QGIS has a very powerful tool, the Field Calculator, which runs operations with the polygon properties and can be used to merge our columns.

Open the tool (near the Attribute Table icon) and create a new field typing `C_Distri` in the expression box. Give it a meaningful name in the `Output field` box, as `id_distri` or similar. By default QGIS will transform the field to an integer, a number. You need to do the same with the `C_SecCens` column.

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/field-calculator.png">
</div>

We need to transform the columns to numbers because both contain leading zeros. If we merge them without transforming them to integers the result would be something like `01001`, while our id in the CSV for the same census area is just `11`.

After creating two new columns with each id we can merge them with the Field Calculator typing `CONCAT(id_distri, id_seccens)` in the expression box. `id_distri` and `id_seccens refer to the column names I just created, replace them with your own.

Give a name to the new column like `id`, and voilà, we are done.

Sorry, jk 😂. We need to create the column with the actual data we will use in our visualization. Our CSV only contains the number of people with studies in each census area, but we need to calculate which percentage of population they represent (in the same census area).

Remember: [A map with raw people is not correct](https://xkcd.com/1138/).

But we are lucky! This same shapefile contains the number of men and women in each area, so is just a matter of summing them with the QGIS Field Calculator to get a new column with the population.

Go inside QGIS and create a new column called `population` inserting in the expression box `HOMES + DONES`. That will sum the columns!

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/population.gif">
</div>

Now we can import the CSV into QGIS and divide the numbers to get the percentage. We could do this in Excel, or even with TopoJSON! But if you merge it inside QGIS we can play later with its built-in scale calculator and data clustering methods.

For doing that you need to go to `Layer > Add Layer` and then click on `Delimited Text Layer`. You can browse and select the CSV file here. Make sure to mark the box `No geometry` as we are only importing non-geographic data.

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/importing-CSV-qgis.png">
</div>

After doing that you will have a new layer in the main window. Right click on the map layer and open the properties. In the sidebar, select `Joins` and add a new join.

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/qgis-join.png">
</div>

This looks scary but it isn't. If you have arrived here it should be easy! Select the CSV layer in `Join layer`, `id` in the `Join field` and `id` in the `Target field`. You can also choose the fields you want to join. In this case I just want the university column. If you want to create a choropleth with different data feel free to choose another column.

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/save-shp.png">
</div>

Open the Attribute table of the map layer and heh, you will find our CSV column at the end. Unfortunately QGIS doesn't let you perform calculations with joined layers, so you'll need to save the map before. Right click on the map layer, select `Save as...` and don't touch the defaults. You can save it in the same folder with a different name, for example `bcn-studies.shp`.

Open the new map and yes, everything we need is here. But ouch, we hit another QGIS bug. The Field calculator still doesn't recognize our data. If that happens to you you can install the Table Manager plugin (`Plugins > Install Plugins` and then search for it), go to `Vector > Table Manager` and rename the conflicting column.

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/rate.png">
</div>

To calculate the percentage of people with studies, open the Field Calculator and divide the people with university studies with the population column we calculated before. It should look something like this:

{% highlight sql %} university / population {% endhighlight %}

Make sure to select a decimal number as a Output field type, and a precision of two.

After this step you can preview the resulting map. Finally! Open the map properties, go to `Style` and create a graduated view. After selecting our column and hitting `Classify`, we can explore gradients, number of classes and data clustering methods.

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/classes.gif">
    <small>The classes and the histogram view lets you visualize the different buckets of your data.</small>
</div>

This is a very cool step because it lets you tinker with colors and classes. A good choropleth map doesn't have a lot of classes (five is enough most of the time) and has a good classification. QGIS implements methods for this, as [Quantiles](http://pro.arcgis.com/en/pro-app/help/mapping/symbols-and-styles/data-classification-methods.htm#ESRI_SECTION1_1BDD383C17164B948BF546CEADDA70E9), [Jenkins](https://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization), [Equal Interval](http://www.ncgia.ucsb.edu/cctp/units/unit47/html/comp_class.html) or [Standard Deviation](http://pro.arcgis.com/en/pro-app/help/mapping/symbols-and-styles/data-classification-methods.htm#ESRI_SECTION1_39CD67FEF4D54B568814E9621591FA89). You can explore which one suits the data better.

<div class="postImgQuote m-t-2 m-b-2">
    <img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/qgis-map.png">
    <small>This one has a divergent color scale. Nice.</small>
</div>

If you just need an image you can probably stop here. QGIS lets you export the map to SVG or PNG. But we want to publish on the web, and D3 is much more powerful for that.

<h3 id="topojson" class="postLead"><a class="idLink" href="#topojson">#</a> Creating the TopoJSON</h3>

D3 supports [TopoJSON](https://github.com/mbostock/topojson), a flavour of GeoJSON which reduces the size of the maps. We will create a TopoJSON that already contains the data we want to visualize. This saves us from downloading an additional file in each client.

If you are following with the Barcelona shapefiles make sure that the `100800401.gsb` file is there as well. It's a graduated grid to improve the accuracy of the conversion.

We will convert the shapefile to GeoJSON first with `ogr2ogr`. You can install it following [this tutorial](https://www.mapbox.com/tilemill/docs/guides/gdal/). Once you're done, run the following command in the terminal to get the GeoJSON.

{% highlight bash %}
$ ogr2ogr -f "GeoJSON" \
-s_srs "+init=epsg:23031 +nadgrids=./100800401.gsb +wktext" \
-t_srs EPSG:4326 \
bcn.geojson \
bcn-studies.shp
{% endhighlight %}

Awesome! Now the final step, the TopoJSON conversion. In order to install the command line client, you need to have a working installation of [node](https://nodejs.org/en/). Then you can simply run `$ npm install -g topojson`.

Ready? Run this command in your terminal:

{% highlight bash %}
$ topojson bcn.geojson \
-o bcn.json \
--id-property=+id \
-p +rate,district=N_Distri,neighbourhood=N_Barri
{% endhighlight %}

What did we do? We first ran `ogr2ogr` because we needed to switch the [coordinate system](https://en.wikipedia.org/wiki/Geographic_coordinate_system). If you want to work with web mapping tools it needs to be set at `EPSG:4326`. Shapefiles from Natural Earth and the like are already set on this CRS, so this step is not needed.

If you work with your country's official shapefiles you'll probably have to do this step, as it's common to use the coordinate system of your area.

And yeah, trying to visualize a TopoJSON that wasn't set up previously in `EPSG:4326` will end up in weird artifacts.

Regarding the TopoJSON command line, `-o bcn.json` declares the file output, `--id-property=+id` [promotes the polygon ids](https://github.com/mbostock/topojson/wiki/Command-Line-Reference#ids) (instead of having them as simple properties in the JSON). We coerce them to a number with the `+` operator. Finally, the `-p` operator preserves our desired properties (TopoJSON deletes everything by default!).

We want to keep the rate, the name of the district and the neighbourhood. With the `=` operator we rename them to shorter, more meaningful names.

That's it! You can now preview your map with [mapshaper](http://mapshaper.org/) and we can finally move on to the rendering stage.

<h3 id="map" class="postLead"><a class="idLink" href="#map">#</a> Creating the map</h3>

Relief! This part is much easier, as it doesn't involve arcane command line tools. We just need plain HTML, CSS and JavaScript.

First, download [Spam](https://github.com/newsappsio/spam) and its deps. You should create a new folder in your computer to keep everything organised. Create a file called `index.html`and use the following structure:

<script src="https://gist.github.com/martgnz/1bcd7602a1e92c46ee04aab4ddd36037.js"></script>

To preview the files in a local server run `$ python -m SimpleHTTPServer` in same folder. Now, open your browser and visit `localhost:8000`. It works!

“But hey, you promised me a nice choropleth”. Yes, I know! We just started.

If you want to know how Spam works, you should check the [API docs](https://github.com/newsappsio/spam/wiki/API). Basically it's a wrapper on D3 and [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) mapping, dividing the rendering into several stages. This map won't be zoomable, so it's [static](https://github.com/newsappsio/spam/wiki/StaticCanvasMap). In this example I just add the TopoJSON features and then paint them inside the `paintfeature` object.

Here's a [live demo](http://bl.ocks.org/martgnz/497c69e35fd28b16b29168735bc11d6d).

This simple map only has the stroke of each feature, but it uses Canvas instead of SVG! If you have no idea about it, [you'll have to check](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) how to use it (but don’t worry it’s very easy).

---

A choropleth needs a color scale and a set of classes. Think of them as a set of ‘buckets’ which divide our data.

To create our color scale declare a variable named `color` before `d3.json`. We are going to use a [linear scale](https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear-scales) for simplicity. Every scale accepts two parameters, `domain` (the classes) and `range` (in this case the colors for each class). Now it's time to return to your QGIS and look at Style tab. You can use similar thresholds and colors for each class!

A (probably better) alternative is using [`d3.extent`](https://github.com/mbostock/d3/wiki/Arrays#d3_extent) to get the domain, and a different scale (as quantiles). [Here's an example](http://bl.ocks.org/martgnz/a61c2da0e45a108c857e).

There's a lot to learn about scales. For reference you can check the official [D3 docs](https://github.com/mbostock/d3/wiki/Quantitative-Scales). [Adam Pearce](https://twitter.com/adamrpearce) from Bloomberg Graphics and the NYTimes has a great essay on that. [You should check it out](http://roadtolarissa.com/blog/2015/01/04/coloring-maps-with-d3/)!

For choosing the final colors I use [ColorBrewer](http://colorbrewer2.org/). It's much more intuitive and you can create colorblind-friendly maps.

To finally color each polygon, write inside `paintfeature`:

{% highlight javascript %}
parameters.context.fillStyle = color(d.properties.rate)
parameters.context.fill()
{% endhighlight %}

Here's my take on this map ([live demo](http://bl.ocks.org/martgnz/1e8b46b772a94c428e78e986c05bd221)):

<script src="https://gist.github.com/martgnz/41a55aadcd04a528eec2843f2916bea5.js"></script>

<h3 id="legend" class="postLead"><a class="idLink" href="#legend">#</a> Creating a legend and a projection quirk</h3>

Last but not least, the legend.

You should definitely take care of it, as it's one of the most important parts of the map. I'm going to use [d3-legend](http://d3-legend.susielu.com/), a little library which makes very easy to create and customize your own legends with D3.

Grab d3-legend from its website and add it to your HTML. You need to configure the orientation (horizontal), formatting (percentage), the label alignment and then pass your color scale.

First, we create the SVG element which will contain the legend:

{% highlight javascript %}
d3.select("#map").append("svg")
    .attr("class", "legend")
{% endhighlight %}

Then, we can create the legend and customize it:

{% highlight javascript %}
var legend = d3.legend.color()
    .shapeHeight(10)
    .shapeWidth(50)
    .shapePadding(0)
    .labelFormat(d3.format("%"))
    .orient("horizontal")
    .labelAlign("start")
    .scale(color);
{% endhighlight %}

`.labelFormat()` is important. We didn't multiply the rate by 100 when we calculated the percentage of people with university studies, so we will pass a [d3.format](https://github.com/mbostock/d3/wiki/Formatting#numbers) to the legend that will take care of it. In this case is a percentage symbol `"%"`. You can look up all of the other options of the legend [here](http://d3-legend.susielu.com/#color).

The line that fills the legend with our own colors is the last one, `.scale()`. You can probably understand by its name that it needs the scale definition, which in our case is on the variable `color` we created previously.

In the end you'll need to call the legend with this:

{% highlight javascript %}
d3.select(".legend")
    .call(legend)
{% endhighlight %}

After creating the legend I need to do some adjustments on the map projection. Hey, look at any map of Barcelona. You'll notice that [it's not oriented to the north](https://www.google.es/search?q=barcelona+map&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjPxrb6lcHMAhUF2xoKHcqwBrEQ_AUIBygB&biw=1280&bih=702#imgrc=_). Instead, and probably to leave the [beautiful street grid](https://en.wikipedia.org/wiki/Eixample) horizontal, the city is rotated.

<div class="row m-t-2 m-b-2">
    <div class="six columns"><img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/mapa-google.png"></div>
    <div class="six columns"><img class="img-responsive b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/images/posts/choropleth/mapa-bus.jpg"></div>
</div>

Customizing the projection is very easy in Spam (the same as in D3). Just create a new property inside `StaticCanvasMap` called `projection`, and use these cool values.

{% highlight javascript %}
projection: d3.geo.mercator()
    .center([29.6, 30.47])
    .scale(250000)
    .rotate([0,0,-37.6])
{% endhighlight %}

If you use a customized projection you'll have to manually center and scale the map, so be careful! You can learn about this [here](https://github.com/mbostock/d3/wiki/Geo-Projections#standard-abstract-projection).

I'm also using a bit of css to center the element and set a fixed width and height.

{% highlight css %}
#map {
    margin: 0 auto;
    text-align: center;
}
.legend {
    height: 35px;
    width: 250px;
}
{% endhighlight %}

So that's it, we already finished. If you have any question, spotted an error, etc, just ask me on [Twitter](https://twitter.com/martgnz).

I'll post another tutorial in the following days about interactive maps. Zoom, tooltips, everything!

Here's the final code for the map at the top ([live demo](http://bl.ocks.org/martgnz/56664c7ea8efef56f93ca948ef855d06)).
<script src="https://gist.github.com/martgnz/98828050b66e0314e566282bc5362e9a.js"></script>

---
<p class="u-italic">Thanks to <a href="https://twitter.com/lukas_appelhans">Lukas Appelhans</a> for proofreading the article and suggesting a lot of improvements.</p>

<script src="/js/d3.min.js"></script>
<script src="/js/topojson.min.js"></script>
<script src="/js/rbush.min.js"></script>
<script src="/js/d3-legend.js"></script>
<script src="/js/spam.min.js"></script>

<link rel="stylesheet" href="/css/syntax.css">
<style>
.articleHeader {
    margin-bottom: 1rem;
}
#vis {
    margin: 0 auto;
    text-align: center;
}
.mapHeadline {
    font-size: 2rem;
}
.legend {
    height: 35px;
    width: 250px;
}
</style>
<script>
var mobile = 768
var ratio = 2.5
var width = document.getElementById("vis").offsetWidth

if (window.innerWidth <= mobile) {
    var height = width - 80
} else {
    var height = width - 350
}

var color = d3.scale.linear()
    .domain([0.1, 0.18, 0.26, 0.33, 0.41])
    .range(["#ca0020", "#f4a582", "#f7f7f7", "#92c5de", "#0571b0"])

d3.select("#vis")
    .append("h4")
    .attr("class", "mapHeadline m-b-1 u-italic balance-text")
    .text("People with university studies in Barcelona")

d3.select("#vis").append("svg")
    .attr("class", "legend")

var legend = d3.legend.color()
    .shapeHeight(10)
    .shapeWidth(50)
    .shapePadding(0)
    .labelFormat(d3.format("%"))
    .orient("horizontal")
    .labelAlign("start")
    .scale(color);

d3.select(".legend")
    .call(legend)

d3.json("/files/bcn.json", function(error, d) {
    topojson.presimplify(d)

    var map = new StaticCanvasMap({
        element: "#vis",
        width: width,
        height: height,
        projection: d3.geo.mercator()
            .center([29.6, 30.47])
            .scale(100 * ratio * width)
            .translate([width / 2, height / 2])
            .rotate([-0.02, 0.01, -37.6]),
        data: [{
                features: topojson.feature(d, d.objects["bcn"]),
                static: {
                    paintfeature: function(parameters, d) {
                        parameters.context.fillStyle = color(d.properties.rate)
                        parameters.context.fill()

                        parameters.context.lineWidth = 0.5 / parameters.scale
                        parameters.context.strokeStyle = 'rgba(0,0,0,0.2)'
                        parameters.context.stroke()
                    }
                }
            }
        ]
    })
    map.init()
})
</script>
