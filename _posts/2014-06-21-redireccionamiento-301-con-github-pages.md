---
layout: post
title: Redireccionamiento 301 con Github Pages
date: 2014-06-21
permalink: redireccionamiento-301-con-github-pages
---
He cambiado el dominio de este blog de [mgonzalez.org](http://mgonzalez.org) a [martingonzalez.net](http://martingonzalez.net), y para poder conservar los enlaces antiguos y que Google no penalice el _pagerank_ hay que hacer un redireccionamiento 301.

El problema es que [Github Pages](https://pages.github.com/) (donde está alojado este blog) no soporta los archivos .htaccess, que es la manera más común para redireccionar, así que hay que buscarse la vida. 

_Pero que no salten las alarmas._

[Rerouter](https://github.com/joeyAghion/rerouter) es una aplicación ruby que se encarga de todo, sólo hay que clonar el repositorio, instalar la gema y crear una aplicación en [Heroku](https://heroku.com) con nuestra configuración:

    git clone https://github.com/joeyAghion/rerouter.git
    cd rerouter
    gem install heroku
    heroku apps:create
    git push heroku master
    heroku config:set REDIRECTS="{'old.domain.com'=>'new.domain.com'}"
    heroku domains:add old.domain.com

<p></p>

Por último hay que actualizar las DNS del dominio antiguo para que apunten a la aplicación que acabamos de crear. ¡Hecho!