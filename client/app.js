import React from 'react'

// import DashBoard from './components/DashBoard'
// import PieChart from './components/PieChart'
// import TableForm from './components/TableForm'
// import SchedulerContainer from './components/SchedulerContainer'
import DataFetch from './components/DataFetch'

// import { PieChart } from './components'
// import Routes from './routes'
import Container from './components/Container'
import * as d3 from 'd3'

const App = () => {
  console.log('---==-=-=-=-=-', d3)
  return (
    <div>
      <h1>Hello from APP</h1>
      {/* <Routes /> */}
      {/* <PieChart /> */}
      {/* <SchedulerContainer /> */}
      {/* <DashBoard /> */}
      {/* <Container /> */}
      <DataFetch />
    </div>
  )
}

export default App

// peer dep missing: @material-ui/core@^1.0.0, required by @material-ui/icons@3.0.0
