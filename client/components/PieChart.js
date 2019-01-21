import React, {Component} from 'react'

// import queue from 'queue'
// import topojson from 'topojson'
import * as d3 from 'd3'
// import { TableForm } from './components'
import TableForm from './TableForm'
// import { TableForm } from './components'

class PieChart extends Component {
  constructor() {
    super()
    this.state = {
      data: [
        {id: 0, action: 'Hoodie', count: 12},
        {id: 1, action: 'Jacket', count: 7},
        {id: 2, action: 'Snuggie', count: 6}
      ]
    }
  }

  // componentDidMount() {

  // }

  render() {
    const height = 400
    const width = 400

    //This gives us the array of data
    const pie = d3.pie().value(function(d) {
      return d.count
    })

    const slices = pie(this.state.data)

    //Lastly, all we have to do is create our pie slices and we’re done!
    console.log('=slices==> ', slices)

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(100)

    // let interpolate = d3.interpolateRgb('#eaaf79', '#bc3358', 'ffffff')
    // console.log('interpoloate ==> ', interpolate)
    let sliceColor = d3.scaleOrdinal(d3.schemeCategory10)

    return (
      <div>
        <h1>Hello Tester!!</h1>

        <svg height={height} width={width}>
          <g transform={`translate(${width / 2},${height / 2})`}>
            {slices.map((slice, index) => {
              console.log('slice ===> ', slice)
              console.log('index ==> ', index)
              // let sliceColor = interpolate(index / (slices.length - 1))
              return (
                <g key={slice.data.id}>
                  <path d={arc(slice)} fill={sliceColor(slice.data.count)} />
                  <text
                    transform={`translate(${arc.centroid(slice)})`}
                    dy=".35em"
                  >
                    {slice.data.product}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>

        <div>{/* <TableForm data={this.state.data} /> */}</div>
      </div>
    )
  }
}

export default PieChart
