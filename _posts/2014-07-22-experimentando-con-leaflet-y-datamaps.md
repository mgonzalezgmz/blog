---
layout: post
title: Experimentando con Leaflet y Datamaps
date: 2014-07-22
permalink: experimentando-con-leaflet-y-datamaps
---
Últimamente he estado probando varias librerías para hacer mapas. La versión gratuita de **CartoDB** tiene un límite de 10.000 visitas al mes que es fácil que se quede corto y **Fusion Tables** no me atrae demasiado. Aquí hay dos herramientas con las que he estado jugando:

{::nomarkdown}
<iframe src="https://dl.dropboxusercontent.com/u/55065502/leaflet.html" width=680 height=550 frameborder="0" scrolling="no"></iframe>
{:/nomarkdown}

## Leaflet
Este mapa, que muestra los avales a Pedro Sánchez durante las elecciones internas del PSOE, está basado en [este otro ejemplo](http://leafletjs.com/examples/choropleth.html). [Leaflet](http://leafletjs.com/) permite crear mapas similares a los que podemos conseguir con CartoDB, pero para poder hacerlo de coropletas tuve que extraer los _shapefiles_ de las Comunidades Autonómas, creando un archivo Javascript con los polígonos resultantes. Más tarde hay que programar la parte interactiva. Es muy versátil, ya que podemos alimentarlo con nuestras propias _tiles_, lo que abre un mundo de posibilidades si usamos [software GIS](http://www.qgis.org/en/site/) o [TileMill](https://www.mapbox.com/tilemill/). En este ejemplo uso OpenStreetMaps, aunque siempre puedes probar [Toner](http://maps.stamen.com/toner/#6/40.046/-3.752) o [Watercolor](http://maps.stamen.com/watercolor/#6/39.995/-2.544).

{::nomarkdown}
<iframe src="https://dl.dropboxusercontent.com/u/55065502/datamaps.html" width=680 height=550 frameborder="0" scrolling="no"></iframe>
{:/nomarkdown}

## Datamaps
Si somos más valientes podemos usar [Datamaps](http://datamaps.github.io/), una capa para desarrollar mapas encima de D3. Es muy sencillo hacer mapas complejos con objetos como arcos o burbujas, despreocupándonos de servir las _tiles_ del mapa al ser un simple objeto SVG. En su web y en [Github](https://github.com/markmarkoh/datamaps/blob/master/README.md) hay un montón de ejemplos que nos pueden servir de base para nuestras visualizaciones. En este mapa no he usado ningún dato real, sólo estaba probando.

