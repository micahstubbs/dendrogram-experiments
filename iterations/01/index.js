// define some constants
const width = 960
const height = 2500
const margin = { top: 0, left: 0, bottom: 0, right: 50 }
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

// load the data
d3.json('tweets.json')
  .then(data => {
    console.log('data from tweets loader', data)

    data.tweets.forEach(d => {
      d.name = d.user
    })

    const nestedData = d3
      .nest()
      .key(el => el.user)
      .entries(data.tweets)

    const nestString = JSON.stringify(nestedData, null, 2)

    // replace the keys
    const newJsonString = nestString.replace(/key/g, 'name').replace(/values/g, 'children')
    const newNestedData = JSON.parse(newJsonString)
    return { name: 'tweets', children: newNestedData }
  })
  .then(nestedData => {
    console.log('nested tweets data', nestedData)

    draw(nestedData)
  })

// load the data
d3.json('flare.json').then(data => {
  console.log('flare data', data)
  draw(data)
})

function draw(data) {
  console.log('data to draw', data)
  // define the tree layout function
  const tree = data => {
    const root = d3
      .hierarchy(data)
      .sort(
        (a, b) => a.height - b.height || a.data.name.localeCompare(b.data.name)
      )
    root.dx = 10
    root.dy = innerWidth / (root.height + 1)
    return d3.cluster().nodeSize([root.dx, root.dy])(root)
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
    .append('g')
    .attr('transform', 'translate(40,0)')

  const g = svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`)

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

  // return svg.node()
}
