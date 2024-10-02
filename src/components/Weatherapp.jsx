import React, { useEffect, useRef, useState } from 'react'
import './Weatherapp.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'


const Weather = () => {
const Icons={
  "01d":clear_icon,
  "01n":clear_icon,
  "02d":cloud_icon,
  "02n":cloud_icon,
  "03d":cloud_icon,
  "03n":cloud_icon,
  "04d":drizzle_icon,
  "04n":drizzle_icon,
  "09d":rain_icon,
  "09n":rain_icon,
  "010d":rain_icon,
  "010n":rain_icon,
  "013d":snow_icon,
  "013n":snow_icon,

}
const [weatherdetail,setweatherdetail]=useState(false)
const inputRef=useRef();


const search=async(city)=>
{
if(city==="")
{
  alert("Enter the city name")
  return;
}

  try {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_ID}`
  const response=await fetch(url);
  const datas=await response.json();
  if(!response.ok)
  {
    alert(datas.message)
    return;
  }
  console.log(datas);
  const icon=Icons[datas.weather[0].icon]||clear_icon
  setweatherdetail({
    humidity:datas.main.humidity,
    temperature:Math.floor(datas.main.temp),
    city:datas.name,
    windspeed:datas.wind.speed,
    icon:icon
  })
  
  }
  catch(error){
  setweatherdetail(false);
  console.error("Error Fetching the weather details")
  }
}

useEffect(()=>{
  search("");
},[]
)

  return (
    <div className='weather'>
      
      <div className='searchbar'>
        <input ref={inputRef} type='text' placeholder='search' />
        <img src={search_icon} onClick={()=>search(inputRef.current.value)} alt=''/>
      </div>

     {weatherdetail?
     <>
       
       <img src={weatherdetail.icon} alt=""className='weather-icon'/>
      <p className='temperature'>{weatherdetail.temperature}</p>
      <p className='location'>{weatherdetail.city}</p>

      <div className='weather-report'>
        <div className='data'>
          <img src={humidity_icon} alt=''/>
          <div>
            <p>{weatherdetail.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='data'>
          <img src={wind_icon} alt=''/>
          <div>
            <p>{weatherdetail.windspeed}Km/hr</p>
            <span>Wind</span>
          </div>
        </div>
      </div>
     </>:<></>}

    </div>
  )
}

export default Weather
