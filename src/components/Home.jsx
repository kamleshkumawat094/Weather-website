import { useNavigate } from "react-router-dom";
import Forecast from "./Forecast";
import { useWeather } from "../WeatherContext";
import { motion } from "framer-motion";

const home = () => {
  const { weather, city, error } = useWeather();
  const navigate = useNavigate();
  console.log(weather);
  const now = new Date();
  const weatherImages = {
    1030: "/cloud.png",
  };

  return (
    <div className="max-w-[450px] bg-gradient-to-b from-[rgba(40,57,209,0.85)] via-[rgba(68,167,216,0.54)] to-[rgb(64,0,255)] backdrop-blur-md h-[100dvh] overflow-y-auto mx-auto pb-[120px]">
      <div
        className="text-black text-center pt-5 "
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error ? (
          <motion.p
            className="text-red-500 text-2xl mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        ) : weather ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="text-2xl font-bold pb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {city}
            </motion.p>
            <p>
              {now.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>

            <div className="flex flex-row gap-5 justify-center mt-5">
              <p className="font-medium  rounded-lg py-2 px-4 bg-white/10 shadow-lg p-3 text-center">Forecast</p>
              <p className="font-medium rounded-lg py-2 px-4 bg-white/10 shadow-lg p-3 text-center">Tempreture</p>
            </div>

            <div className="px-5">
              <motion.img
                src={
                  weatherImages[weather.current.condition.code] ||
                  weather.current.condition.icon
                }
                alt="Weather"
                className="w-40 h-40 mx-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="flex place-content-around mx-5 mt-9 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p>
                  Temp <br />
                  <span className="text-lg font-bold">
                    {weather.current.temp_c}°
                  </span>
                </p>
                <p>
                  Humidity <br />
                  <span className="text-lg font-bold">
                    {weather.current.humidity}%
                  </span>
                </p>
                <p>
                  Wind <br />
                  <span className="text-lg font-bold">
                    {weather.current.wind_kph}Km/h
                  </span>
                </p>
              </motion.div>
              <div className="flex place-content-between mx-5 my-10 ">
                <p className="text-2xl font-bold">Today</p>
                <p
                  className="my-auto cursor-pointer underline"
                  onClick={() => navigate("/Forecast")}
                >
                  View full Report
                </p>
              </div>

              <div className="flex overflow-x-auto space-x-2 mt-6 scrollbar cursor-pointer">
                {(() => {
                  const hours = [
                    ...weather.forecast.forecastday[0].hour,
                    ...weather.forecast.forecastday[1].hour,
                  ];
                  const currentHour = new Date().getHours();
                  const next24Hours = hours.slice(
                    currentHour,
                    currentHour + 24
                  );

                  return next24Hours.map((hour, i) => (
                    <motion.div
                      custom={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: i * 0.05,
                          duration: 0.4,
                          ease: "easeOut",
                        },
                      }}
                      key={i}
                      className="min-w-[100px] bg-white/10 border border-white/20 rounded-xl shadow-lg p-3 text-center"
                    >
                      <p className="text-medium">{hour.time.split(" ")[1]}</p>
                      <img
                        src={hour.condition.icon}
                        alt="icon"
                        className="mx-auto"
                      />
                      <p className="font-semibold">{hour.temp_c}°C</p>
                    </motion.div>
                  ));
                })()}
              </div>
              <div></div>
            </div>
          </motion.div>
        ) : (
          <motion.p
            className="text-white mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default home;
