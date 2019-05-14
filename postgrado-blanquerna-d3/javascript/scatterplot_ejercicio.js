// ejercicio scatterplot

// Lo más importante al empezar un gráfico en D3 es saber qué escalas necesitamos
// Normalmente el código lo veréis en un orden parecido a este

// 1. Primero pensamos en el tamaño del gráfico
// 2. Luego creamos las escalas
// 3. Luego cargamos los datos y creamos los ejes
// 4. Ahora podemos visualizar 

// 1. Seleccionamos el elemento
const container = d3.select('.scatter-ejercicio');

// 2. Márgenes
const margin = { top: 10, right: 20, bottom: 20, left: 30 };

// 3.1 Tamaño del contenedor, así es responsive
const nodeWidth = container.node().getBoundingClientRect().width;

// 3.2 ¡Ratio de altura!
const width = nodeWidth - margin.left - margin.right;
const height = nodeWidth * 0.65 - margin.top - margin.bottom;

// 4. Escalas
const x = d3.scaleLinear()
  // .range(...);

const y = d3.scaleLinear()
  // .range(...);

// 5. Creamos el SVG y los márgenes
const svg = container
  .append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// 6. Eje x
const xAxis = d3.axisBottom(x)
  .ticks(5)
  .tickSizeOuter(null);

// 6. Eje y, tickFormat
const yAxis = d3.axisLeft(y)
  .ticks(5)
  .tickFormat(d => d * 100)
  .tickSizeOuter(null);

// Con d3-queue podemos cargar varios datos en paralelo
// Normalmente se usan archivos CSV, que podemos transformar en la misma función
// para pasarlos a número y crear variables extra
d3.queue()
  .defer(d3.csv, "/postgrado-blanquerna-d3/data/pop_cat.csv", (d) => {
    // Aquí creo mis porcentajes, más sencillo que con R! 
    // console.log(d)

    // d.pct_es = ... / +d.total;
    // d.pct_cat = ;
    // d.pct_ex = ;

    return d;
  })
  .defer(d3.csv, "/postgrado-blanquerna-d3/data/results_cat.csv", (d) => {
    d.psoe = +d.psoe;

    return d;
  })
  .await(ready); // Esta es la función que se ejecutará cuando tengamos cargados los datoa

// Va en orden: lo que ocurre cuando hay un error, el primer y el segundo
// dato con cualquier nombre
function ready(err, pop, data)  {
  if (err) throw err;

  // Nuestro map
  // Esto no es tan común, pero es MUY útil
  // Descubrir esto me salvó decenas de horas al usar diferentes datasets

  // const popMap = d3.map(...);

  // Una vez tenemos los datos podemos ajustar el dominio de las escalas
  // x.domain(...);
  // y.domain(...);

  // Creamos los ejes

  // ¡Y aquí, los puntos!
  

  // Un tooltip?
  
  // function mousemoved(d) {
  //   console.log(d);
  // }

  // function mouseleft(d) {
  //   console.log(d);
  // }
}