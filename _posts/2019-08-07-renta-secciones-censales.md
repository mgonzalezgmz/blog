---
title: Renta media por sección censal
description: Mapas con los nuevos datos del INE de renta media por habitante y hogar
image: assets/renta-secciones-censales/promo.png
layout: blank
---

<script src='https://d3js.org/d3.v5.min.js'></script>
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet' />
<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.1/mapbox-gl-geocoder.min.js'></script>
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.1/mapbox-gl-geocoder.css' type='text/css' />

<style>
body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.mapboxgl-popup {
  width: 200px;
  font-size: 14px;
  line-height: 16px;
}
.tip-title {
  border-bottom: 1px solid #d3d3d3;
  padding-bottom: 2px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.tip-mun {
  font-weight: 600;
}
.tip-sec {
  font-size: 12px;
  color: #aaa;
  font-weight: 400;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#toggle {
  font-size: 14px;
  font-family: sans-serif;
  position: absolute;
  z-index: 1;
  top: 70px;
  left: 10px;
  background: white;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0 0 10px 2px rgba(0,0,0,.1)
}
#toggle > div {
  margin-bottom: 5px;
}

@media (min-width: 600px) {
  #toggle {
    top: 60px;
  }
}

#key {
  z-index: 1;
  border-radius: 2px;
  position: absolute;
  bottom: 40px;
  left: 10px;
  background:rgba(255,255,255,0.9);
  padding: 10px;
  font-size: 12px;
  box-shadow: 0 0 10px 2px rgba(0,0,0,.1);
  font-family: sans-serif;
}
.title {
  font-weight: 600;
  margin-bottom: 10px;
}
.key-flex {
  display: flex;
}
.swatches {
  display: flex;
  flex-direction: column;
  margin-right: 5px;
}
.labels {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.swatch {
  width: 18px;
  height: 14px;
}
</style>

<div id='key'></div>
<div id='toggle'>
<div>
  <input id='renta-persona' type='radio' name='rtoggle' value='persona' checked='checked'>
  <label for='renta-persona'>Renta por persona</label>
  </div>
  <div>
  <input id='renta-hogar' type='radio' name='rtoggle' value='hogar'>
  <label for='renta-hogar'>Renta por hogar</label>
  </div>
</div>
<div id='map'></div>

<script>
// custom locale
const es = {
  "decimal": ",",
  "thousands": ".",
  "grouping": [3],
  "currency": ["", "\u00a0€"]
};

const scale = d3.scaleThreshold()
  .range(['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'])
  .domain([4000, 8000, 10000, 12000, 16000, 20000, 24000, 28000]);

const scale2 = d3.scaleThreshold()
  .range(['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'])
  .domain([6000, 12000, 18000, 24000, 30000, 36000, 42000, 48000]);

const fillColor = ["match", ["get", "CUSEC"]];
const fillColor2 = ["match", ["get", "CUSEC"]];

Promise.all([
  d3.csv('/assets/renta-secciones-censales/renta_persona.csv', d => {
    const color = d3.color(scale(d.value));
    color.opacity = 1;
    fillColor.push(d.id, color.formatRgb());
    d.value = +d.value;
    return d;
  }),
  d3.csv('/assets/renta-secciones-censales/renta_hogar.csv', d => {
    const color = d3.color(scale2(d.value));
    color.opacity = 1;
    fillColor2.push(d.id, color.formatRgb());
    d.value = +d.value;
    return d;
  }),
]).then(([personas, hogar]) => {
  fillColor.push("rgba(0,0,0,0)");
  fillColor2.push("rgba(0,0,0,0)");

  const selection = {
    persona: {
      data: personas,
      color: fillColor,
      key: 'Renta media <br> por persona',
      scale: scale,
    },
    hogar: {
      data: hogar,
      color: fillColor2,
      key: 'Renta media <br> por hogar',
      scale: scale2,
    }
  }

  mapboxgl.accessToken = 'pk.eyJ1Ijoid29uZGVyMiIsImEiOiJjamFmMnV0NWIxMGozMzNsZGNmdmh3aHFoIn0.OwGfCAwpL5D_YhA2X8wGDw';

  const width = d3.select('#map')
    .node()
    .getBoundingClientRect().width;

  const isMobile = width < 600;
  
  const formatter = d3.formatLocale(es);
  const ft = formatter.format(',');

  d3.select('#key')
    .append('div')
    .attr('class', 'title')
    .html('Renta media <br/> por persona');

  const key =  d3.select('#key')
    .append('div')
    .attr('class', 'key-flex');

  key
    .append('div')
    .attr('class', 'swatches')
    .selectAll('.swatch')
    .data(scale.range(), (d, i) => i)
    .enter()
    .append('div')
    .attr('class', 'swatch')
    .style('background-color', d => d);

  key
    .append('div')
    .attr('class', 'labels')
    .selectAll('.label')
    .data(scale.domain())
    .enter()
    .append('div')
    .attr('class', 'label')
    .text((d, i) => i === 0 ? `${ft(d)}€` : ft(d));

  const nav = new mapboxgl.NavigationControl();

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-3.975704, 39.940117],
    zoom: isMobile ? 4.5 : 5.5,
    minZoom: isMobile ? 4.5 : 5.5,
    pitchWitRotate: false,
    dragRotate: false,
    attributionControl: false,
    hash: true
    // scrollZoom: false,
    // maxBounds: [[-1.2583, 40.2252], [4.927, 43.049]],
    // hash: true
  });

  map.addControl(nav, 'top-right');
  map.addControl(new mapboxgl.AttributionControl({
    customAttribution: 'Estadística experimental INE (2016)'
  }));
  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: 'es',
    language: 'es',
    enableEventLogging: false,
    marker: false,
    types: 'region,postcode,district,place,locality,neighborhood',
    placeholder: 'Busca',
    // flyTo: false
  }), 'top-left');

  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();

  map.on('load', () => {
    map.addSource('sec_censales', {
      type: 'vector',
      url: 'mapbox://wonder2.2x99dutc',
    });

    map.addSource('sec_censales_hover', {
      type: 'vector',
      url: 'mapbox://wonder2.2x99dutc',
    });

    map.addLayer(
      {
        id: 'sec_censales_fills',
        type: 'fill',
        source: 'sec_censales',
        'source-layer': 'SECC_CE_20180101_01_R_INE',
        layout: {},
        paint: {
          'fill-outline-color': 'transparent',
          'fill-color': fillColor,
          'fill-opacity': {
            "stops": [
              [5, 0.75],
              [7, 0.35]
            ]
          },
        },
      },
      'waterway-label',
    );

    map.addLayer(
      {
        id: 'sec_censales_fills_hover',
        type: 'line',
        source: 'sec_censales_hover',
        'source-layer': 'SECC_CE_20180101_01_R_INE',
        layout: {},
        paint: {
          'line-color': 'black',
          'line-width': 1,
          'line-opacity': 1,
        },
        filter: ['==', 'id', ''],
      },
      'waterway-label',
    );

    d3.selectAll('#toggle input').on('change', function() {
      map.setPaintProperty('sec_censales_fills', 'fill-color', selection[this.value].color);

      d3.select('#key')
        .select('.title')
        .html(selection[this.value].key)

      key
        .select('.labels')
        .selectAll('.label')
        .data(selection[this.value].scale.domain(), (d, i) => i)
        .text((d, i) => i === 0 ? `${ft(d)}€` : ft(d));
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 15,
    });

    map.on('mousemove', 'sec_censales_fills', e => {
      if (map.getZoom() < 6) return;

      const active = d3.select('#toggle input:checked').attr('value');

      const id = e.features[0].properties.CUSEC;
      const datum = selection[active].data.find(d => d.id === id);

      if (!datum) return mouseleave();

      map.getCanvas().style.cursor = 'pointer';

      popup
        .setLngLat(e.lngLat)
        .setHTML(
          `
        <div class="tip-title">
          <div class="tip-mun">${e.features[0].properties.NMUN}</div>
          <div class="tip-sec">S${e.features[0].properties.CSEC}</div>
        </div>
        <div class="flex">
          <div class="tip-name">${selection[active].key}</div>
          <div>${ft(datum.value)}€</div>
        </div>
      `,
        )
        .addTo(map);

      map.setFilter('sec_censales_fills_hover', [
        '==',
        'CUSEC',
        e.features[0].properties.CUSEC,
      ]);
    });

    map.on('mouseleave', 'sec_censales_fills', () => {
     mouseleave();
    });

    function mouseleave() {
      map.getCanvas().style.cursor = '';
      popup.remove();

      map.setFilter('sec_censales_fills_hover', ['==', 'CUSEC', '']);
    }
  });
});
</script>
