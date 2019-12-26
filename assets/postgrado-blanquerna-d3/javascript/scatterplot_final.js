// scatterplot home
function scatter(selector) {
  const container = d3.select(selector);

  const party = container.attr('data-party');
  const variable = container.attr('data-variable');
  const yMin = +container.attr('data-ymin');
  const yMax = +container.attr('data-ymax');
  const xMax = +container.attr('data-xmax');

  const margin = { top: 10, right: 20, bottom: 20, left: 40 };

  const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
  const height = container.node().getBoundingClientRect().width * 0.65 - margin.top - margin.bottom;

  const x = d3.scaleLinear()
    .range([0, width]);

  const y = d3.scaleLinear()
    .range([height, 0]);

  const z = d3.scaleOrdinal()
    .range(['#b30000', '#fd8d3c'])
    .domain(['psoe', 'cs']);

  const svg = container
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = d3.axisBottom(x)
    .ticks(5)
    .tickFormat(d => d + '%')
    .tickSizeOuter(null);

  const yAxis = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d => d * 100 + '%')
    .tickSizeOuter(null);

  d3.queue()
    .defer(d3.csv, "/assets/postgrado-blanquerna-d3/data/pop_cat.csv", (d) => {
      d.pct_es = +d.en_distinta_comunidad_autonoma / + d.total;
      d.pct_cat = +d.en_la_misma_comunidad_autonoma / + d.total;
      d.pct_ex = +d.nacidos_en_el_extranjero / + d.total;

      return d;
    })
    .defer(d3.csv, "/assets/postgrado-blanquerna-d3/data/results_cat.csv", (d) => {
      d.psoe = +d.psoe;
      d.cs = +d.cs;

      return d;
    })
    .await(ready);

  function ready(err, pop, data)  {
    if (err) throw err;

    const popMap = d3.map(pop, d => d.id);

    x.domain(xMax ? [0, xMax] : d3.extent(data, d => d[party]));
    y.domain([yMin, yMax]); // d3.max(pop, d => d.pct_cat)

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
    
    svg.append('g')
      .attr('class', 'dots')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('fill', z(party))
      .attr('fill-opacity', 0.25)
      .style('mix-blend-mode', 'multiply')
      .attr('cx', d => x(d[party]))
      .attr('cy', d => y(popMap.get(d.id)[variable]))
      .attr('r', 4)
  }
}