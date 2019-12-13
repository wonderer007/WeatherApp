import React from 'react'
import moment from 'moment'

export default class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: 'C'
    }

    this.changeTempratureScale = this.changeTempratureScale.bind(this)
    this.renderCurrentTempratureInfo = this.renderCurrentTempratureInfo.bind(this)
    this.renderFutureForecast = this.renderFutureForecast.bind(this)
    this.renderHourlyTemprature = this.renderHourlyTemprature.bind(this)
    this.renderDailyTemprature = this.renderDailyTemprature.bind(this)
    this.renderCurentTempratureIcon = this.renderCurentTempratureIcon.bind(this)
  }

  changeTempratureScale(scale) {
    this.setState({
      scale: scale
    })
  }

  tempratureScale(temprature) {
    const { scale } = this.state

    if(scale == 'C')
      return temprature

    return ((temprature * 9) / 5 + 32).toFixed(2)
  }

  renderCurentTempratureIcon(icon) {
    switch (icon) {
      case 'clear-day':
        return 'fas fa-sun'
      case 'clear-night':
        return 'fas fa-moon'
      case 'rain':
        return 'fas fa-cloud-rain'
      case 'snow':
        return 'fas fa-cloud-meatball'
      case 'sleet':
        return 'fas fa-cloud-meatball'
      case 'wind':
        return 'fas fa-wind'
      case 'fog':
        return 'fas fa-smog'
      case 'cloudy':
        return 'fas fa-cloud-rain'
      case 'partly-cloudy-day':
        return 'fas fa-cloud-sun'
      case 'partly-cloudy-night':
        return 'fas fa-cloud-moon'
      case 'hail':
        return 'fas fa-cloud-meatball'
      case 'thunderstorm':
        return 'fas fa-cloud-showers-heavy'
      case 'tornado':
        return 'fas fa-cloud-showers-heavy'
        break;
      default:
        return 'fas fa-bolt'
    }
  }

  renderCurrentTempratureInfo() {
    const _this = this
    const { latitude, longitude, timezone } = this.props.data
    const { time, summary, icon, temperature, precipType, humidity, windSpeed } = this.props.data.currently

    return (
      <div>
        <div className="row">
          <div className="col-md-12 col-xs-12 col-sm-12">
            <div className="info">
              <div className="timezone">
                <p> <i className="fas fa-map-marker-alt"></i> <b> {timezone} </b> </p>
                <small>(<a href={`https://www.google.com/maps/@${latitude.toFixed(6)},${longitude.toFixed(6)},15z`} target="_blank">{`${latitude.toFixed(6)},${longitude.toFixed(6)}`}</a>)</small>
              </div>
              <div className="time">
                <p> <i className="fas fa-clock"></i> { moment(time*1000).format('MM/DD/YYYY h:m A') }</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2 col-sm-6 d-flex justify-content-center align-items-center">
            <i className={`fas ${this.renderCurentTempratureIcon(icon)} fa-5x`}></i>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-6">
            <div className="temprature">
              <h1>{this.tempratureScale(temperature)}</h1>
              <div className="scale">
                <span className={(this.state.scale == 'C') ? 'active' : ''} onClick={(event) => { _this.changeTempratureScale('C')}}>&#176; C </span> | <span className={(this.state.scale == 'F') ? 'active' : ''} onClick={(event) => { _this.changeTempratureScale('F')}}> &#176; F </span>
              </div>
            </div>
          </div>

          <div className="col-4">

            <div className="weatherInfo">
              <span>Summary</span> : <span><small> {summary} </small></span>
            </div>

            <div className="weatherInfo">
              <span>Precipitation</span> : <span><small> {precipType} </small></span>
            </div>

            <div className="weatherInfo">
              <span>Wind Speed</span> : <span> {windSpeed} <small> meters per hour</small></span>
            </div>

            <div className="weatherInfo">
              <span>Humidity</span> : <span> {humidity} </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFutureForecast() {
    const { hourly, daily } = this.props.data

    return (
      <div className="futureForecast">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="hourly-tab" data-toggle="tab" href="#hourly" role="tab" aria-controls="hourly" aria-selected="true">Hourly</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="daily-tab" data-toggle="tab" href="#daily" role="tab" aria-controls="daily" aria-selected="false">Daily</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="hourly" role="tabpanel" aria-labelledby="hourly-tab">
            { this.renderHourlyTemprature(hourly) }
          </div>
          <div className="tab-pane fade" id="daily" role="tabpanel" aria-labelledby="daily-tab">
            { this.renderDailyTemprature(daily) }
          </div>
        </div>
      </div>
    )
  }

  renderHourlyTemprature(hourlyForecast) {
    const { data, icon, summary } = hourlyForecast

    return (
      <div className="hourly">
        <div className="summary">
          <i className={`fas ${this.renderCurentTempratureIcon(icon)}`}></i> &nbsp; <p> { summary }</p>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Temperature</th>
              <th scope="col">Summary</th>
              <th scope="col">Wind Speed</th>
              <th scope="col">Humidity</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => (
                <tr key={index}>
                  <td>{ moment(item.time*1000).format('MM/DD/YYYY hh:mm A') } </td>
                  <td>{ this.tempratureScale(item.temperature) }</td>
                  <td>
                    <i className={`fas ${this.renderCurentTempratureIcon(item.icon)}`}></i> &nbsp;
                    { item.summary }
                  </td>
                  <td>{ item.windSpeed} </td>
                  <td>{ item.humidity}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }

  renderDailyTemprature(dailyForecast) {
      const { data, icon, summary } = dailyForecast

      return (
        <div className="hourly">
          <div className="summary">
            <i className={`fas ${this.renderCurentTempratureIcon(icon)}`}></i> &nbsp; <p> { summary }</p>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Min Temperature</th>
                <th scope="col">Max Temperature</th>
                <th scope="col">Summary</th>
                <th scope="col">Wind Speed</th>
                <th scope="col">Humidity</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{ moment(item.time*1000).format('MM/DD/YYYY') } </td>
                    <td>
                      { `${this.tempratureScale(item.temperatureMin)} at ${moment(item.temperatureMinTime*1000).format('hh:mm A')}` }
                    </td>
                    <td>
                      { `${this.tempratureScale(item.temperatureMax)} at ${moment(item.temperatureMaxTime*1000).format('hh:mm A')}` }
                    </td>
                    <td>
                      <i className={`fas ${this.renderCurentTempratureIcon(item.icon)}`}></i> &nbsp;
                      { item.summary }
                    </td>
                    <td>{ item.windSpeed} </td>
                    <td>{ item.humidity}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    )
  }

  render() {
    const { data } = this.props

    return (
      <div>
       {
         Object.keys(data).length > 0 ? (
           <div>
             { this.renderCurrentTempratureInfo() }
             { this.renderFutureForecast() }
           </div>
         ) : ''
       }
      </div>
    )
  }
}
