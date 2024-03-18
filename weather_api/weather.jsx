
import React, { useState, useEffect } from "react";
import "./style.css";
import "./input.css";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const formattedDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const [searchValue, setSearchValue] = useState("multan");
  const [selectvalue, setSelectvalue] = useState("City Name")
  const [unit, setUnit] = useState("metric");
  const [temperatureUnit, setTemperatureUnit] = useState("C");
  
  

  const getinfo = async () => {
    let url = '';
    if (selectvalue === 'City Name') {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=${unit}&appid=b772f99a1207dc12ab076c9bf9448b07`;
    } else if (selectvalue === 'City Id') {
      url = `https://api.openweathermap.org/data/2.5/weather?id=${searchValue}&units=${unit}&appid=b772f99a1207dc12ab076c9bf9448b07`;
    } else if (selectvalue === 'Zipcode') {
      url = `https://api.openweathermap.org/data/2.5/weather?zip=${searchValue}&units=${unit}&appid=b772f99a1207dc12ab076c9bf9448b07`;
    }
    if (url) {
      try {
        let res = await fetch(url);
        let data = await res.json();
        setWeather(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getinfo();
    }
  };

  useEffect(() => {
    getinfo();
  }, []);

  const convertTemperature = () => {
    if (temperatureUnit === "C") {
      setTemperatureUnit("F");
    } else {
      setTemperatureUnit("C");
    }
  };

  const displayTemperature = () => {
    if (!weather || !weather.main) return '';
    const temp = weather.main.temp;
    if (temperatureUnit === "C") {
      return `${temp}° C`;
    } else {
      const fahrenheit = (temp * 9/5) + 32;
      return `${fahrenheit.toFixed(2)}° F`;
    }
  };

  
  return (
    <>
      <div className="main">
        <div className="weather_Search">


          <div className="searchform">
            <div>
              <select className="custom-select" name="options" onChange={(e) => setSelectvalue(e.target.value)} value={selectvalue}>
                <option value="" disabled hidden>Select By</option>
                <option value="City Name">City Name</option>
                <option value="Zipcode">Zipcode</option>
                <option value="City Id">City Id</option>
              </select> 
            </div>
            <input type="text" name="" id="" placeholder="Enter City Name" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyDown={handleKeyDown} />
            <button className="btn-search" onClick={getinfo}> Search</button>
            
          </div>
        </div>

        <div className="grid-container">
          <div className="box1">
            {weather && (
              <>
                <h3>{weather.name}, {weather.sys.country}</h3>
                <button className="shake" onClick={convertTemperature}>Convert into Fahrenheit <i class="fa-solid fa-arrow-down-up-across-line"></i></button>
                <br/><br /> 
                <h4>For zip code: Enter zipcode + , + pk</h4>
                <div className="date-details">
                  <div className="datetime">
                    <h2>{formattedDate}</h2>
                  </div>
                  <div>
                    
                  <h1>{displayTemperature()}</h1>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="box2">
            {weather && (
              <>
                <div className="icon">
                  {weather.weather && weather.weather[0] && (
                    <>
                      {weather.weather[0].main === "Clear" && <i className="fa fa-sun"></i>}
                      {weather.weather[0].main === "Clouds" && <i className="fas fa-cloud"></i>}
                      {weather.weather[0].main === "Rain" && <i className="fas fa-cloud-rain"></i>}
                      {weather.weather[0].main === "Snow" && <i className="fas fa-snowflake"></i>}
                      {weather.weather[0].main === "Haze" && <i className="fas fa-smog"></i>}
                      {weather.weather[0].main === "Smoke" && <i className="fas fa-smog"></i>}
                    </>
                  )}
                </div>
                <div className="weathermood">
                  <h2>{weather.weather && weather.weather[0] && weather.weather[0].main}</h2>
                  <hr />
                </div>
                <div className="alldetails">
                  <div className="wdetails">
                    <div>
                      <h3>Location</h3>
                    </div>
                    <div>
                      <h3>{weather.name}, {weather.sys.country}</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="wdetails">
                    <div>
                      <h3>Temprature</h3>
                    </div>
                    <div>
                    <h3 onClick={convertTemperature}>{displayTemperature()}</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="wdetails">
                    <div>
                      <h3>Humidity</h3>
                    </div>
                    <div>
                      <h3>{weather.main.humidity}%</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="wdetails">
                    <div>
                      <h3>Pressure</h3>
                    </div>
                    <div>
                      <h3>{weather.main.pressure}</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="wdetails">
                    <div>
                      <h3>Feels like</h3>
                    </div>
                    <div>
                      <h3>{weather.main.feels_like}</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="wdetails">
                    <div>
                      <h3>Sunrise</h3>
                    </div>
                    <div>
                      <h3>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="wdetails">
                    <div>
                      <h3>Sunset</h3>
                    </div>
                    <div>
                      <h3>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</h3>
                    </div>
                  </div>
                  <hr />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;