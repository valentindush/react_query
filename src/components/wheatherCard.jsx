import React from 'react'

export const WeatherCard = ({item}) => {
  return (
    <div className='w-[300px] h-[250px] border border-gray-500 border-opacity-30 rounded-lg shadow-lg'>
      <img src={item.weather.icon} className='w-[100px] h-[100px] mx-auto mt-3' alt="" />

      <div className="mt-3 p-3">
        <p className="text-gray-300 ">Location: {`${item.location.name} ${item.location.region}, ${item.location.country}`}</p>
        <p className="text-gray-300 ">Temperature: {`${item.weather.temperature}`} &deg;C</p>
        <p className="text-gray-300 ">Humidity: {`${item.weather.humidity}`}</p>
      </div>
    </div>
  )
}
