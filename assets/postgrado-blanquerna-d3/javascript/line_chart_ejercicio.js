// ejercicio line chart

const container = d3.select('.line-chart-ejercicio');
const margin = { top: 10, right: 20, bottom: 20, left: 30 };

const nodeWidth = container.node().getBoundingClientRect().width;

const width = nodeWidth - margin.left - margin.right;
const height = nodeWidth * 0.65 - margin.top - margin.bottom;

// Escalas aquí
const x = d3.scaleTime()
  // .range([0, width])
  // .domain([new Date(1977, 0,1), new Date(2018, 0, 1)]);

const y = d3.scaleLinear()
  // .range([height, 0])
  // .domain([0, 100]);

const colour = d3.scaleOrdinal()
  // .range(['#0571b0', '#92c5de', '#fbedce', '#f4a582', '#ca0020', '#ddd'])
  // .domain(['muy_buena', ...]);

// Creamos el SVG y los márgenes
const svg = container
  .append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Ejes aquí

// Línea!!
// Aquí falta algo…
// https://github.com/d3/d3-shape#lines
const path = d3.line();

// Cargamos los datos
d3.csv('/data/situacion_politica.csv', (d) => {
    // Parseamos la fecha
    d.year = d3.timeParse('%Y-%m-%d')(d.year);
    d.value = +d.value;

    return d;
  },
  (err, data) => {
    if (err) throw err;

    // Nest!
    // Miremos R
    // http://bl.ocks.org/shancarter/raw/4748131/
    const nest = d3.nest()
      .key(d => d.situacion)
      .entries(data);
    
      console.log(nest);

    // Pintamos ejes

    // Pintamos datos
})
