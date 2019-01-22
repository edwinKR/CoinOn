import React, {Component} from 'react'
const axios = require('axios')

class Form extends Component {
  constructor() {
    super()
    this.state = {
      currency: ['USD', 'GBP', 'EUR']
    }
  }

  handleSubmit = async () => {
    event.preventDefault()
    // await axios.get(`/api/crypto/${}/${event.target.value}`)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Currency</label>

        <select id="currency">
          <option value="" disabled selected>
            - Select Currency -{' '}
          </option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="EUR">Euro</option>
        </select>
      </form>
    )
  }
}

export default Form
