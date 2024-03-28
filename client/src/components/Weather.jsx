import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faSun, faCloud, faCloudSun, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = '7b831cf5f0b3942082992d4277443742';

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          throw new Error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error(error);
            setIsLoading(false);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setIsLoading(false);
      }
    };
  
    getLocation();
  

    return () => {
      setWeatherData(null); 
    };
  }, [apiKey]);
  
  const getCurrentTimePlus3 = () => {
    const currentTime = new Date().getTime();
    const timePlus3 = new Date(currentTime + (3 * 60 * 60 * 1000)/2); 
    return timePlus3.getTime() / 1000; 
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!weatherData) {
    return <div>Failed to fetch weather data.</div>;
  }
  

  const forecastData = weatherData && weatherData.list ? weatherData.list.filter((item) => item.dt >= getCurrentTimePlus3() && item.dt < getCurrentTimePlus3() + (12 * 60 * 60)) : [];
  

  return (
    <div className="bg-white p-2 rounded-md shadow-md text-center">
      <h2 className="text-lg font-semibold mb-2">{weatherData && weatherData.city ? weatherData.city.name : 'Unknown City'}</h2>
      <hr className="mb-2" />
      <div className="flex justify-center items-center my-2">
        {/* Show icon, real-time temperature, and indicate it's the current temperature */}
        {weatherData && forecastData.length > 0 && (
          <div className="mx-2 bg-white p-4 rounded-md flex items-center">
            <div className="mr-2">
              <FontAwesomeIcon icon={getWeatherIcon(forecastData[0].weather[0].icon)} size="3x" style={{ color: getWeatherColor(forecastData[0].weather[0].icon) }} />
            </div>
            <div>
              <p className="text-gray-700 mb-1">Now</p>
              <p className="text-gray-700 mb-1">{formatTemperature(forecastData[0].main.temp)}°C</p>
            </div>
          </div>
        )}
      </div>
      <hr className="mb-2" />
      <div className="flex justify-center items-center my-2">
        {/* Forecast items */}
        {forecastData.map((item, index) => (
          <div key={index} className="mx-2 bg-white p-4 rounded-md">
            <p className="text-gray-700">{formatTime(item.dt)}</p>
            <FontAwesomeIcon icon={getWeatherIcon(item.weather[0].icon)} size="3x" style={{ color: getWeatherColor(item.weather[0].icon) }} />
            <p className="text-gray-700 mb-1">{formatTemperature(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

// Helper function to map weather icon
const getWeatherIcon = (iconCode) => {
  switch (iconCode) {
    case '01d':
    case '01n':
      return faSun;
    case '02d':
    case '02n':
      return faCloudSun;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
    case '50d':
    case '50n':
      return faCloud;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return faCloudRain;
    case '11d':
    case '11n':
      return faCloudRain;
    case '13d':
    case '13n':
      return faSnowflake;
    default:
      return faSun;
  }
};

// Helper function to map weather color
const getWeatherColor = (iconCode) => {
  switch (iconCode) {
    case '01d':
    case '01n':
      return '#F8D249';
    case '02d':
    case '02n':
      return '#F9A825';
    case '03d':
    case '03n':
    case '04d':
    case '04n':
    case '50d':
    case '50n':
      return '#D5DBDB';
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return '#82B1FF';
    case '11d':
    case '11n':
      return '#81C784';
    case '13d':
    case '13n':
      return '#E0E0E0';
    default:
      return '#333333';
  }
};

// Helper function to format temperature
const formatTemperature = (temperature) => {
  return Math.round(temperature);
};

// Helper function to format time
const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

export default Weather;
