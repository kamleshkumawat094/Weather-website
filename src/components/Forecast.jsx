import React from "react";
import { useLocation } from "react-router-dom";
import { useWeather } from "../WeatherContext";


const Forecast = () => {
  const { weather, error } = useWeather();
  const now = new Date();


  return (
    <div className="p-[20px] bg-gradient-to-b from-[rgba(40,57,209,0.85)] via-[rgba(68,167,216,0.54)] to-[rgb(64,0,255)] 
backdrop-blur-md pb-[100px] text-black max-w-[450px] mx-auto overflow-y-auto h-[100dvh]">
  
        {error ? (
          <p className="text-black text-2xl mt-10 text-center form-once" style={{animationDelay: "0s", animationDuration:"0.3s"}}
            >{error}</p>
        ) : weather ? (<>
        <div className="flex place-content-between mx-5 my-5 form-once"
         style={{animationDelay: "0s", animationDuration:"0.5s"}}>
        <p className="text-2xl font-bold">Today</p>
        <p className="my-auto text-[14px]">
          {now.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="scroll-container flex overflow-x-auto space-x-1 mt-6 scrollbar cursor-pointer">
        {(() => {
          const hours = [
            ...weather.forecast.forecastday[0].hour,
            ...weather.forecast.forecastday[1].hour,
          ];
          const currentHour = new Date().getHours();
          const next24Hours = hours.slice(currentHour, currentHour + 24);

          return next24Hours.map((hour, i) => (
            <div
              key={i}
            style={{ "--i": i }}
              className="hour-card min-w-[100px] backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-3 text-center"
            >
              <p>{hour.time.split(" ")[1]}</p>
              <img src={hour.condition.icon} alt="icon" className="mx-auto" />
              <p>{hour.temp_c}°C</p>
            </div>
          ));
        })()}
      </div>
      <div className="flex  mt-6 scrollbar flex-col gap-5">
        <p className="text-center text-2xl font-bold form-once"
         style={{animationDelay: "0s", animationDuration:"0.5s"}}>Next Day Report</p>
        {weather.forecast.forecastday.slice(1, 8).map((day, i) => (
          <div key={i} 
          style={{"--i": i}}
          className="flex flex-row border-red-500 cursor-pointer place-content-around backdrop-blur-md bg-white/10 border border-white/20 shadow-lg p-2 rounded-lg text-center forecast-card">
           
           
             <div className="my-auto">
              <p className="text-white text-center">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short", // e.g., "Mon"
                month: "short", // e.g., "Oct"
                day: "numeric", // e.g., "5"
              })}
            </p>
            <p className="text-gray-300">{day.day.avgtemp_c}°C</p>
           
             </div>
              <img src={day.day.condition.icon} className="h-[64px] w-[64px]" />
              <p className="text-sm text-gray-300 my-auto max-w-10">{day.day.condition.text}</p>
          </div>
        ))}
      </div>
        </>) :null}
      
    </div>
  );
};

export default Forecast;
