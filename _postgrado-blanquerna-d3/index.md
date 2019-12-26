---
title: Visualizando elecciones
layout: postgrado-blanquerna-d3
---

En este taller preparemos una visualización de datos usando R y D3, paso a paso. Si nos da tiempo daremos el salto a tooltips, transiciones, y diseño móvil.

Para poder trabajar en nuestro ordenador primero hay que descargar esta web. Ve a la carpeta compartida del postgrado, y descarga la carpeta que hay en `SLIDES/D3-Martin`.

Ahora, hay que instalar el servidor. Si no te funcionó `node` en el taller podemos seguir [estas instrucciones](https://developer.mozilla.org/es/docs/Learn/Common_questions/set_up_a_local_testing_server#Ejecutando_un_servidor_HTTP_local_simple) que utilizan Python, e iniciar el servidor local.

Si `node` te funcionó sólo tienes que navegar de nuevo a la carpeta usando `cd`, por ejemplo `cd Descargas/posgrau-d3`, ejecutar `http-server` e ir a <a href="localhost:8080">localhost:8080</a>.

### El plan

1. [Algunos ejemplos](ejemplos)
2. [Práctica R](r)
3. [Práctica D3](d3)
4. [Ejercicio scatterplot](ejercicio-scatterplot)
5. [Ejercicio line chart](ejercicio-line-chart)
6. [Tu propio scatterplot](tu-scatterplot)
7. [Recursos](recursos)

---

### Una muestra de lo que haremos

<div class="scatters">
<div class="row">
  <h4>Voto a PSOE vs población nacida en Catalunya</h4>
  <div class="scatter-cat" data-party="psoe" data-variable="pct_cat" data-ymin="0.4" data-ymax="1"></div>
</div>

<div class="row">
  <h4>Voto a PSOE vs población nacida fuera de Catalunya</h4>
  <div class="scatter-es" data-party="psoe" data-variable="pct_es" data-ymin="0" data-ymax="0.35"></div>
</div>

<div class="row">
  <h4>Voto a Cs vs población nacida en Catalunya</h4>
  <div class="scatter-cs-cat" data-party="cs" data-variable="pct_cat" data-ymin="0.4" data-ymax="1" data-xmax="25"></div>
</div>

<div class="row">
  <h4>Voto a Cs vs población nacida fuera de Catalunya</h4>
  <div class="scatter-cs-es" data-party="cs" data-variable="pct_es" data-ymin="0" data-ymax="0.35" data-xmax="25"></div>
</div>

</div>

<div>
  <h4>Situación política en España según el CIS</h4>
  <div class="line-chart"></div>
</div>

<script src="/assets/postgrado-blanquerna-d3/javascript/scatterplot_final.js"></script>
<script src="/assets/postgrado-blanquerna-d3/javascript/line_chart_final.js"></script>
<script>
scatter('.scatter-cat');
scatter('.scatter-es');

scatter('.scatter-cs-cat');
scatter('.scatter-cs-es');

lineChart('.line-chart');
</script>
