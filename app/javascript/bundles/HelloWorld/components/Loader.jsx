import React from 'react'

export default class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.renderSpinerCircle = this.renderSpinerCircle.bind(this)
    this.renderSpinnerMessage = this.renderSpinnerMessage.bind(this)
    this.renderErrorMessage = this.renderErrorMessage.bind(this)
  }

  renderSpinerCircle() {
    const { requestingLocation, fetchingForecast } = this.props

    return (
      (requestingLocation
        || fetchingForecast) ?
          (<div className="spinner-border text-primary spinner" role="status"></div>) : ''
    )
  }

  renderSpinnerMessage() {
    const { requestingLocation, fetchingForecast } = this.props

    return (
      (requestingLocation || fetchingForecast) ? (
        <div className="d-flex justify-content-center align-items-center status">
          <small>
            { requestingLocation ? <span>requesting location from browser</span> : '' }
            { fetchingForecast ? <span>fetching weather forecast</span> : '' }
          </small>
        </div>
      ) : ''
    )
  }

  renderErrorMessage() {
    const { errorMessage } = this.props

    return (
      <div className="d-flex justify-content-center align-items-center status">
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Error!</h4>
          <p>{errorMessage}</p>
        </div>
      </div>
    )
  }

  render() {
    const { requestingLocation, fetchingForecast, errorMessage } = this.props
    return (
      <div className="wrapper">
       {
         (requestingLocation || fetchingForecast) ? (
           <div className="loader">
             { this.renderSpinerCircle() }
             { this.renderSpinnerMessage() }
           </div>
         ) : ''
       }

       {
         (errorMessage) ? (
           <div className="loader">
             { this.renderErrorMessage() }
           </div>
         ) : ''
       }
      </div>
    )
  }
}
