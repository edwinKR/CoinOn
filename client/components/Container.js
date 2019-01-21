import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

import Hexbin from './Hexbin'
import dummyData from './data.json'

import {MAP} from 'react-google-maps/lib/constants'

const MAP_PIXEL_HEIGHT = 600
const HEX_PIXEL_RADIUS = 50

class Container extends Component {
  static contextTypes = {[MAP]: PropTypes.object}

  constructor() {
    super()
    this.state = {}
  }

  // componentWillMount() {

  // }

  render() {
    var _this = this
    console.log('>>>>>>>', this)

    const GoogleMapExample = withGoogleMap(props => {
      console.log('>>>PROPS>>>>', props)
      const mapRef = el => {
        this.map = el
      }
      console.log('mapRef ===> ', mapRef)
      return (
        <GoogleMap
          defaultZoom={12}
          options={{mapTypeControl: false}}
          defaultCenter={{lat: 37.518397, lng: 126.978886}}
          ref={mapRef}
          onDragEnd={this.map.getCenter().toJSON()}
        >
          <Hexbin
            hexPixelRadius={HEX_PIXEL_RADIUS}
            mapPixelHeight={MAP_PIXEL_HEIGHT}
            data={dummyData}
            colorRange={['white', 'rgb(242, 117, 165)']}
          />
        </GoogleMap>
      )
    })

    return (
      <div>
        From container component!
        <GoogleMapExample
          query={{libraries: 'geometry,places,visualization'}}
          containerElement={
            <div style={{width: '100%', height: MAP_PIXEL_HEIGHT}} />
          }
          mapElement={<div style={{height: `100%`}} />}
        />
      </div>
    )
  }
}

export default Container
