import React, {Component} from 'react'
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui'
import {data} from './data'
const dummyData = [
  // { startDate: '2018-10-31 10:00', endDate: '2018-10-31 11:00', title: 'Meeting' },
  // { startDate: '2018-11-01 18:00', endDate: '2018-11-01 19:30', title: 'Go to a gym' },
]

const currentDate = new Date(2017, 4, 25)
const views = ['day', 'week', 'month']

class SchedulerContainer extends Component {
  constructor() {
    super()
    this.state = {
      stateData: []
    }
  }

  componentDidMount() {
    this.setState({
      stateData: data
    })
  }

  render() {
    const {stateData} = this.state
    return (
      <div>
        <Scheduler
          dataSource={stateData}
          views={views}
          defaultCurrentView="day"
          defaultCurrentDate={currentDate}
          height={600}
          startDayHour={9}
          endDayHour={19}
          textExpr="Text"
          startDateExpr="StartDate"
          endDateExpr="EndDate"
          allDayExpr="AllDay"
        />
      </div>
    )
  }
}

export default SchedulerContainer
