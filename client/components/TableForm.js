import React, {Component} from 'react'
import {ReactTabulator} from 'react-tabulator' // for React 15.x, use import { React15Tabulator }

// import 'react-tabulator/styles.css'; // required styles
// import 'react-tabulator/tabulator.min.css'; // theme

const columns = [
  {title: 'Name', field: 'name'},
  {title: 'Progress', field: 'progress', align: 'right', sorter: 'number'},
  {title: 'Gender', field: 'gender'},
  {title: 'Rating', field: 'rating', align: 'center'},
  {title: 'Favourite Color', field: 'col'},
  {title: 'Date Of Birth', field: 'dob', align: 'center', sorter: 'date'},
  {title: 'Driver', field: 'car', align: 'center'}
]

const dummyData = [
  {id: 1, name: 'Oli Bob', age: '12', col: 'red', dob: ''},
  {id: 2, name: 'Mary May', age: '1', col: 'blue', dob: '14/05/1982'},
  {
    id: 3,
    name: 'Christine Lobowski',
    age: '42',
    col: 'green',
    dob: '22/05/1982'
  },
  {
    id: 4,
    name: 'Brendon Philips',
    age: '125',
    col: 'orange',
    dob: '01/08/1980'
  },
  {
    id: 5,
    name: 'Margret Marmajuke',
    age: '16',
    col: 'yellow',
    dob: '31/01/1999'
  }
]

class TableForm extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    // const { data } = this.props
    // console.log('data', data)
    return (
      <div id="example-table">
        {/* <h4>Hello from TableForm!</h4> */}

        <ReactTabulator
          columns={columns}
          data={dummyData}
          tooltips={true}
          layout="fitData"
        />
      </div>
    )
  }
}

export default TableForm
