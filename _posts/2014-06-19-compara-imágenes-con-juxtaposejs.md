---
layout: post
title: Compara imágenes con JuxtaposeJS
date: 2014-06-19
permalink: compara-imagenes-con-juxtaposejs
---
Después de ver [estas imágenes](http://www.eldiario.es/politica/FOTOS-Compara-Carlos-Felipe-VI_12_272742727.html) de eldiario.es ilustrando la _poca_ asistencia a la proclamación de Felipe VI, me acordé de los _sliders_ antes y después que usó el Times [para ilustrar](http://www.nytimes.com/interactive/2012/03/01/world/asia/JapanBeforeAfter.html) el tsunami de Japón de marzo del 2011.

**¿Por qué?** Porque la noticia de eldiario.es era la excusa perfecta para hacer algo parecido. 

**¿Y cómo?** Después de buscar un rato he encontrado [JuxtaposeJS](https://github.com/NUKnightLab/juxtapose), una pequeña utilidad del [Knight Lab](http://knightlab.northwestern.edu/) para hacer precisamente esto y he creado este _slider_:

{::nomarkdown}
<div class="juxtapose" data-startingposition="50" data-showlabels="true" data-showcredits="true" data-animate="true">
<link rel="stylesheet" href="//cdn.knightlab.com/libs/juxtapose/latest/css/juxtapose.css">
<script type="text/javascript" src="//cdn.knightlab.com/libs/juxtapose/latest/js/juxtapose.js"></script>
{:/nomarkdown}

* * *

**¿Y cómo lo hago yo?**
Sólo hay que incluir el CSS y el JS de JuxtaposeJS al principio de la entrada en la que quieras poner el _slider_ y después añadir el _div_ dónde desees. Luego hay que rellenar las imágenes y fechas. Aquí está el código con el que está hecho el de esta página (he subido el CSS y el JS a Dropbox por comodidad).

    <link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/55065502/juxtapose.css">
    <script src="https://dl.dropboxusercontent.com/u/55065502/juxtapose.js"></script>

    <div class="juxtapose">
            ![](https://dl.dropboxusercontent.com/u/55065502/juancarlosi.jpg)
            ![](https://dl.dropboxusercontent.com/u/55065502/felipevi.jpg)
        </div>

<p></p>

**ACTUALIZACIÓN**: Después de unas pruebas creo que no funciona con Firefox (por lo menos a mí no me va). Si pruebas con Chromium sí que funciona. _Investigando cómo solucionarlo..._

**ACTUALIZACIÓN 2**: Media hora más tarde, [el _bug_ ya está corregido](https://github.com/NUKnightLab/juxtapose/issues/9). Menuda velocidad. Por cierto, presentarán Juxtapose [en el IRE](http://ire.org/conferences/ire-2014/) de la semana que viene.