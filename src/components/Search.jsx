import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeather } from "../WeatherContext";
import { AiOutlineSearch } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";

const Search = () => {
  const [search, setSearch] = useState("");
  const { setCity } = useWeather();
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
   const API_KEY = import.meta.env.VITE_WEATHER_KEY;


  const handleKey = (e) => {
    if(e.key === "Enter"){
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    if (search.trim() !== "") {
      setCity(search.trim());
      localStorage.setItem("selectedCity", search.trim()); 
      navigate("/");
    }
  };

  const handleChange =  async(e) => {
    const value = e.target.value;
    setSearch(value)
  if (value.length > 1) {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${value}`
        );
        const data = await res.json();
        setSuggestions(data);
        console.log(data);
      } catch (err) {
        console.log("Error in suggestion:", err);
      }
    } else {
      setSuggestions([]);
    }
  };
    
      

const handleSuggestionClick = (cityName) => {
  setSearch(cityName);
  setSuggestions([]);
  setCity(cityName);
  localStorage.setItem("selectedCity", cityName);
  navigate("/");
};




  return (
   <div className="relative max-w-[450px] mx-auto ">
     <div className=" text-2xl text-black p-[20px] pt-7 bg-gradient-to-b from-[rgba(40,57,209,0.85)] via-[rgba(68,167,216,0.54)] to-[rgb(64,0,255)] backdrop-blur-md h-[100dvh]   flex place-content-between">
      <input
        type="search"
        value={search}
        placeholder="Search City"
        onKeyDown={handleKey}
        onChange={handleChange}
        className="form-once border border-white/20 rounded-3xl shadow-lg bg-white/10  placeholder-gray-700 text-black focus:bg-white/20 focus:outline-none h-9 max-w-[85%] p-4 placeholder:text-gray"
      />
      <button className=" text-white h-9 form-once" onClick={handleSubmit}>
        <AiOutlineSearch size={33}/>
      </button>
      
    </div>
     
    {suggestions.length >0 && (
      <ul className="suggestions-list absolute top-20 bg-amber-50 mx-auto right-5 left-5 rounded-xl p-2"
   >
        {suggestions.slice(0,10).map((s,i) => (
          <li key={i} style={{ "--i": i }} onClick={() => handleSuggestionClick(s.name)}
          className="suggestion-item" 
         
                transition={{ delay: i * 0.03 }}>{s.name} , {s.region}, {s.country} <hr  className="text-black h-1 mt-2"/></li>
          
        ))}
      </ul>
    )} 
   </div>
  );
};

export default Search;
