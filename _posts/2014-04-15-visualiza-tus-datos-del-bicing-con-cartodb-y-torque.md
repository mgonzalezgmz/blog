---
layout: post-light-feature
title: "Visualiza tus datos del Bicing con CartoDB y Torque"
date: 2014-04-15
image: 
        feature: Ya...-cover.jpg
permalink: visualiza-tus-datos-del-bicing-con-cartodb-y-torque
---
Ya ha pasado un año desde que comencé a usar el [Bicing](http://bicing.cat), el exitoso servicio de bicis compartidas de Barcelona, y ahora que llega la hora de renovar la tarjeta quería trastear un poco con mis datos de uso. Este es un pequeño apunte para quien tenga ganas de generar un bonito mapa animado con <a href="http://cartodb.com">CartoDB</a> y <a href="https://cartodb.github.io/torque/">Torque</a> con sus propios datos.

{::nomarkdown}
<iframe width='100%' height='520' frameborder='0' src='http://mgonzalezgmz.cartodb.com/viz/44dd1bde-c53e-11e3-9d87-0e230854a1cb/embed_map?title=true&description=true&search=false&shareable=true&cartodb_logo=true&layer_selector=false&legends=false&scrollwheel=true&fullscreen=true&sublayer_options=1&sql=&sw_lat=41.36018981924962&sw_lon=2.110748291015625&ne_lat=41.41569786556419&ne_lon=2.3060989379882812' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
{:/nomarkdown}

<p><img src="https://www.bicing.cat/sites/all/themes/bicing/images/branding-vodafone/logo-banner.jpg" style="width: 700px" alt="" /></p>

<p>La interfaz web del Bicing permite acceder al histórico uso del servicio y de allí es fácil extraerlos con un <a href="http://schoolofdata.org/handbook/recipes/scraper-extension-for-chrome/"><em>scraper</em></a>. Cuando los tienes en Google Drive es cuestión de exportarlos a CSV y adaptarlos con Excel o LibreOffice al formato de Torque, la herramienta de animación de mapas de CartoDB.</p>

<p><img src="https://dl.dropboxusercontent.com/u/55065502/instant%C3%A1nea43.png" style="width: 400px" alt="De esto a un mapa hay un pequeño trecho..." /></p>

<p>Primero de todo hay que entender la tabla. Las dos primeras columnas tienen los datos de en qué estación coges la bici y a qué hora (<em>data inicial</em>), y dónde la dejas y en qué momento (<em>data final</em>). Esto es lo que nos interesa ahora. </p>

<p>Una vez <em>scrapeada</em> de la web hay que iniciar un programa de hojas de cálculo para usar las funciones LEFT, MID y RIGHT, que nos permiten separar los datos de las horas y de las estaciones (puedes separarlo en cuatro columnas, estación de salida / hora de salida y estación de llegada / hora de llegada). Una vez hecho esto es importante pasar los datos por <a href="http://openrefine.org/">OpenRefine</a> para resolver las pequeñas incongruencias ortográficas. Luego hay que juntar todo en sólo dos columnas, estaciones y tiempo. Torque sólo se fija en las fechas y no le importa el orden de los datos en la hoja de cálculo, así que podemos crear una nueva columna de tiempo y copiar sucesivamente las horas de salida y llegada. Luego creamos la de estaciones y pegamos de nuevo (¡respetando el orden!). Para ser más exactos también se pueden sustituir las direcciones por coordenadas, pero lleva más tiempo (esto es lo que yo he hecho).</p>

<p>El resultado final de la tabla debería ser algo parecido a este modelo (pero con muchas más celdas). Un pequeño añadido es la columna de categoría, que permite diferenciar las salidas (1) y llegadas (2) y así poder pintar de diferente color cada uno de estos puntos más adelante.</p>

<style type="text/css">
.tg {border-collapse:collapse;border-spacing:0;border-color:#ccc; text-align:center; margin: 0 auto;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;border-top-width:1px;border-bottom-width:1px;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;border-top-width:1px;border-bottom-width:1px;}
</style>

<table class="tg">
  <tr>
    <th class="tg-031e">Latitude</th>
    <th class="tg-031e">Longitude</th>
    <th class="tg-031e">Time</th>
    <th class="tg-031e">Category</th>
  </tr>
  <tr>
    <td class="tg-031e">41,403726</td>
    <td class="tg-031e">2,172906</td>
    <td class="tg-031e">2014-04-09 15:52:00+00</td>
    <td class="tg-031e">1</td>
  </tr>
  <tr>
    <td class="tg-031e">41.391877</td>
    <td class="tg-031e">2,187282</td>
    <td class="tg-031e">2014-04-09 21:31:00+00</td>
    <td class="tg-031e">1</td>
  </tr>
  <tr>
    <td class="tg-031e">41,401752</td>
    <td class="tg-031e">2,200797</td>
    <td class="tg-031e">2013-04-29 01:26:00+00</td>
    <td class="tg-031e">2</td>
  </tr>
  <tr>
    <td class="tg-031e">41,403494</td>
    <td class="tg-031e">2,193586</td>
    <td class="tg-031e">2013-04-29 15:36:00+00</td>
    <td class="tg-031e">2</td>
  </tr>
  <tr>
    <td class="tg-031e">41,404125</td>
    <td class="tg-031e">2,204129</td>
    <td class="tg-031e">2013-04-29 21:18:00+00</td>
    <td class="tg-031e">2</td>
  </tr>
  <tr>
    <td class="tg-031e">41,39221</td>
    <td class="tg-031e">2,190311</td>
    <td class="tg-031e">2013-04-30 10:49:00+00</td>
    <td class="tg-031e">2</td>
  </tr>
</table>
<p></p>
<p>Cuando tenemos esto listo ya podemos subir la hoja de cálculo a CartoDB y seleccionar los tipos de columna adecuados (<em>date</em> para fechas y <em>number</em> para las categorías). También georeferenciamos las direcciones. <a href="https://gis.stackexchange.com/questions/83713/date-fails-in-string-date-in-cartodb">Si no os reconoce las fechas</a> hay que usar un poco de SQL. Se crea una nueva columna en la que incluiremos los datos de tiempo en el formato adecuado (nuevo<em>_</em>tiempo), a partir de la columna de tiempo ya existente (tiempo_antiguo). Este es el código que usé en mi propia tabla (acuérdate de sustituir los nombres de las columnas por los tuyos).</p>

<pre><code>UPDATE nombre_tabla SET nuevo_tiempo = to_timestamp(tiempo_antiguo, 'DD-MM-YYYY HH24:MI:SS')
</code></pre>

<p>Una vez hecho esto ya podemos seleccionar Torque como visualización. Escogemos la columna tiempo para realizar el <em>timeline</em> y voilà!</p>

<iframe src="http://player.vimeo.com/video/79115503" width="700" height="370" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<p>También se puede modificar el CSS para pintar de diferente color los puntos de salida y llegada (para ello debes de haber asignado a cada uno de ellos una categoría distinta). El código que debemos incluir está muy bien explicado <a href="https://github.com/CartoDB/torque/wiki/How-spatial-aggregation-works#can-i-use-strings-with-torque">en la wiki de CartoDB</a>:</p>

<pre><code class="css">Map {
 ...
 -torque-aggregation-function: "round(avg(columna_categoría))";
 ...
}

#layer {
...
  marker-fill: #FF0000;
  // avg of 1 and 2
  [value = 2] { marker-fill: #0000FF; }
...
</code></pre>
<p></p>
<p>Por último, he usado el <em>basemap</em> <a href="http://maps.stamen.com/">Toner</a> para la visualización del mapa. Es posible utilizarlo en CartoDB añadiendo un mapa personalizado con esta URL: <code>http://tile.stamen.com/toner/{z}/{x}/{y}.jpg</code></p>