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
          <label>
            Choose Unit:
            <select value={filter} onChange={event => setFilter(event.target.value)}>
              <option>Standard</option>
              <option>Imperial</option>
              <option>Metric</option>
            </select>
          </label>
        </form>
      );
    }
  }

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        console.log('success')
      })
      setLocation(''); // Resets search bar as empty string after user clicks 'enter'
    }
  }

  return (
    <div className="app">
      <div className="search-bar">
        <div className="search">
          <input
          value={location}
          onChange={event => setLocation(event.target.value)} // Need to set value of location to this state
          onKeyPress={searchLocation} // calls function as soon as anything is entered
          placeholder='Enter Location'
          type='text'/>
        </div>
        <UnitFilter />
      </div>
      <div className="container">
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
          <div className='bottom'>
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()} F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity} %</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
