import PropTypes from 'prop-types'
import React from 'react'
import axios from 'axios'

import Loader from './Loader'
import Forecast from './Forecast'

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestingLocation: true,
      fetchingForecast: false,
      data: {},
      errorMessage: null
    };
  }

  componentDidMount() {
    let _this = this;
    navigator.geolocation.getCurrentPosition((position) => {
      let api = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;

      if(position.coords.latitude && position.coords.longitude) {
        _this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          requestingLocation: false,
          fetchingForecast: true
        })

        axios.get(`http://localhost:3000/api/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
        .then(response => {
          if(response.data.latitude && response.data.longitude) {
            _this.setState({
              data: response.data,
              fetchingForecast: false,
              requestingLocation: false
            })
          }
          else {
            _this.setState({
              errorMessage: response.data.error,
              fetchingForecast: false,
              requestingLocation: false
            })
          }
        })
        .catch(error => {
          _this.setState({
            errorMessage: response.data,
            requestingLocation: false,
            requestingLocation: false
          })
        });
      }
      else {
        _this.setState({
          errorMessage: 'browser request for geolocation failed',
          requestingLocation: false,
          requestingLocation: false
        })
      }

    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="d-flex justify-content-center align-items-center">Weather Forecase</h1>
        <Loader
          requestingLocation={this.state.requestingLocation}
          fetchingForecast={this.state.fetchingForecast}
          errorMessage={this.state.errorMessage} />
        <Forecast
          data={this.state.data} />
      </div>
    );
  }
}
