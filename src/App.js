import React, { useState } from "react";
import axios from "axios"; // How we will be accessing our API

function App() {
  const [data, setData] = useState({});
  const [filter, setFilter] = useState('');
  const [location, setLocation] = useState(''); // setLocation is like the method to call & update location variable

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${filter}&appid=968d68531a670d096be02f9ad93194bd`;
  class UnitFilter extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: 'imperial'};
  
      this.handleChange = this.handleChange.bind(this);
  
    }
  
    handleChange(event) {
      this.setState({value: event.state.value});
    }
  
    render() {
      return (
        <form className="filter">
          <div>
            Choose Unit:
            <select value={filter} onChange={event => setFilter(event.target.value)}>
              <option>Standard</option>
              <option>Imperial</option>
              <option>Metric</option>
            </select>
          </div>
        </form>
      );
    }
  }

  const searchLocation = (event) => {
    event.preventDefault();
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
      console.log('success')
    })
    setLocation(''); // Resets search bar as empty string after user clicks 'enter'
  }

  return (
    // <head>
    //   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous"></link>
    //   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
    // </head>
    <div className="page">
      <div className="search-bar">
        <div className="search">
          <form onSubmit={searchLocation}>
          <input
            value={location}
            onChange={event => setLocation(event.target.value)} // Need to set value of location to this state
            placeholder='Enter Location'
            type='text'/>
          <UnitFilter />
          <button type="submit" class="btn btn-labeled btn-success">
            <span><img url="./assets/search_icon.jpg" alt="search icon"></img></span>
          </button>
          </form>
        </div>
      </div>
      <div className="content">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {/* this code will only run if data is defined. Shortened if statement. */}
        {data.name !== undefined &&
          <div class="d-flex flex-row" className='bottom'>
            <div className="feels">
              <p>Feels Like...</p>
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()} F</p> : null}
            </div>
            <div className="humidity">
              <p>Current Humidity</p>
              {data.main ? <p className="bold">{data.main.humidity} %</p> : null}
            </div>
            <div className="wind">
              <p>Wind Speed</p>
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
