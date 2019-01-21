import React, {Component} from 'react'
import {json} from 'd3-fetch'
import RenderToLayer from 'material-ui/internal/RenderToLayer'
const axios = require('axios')

class DataFetch extends Component {
  constructor() {
    super()
    this.state = {
      coinData: []
    }
  }

  async componentDidMount() {
    const apiCoinData = await axios.get('/api/crypto')
    console.log('FRONTEND ???>>> ', apiCoinData.data)
    this.setState({
      coinData: apiCoinData.data
    })
  }

  render() {
    const {coinData} = this.state
    console.log('=coinList==>', coinData)

    if (coinData.length === 0) return <h1>No Coin Data</h1>
    else {
      return (
        <div>
          <h1>Hello from DataFetch</h1>
          <div>{coinData[0].name}</div>
        </div>
      )
    }
  }
}

export default DataFetch

// 5c7cef9c-7eec-4adb-afef-2be547a3ac03
