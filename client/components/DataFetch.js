import React, {Component} from 'react'
import * as d3 from 'd3'
import {scaleLinear} from 'd3-scale'
import {max} from 'd3-array'

const axios = require('axios')

const width = 1500
const height = 1000
const padding = 50

//helperFunction to filter and exclude the 'null' values
function containsKeys(obj) {
  const keys = [
    'price_usd',
    'price_btc',
    'market_cap_usd',
    'available_supply',
    'total_supply'
  ]
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === null) return false
  }
  return true
}

class DataFetch extends Component {
  constructor() {
    super()
    this.state = {
      coinData: [],
      inputNum: 600
    }
  }

  async componentDidMount() {
    const apiCoinData = await axios.get('/api/crypto')
    console.log('d3 ???>>> ', d3)
    const data = apiCoinData.data.filter(containsKeys)
    console.log(data)
    this.setState({
      coinData: data
    })

    this.createScatterChart(this.state.inputNum)
  }

  componentDidUpdate() {
    const {inputNum} = this.state
    console.log('compDidMount!!!!', inputNum)
    this.createScatterChart(inputNum)
  }

  createScatterChart = inputNum => {
    console.log('===> triggered in createScatterChart()???')
    //Scale setup
    const {coinData} = this.state
    const xScale = scaleLinear()
      .domain(d3.extent(coinData, d => d.total_supply / 1800))
      .range([padding, 800])

    const yScale = scaleLinear()
      .domain(d3.extent(coinData, d => d.price_usd / 5000))
      .range([height - padding, padding])

    const rScale = scaleLinear()
      .domain(
        d3.extent(coinData, d => {
          return d.available_supply / inputNum
        })
      )
      .range([0, 80])

    const fScale = scaleLinear()
      .domain(d3.extent(coinData, d => d.price_btc / 12000))
      .range(['red', 'blue'])

    // const xAxis = d3.axisBottom(xScale)
    //   .tickSize(- height + 2 * padding)
    //   .tickSizeOuter(0);

    // const yAxis = d3.axisLeft(yScale)
    //   .tickSize(- width + 2 * padding)
    //   .tickSizeOuter(0);

    d3.select('.x-axis').call(d3.axisBottom(xScale))

    d3.select('.y-axis').call(d3.axisLeft(yScale))

    //svg setup (making circles)
    const svg = d3
      .select('svg')
      .attr('width', width)
      .attr('height', height)

    svg
      .append('g')
      .attr('transform', 'translate(0,' + (height - padding) + ')')
      .classed('x-axis', true)
    // .call(xAxis);

    svg
      .append('g')
      .attr('transform', 'translate(' + padding + ',0)')
      .classed('y-axis', true)
    // .call(yAxis);

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height - padding)
      .attr('dy', padding)
      .style('text-anchor', 'middle')
      .text('Total Supply')

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('dy', padding / 2)
      .style('text-anchor', 'middle')
      .text('Market price (USD)')

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '2em')
      .text('<Crypto Total Supply vs. Price Rate>')

    //Setting tooltip
    const update = svg
      .selectAll('circle')
      // .data(coinData);
      .data(coinData, d => d.id)

    update
      .exit()
      .transition()
      .duration(500)
      .attr('r', 0)
      .remove()

    update
      .enter()
      .append('circle')
      .on('mousemove touchmove', this.showTooltip)
      .on('mouseout touchend', this.hideTooltip)
      .attr('cx', d => xScale(d.total_supply))
      .attr('cy', d => yScale(d.price_usd))
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .merge(update)
      .transition()
      .duration(500)
      .delay((d, i) => i * 5)
      .attr('cx', d => xScale(d.total_supply))
      .attr('cy', d => yScale(d.price_usd))
      .attr('fill', d => fScale(d.price_btc))
      .attr('r', d => rScale(d.available_supply))
  }

  showTooltip = d => {
    const tooltip = d3.select('.tooltip')

    tooltip
      .style('opacity', 1)
      .style('left', d3.event.pageX - tooltip.node().offsetWidth / 2 + 'px')
      .style('top', d3.event.pageY - tooltip.node().offsetHeight - 10 + 'px')
      .html(`
           <p>CryptoCurrency: ${d.name}</p>
           <p>Symbol: ${d.symbol}</p>
           <p>Price per USD: ${d.price_usd}</p>
           <p>Rank: #${d.rank}</p>
           <p>Availability of Supply: ${(
             d.available_supply /
             d.total_supply *
             100
           ).toFixed(2)}%</p>
        `)
  }

  hideTooltip = d => {
    d3.select('.tooltip').style('opacity', 0)
  }

  handleChange = event => {
    this.setState({
      inputNum: event.target.value
    })
  }

  render() {
    const {coinData, inputNum} = this.state
    console.log('=coinList==>', coinData)
    console.log('=inputNum==>', inputNum)

    if (coinData.length === 0) return <h1>No Coin Data</h1>
    else {
      console.log('INSIDE RENDER METHOD)!!!!')

      return (
        <div>
          <h1>Stakathon Project: </h1>
          <h2>Playing with D3.js in React</h2>
          <svg version="1.1" baseProfile="full" />
          <input
            type="range"
            step="1"
            min="300"
            max="800"
            id="range-input"
            defaultValue={inputNum}
            onChange={this.handleChange}
          />
          <div className="tooltip" />
        </div>
      )
    }
  }
}

export default DataFetch
