import React, { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(
    localStorage.getItem("selectedCity") || "India"
  );
  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=8&aqi=no&alerts=no`
        );
        if (!resp.ok) {
          const errorData = await resp.json();
          const message =
            errorData?.error?.message || "Failed to fetch weather data.";
          throw new Error(message);
        }
        const data = await resp.json();
        setWeather(data);
        localStorage.setItem("selectedCity", city);
        setError(null);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(err.message || "something is wrong");
      }
    };
    fetchData();
  }, [city]);

  return (
    <WeatherContext.Provider value={{ weather, city, setCity, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
