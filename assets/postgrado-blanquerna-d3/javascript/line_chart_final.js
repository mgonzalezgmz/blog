// line chart
function lineChart(selector) {
  const container = d3.select(selector);
  const margin = { top: 20, right: 20, bottom: 20, left: 40 };

  const nodeWidth = container.node().getBoundingClientRect().width;

  const width = nodeWidth - margin.left - margin.right;
  const height = nodeWidth * 0.65 - margin.top - margin.bottom;

  // Escalas aquí
  const x = d3.scaleTime()
    .range([0, width])
    .domain([new Date(1979, 0,1), new Date(2018, 0, 1)]);

  const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 60]);

  const colour = d3.scaleOrdinal()
    .range(['#0571b0', '#92c5de', '#fbedce', '#f4a582', '#ca0020', '#ddd'])
    .domain(['muy_buena', 'buena', 'regular', 'mala', 'muy_mala', 'ns_nc']);

  const svg = container
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const path = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.value))
    .curve(d3.curveStep)

  // Cargamos los datos
  d3.csv('/assets/postgrado-blanquerna-d3/data/situacion_politica.csv', (d) => {
      // Parseamos la fecha
      d.year = d3.timeParse('%Y-%m-%d')(d.year);
      d.value = +d.value;

      return d;
    },
    (err, data) => {
      if (err) throw err;

      const filter = data.filter(d => d.situacion === 'mala' || d.situacion === 'muy_mala');

      const nest = d3.nest()
        .key(d => d.situacion)
        .entries(filter);

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(y).ticks(4).tickFormat(d => d + '%'));

      svg.append('g')
        .attr('class', 'lines')
        .selectAll('path')
        .data(nest)
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', d => colour(d.key))
        .attr('d', d => path(d.values));

      svg.append('text')
        .attr('x', x(new Date(2003, 0, 1)))
        .attr('y', y(30))
        .attr('fill', colour('mala'))
        .text('Mala');

      svg.append('text')
        .attr('x', x(new Date(2007, 8, 1)))
        .attr('y', y(55))
        .attr('fill', colour('muy_mala'))
        .text('Muy mala');
  })
}