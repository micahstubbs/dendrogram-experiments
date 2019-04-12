// define some constants
const width = 960
const height = 500
const margin = { top: 40, left: 40, bottom: 0, right: 0 }
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom
const fontSize = 12
const magicWidthDivisor = 1.35

// load the data
d3.json('analytics.json').then(data => draw(data))

function draw(data) {
  // define the tree layout function
  const tree = data => {
    const root = d3
      .hierarchy(data)
      .sort(
        (a, b) => a.height - b.height || a.data.name.localeCompare(b.data.name)
      )
    console.log('root.height', root.height)
    console.log('root', root)
    root.dx = 10
    root.dy = innerWidth / (root.height + 1)
    return d3.cluster().size([innerHeight, innerWidth / magicWidthDivisor])(root)
  }

  // call the tree layout function on the data
  const root = tree(data)

  // draw the visualization
  let x0 = Infinity
  let x1 = -x0
  root.each(d => {
    if (d.x > x1) x1 = d.x
    if (d.x < x0) x0 = d.x
  })

  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  svg
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none')
    .style('stroke', 'gray')
    .style('stroke-width', '1px')

  const magicXTranslateDivisor = 6
  const xTranslate = root.dy / magicXTranslateDivisor + margin.left
  const yTranslate = root.dx - x0 + margin.top
  const g = svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', fontSize)
    .attr(
      'transform',
      `translate(${xTranslate},${yTranslate})`
    )

  const link = g
    .append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
    .selectAll('path')
    .data(root.links())
    .join('path')
    .attr(
      'd',
      d => `
        M${d.target.y},${d.target.x}
        C${d.source.y + root.dy / 2},${d.target.x}
         ${d.source.y + root.dy / 2},${d.source.x}
         ${d.source.y},${d.source.x}
      `
    )

  const node = g
    .append('g')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
    .selectAll('g')
    .data(root.descendants().reverse())
    .join('g')
    .attr('transform', d => `translate(${d.y},${d.x})`)

  node
    .append('circle')
    .attr('fill', d => (d.children ? '#555' : '#999'))
    .attr('r', 2.5)

  node
    .append('text')
    .attr('dy', '0.31em')
    .attr('x', d => (d.children ? -6 : 6))
    .text(d => d.data.name)
    .filter(d => d.children)
    .attr('text-anchor', 'end')
    .clone(true)
    .lower()
    .attr('stroke', 'white')
}
