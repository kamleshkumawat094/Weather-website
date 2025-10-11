import { useNavigate } from "react-router-dom";
import { useWeather } from "../WeatherContext";
import { FaSpinner } from "react-icons/fa";

const Home = () => {
  const { weather, city, error } = useWeather();
  const navigate = useNavigate();
  console.log(weather);
  const now = new Date();
  const weatherImages = {
    1030: "/cloud.png",
  };

  return (
    <div className="max-w-[450px] bg-gradient-to-b from-[rgba(40,57,209,0.85)] via-[rgba(68,167,216,0.54)] to-[rgb(64,0,255)] backdrop-blur-md h-[100dvh] overflow-y-auto mx-auto pb-[120px]">
      <div className="text-black text-center pt-5 ">
        {error ? (
          <p
            className="text-red-500 text-2xl mt-10 form-once"
            style={{ animationDelay: "0s" }}
          >
            {error}
          </p>
        ) : weather ? (
          <div className="scale-fade">
            <p
              className="text-2xl font-bold pb-2 form-once"
              style={{ animationDelay: "0s" }}
            >
              {city}
            </p>
            <p>
              {now.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>

            <div className="flex flex-row gap-5 justify-center mt-5">
              <p className="font-medium  rounded-lg py-2 px-4 bg-white/10 shadow-lg p-3 text-center">
                Forecast
              </p>
              <p className="font-medium rounded-lg py-2 px-4 bg-white/10 shadow-lg p-3 text-center">
                Tempreture
              </p>
            </div>

            <div className="px-5">
              <img
                src={
                  weatherImages[weather.current.condition.code] ||
                  weather.current.condition.icon
                }
                alt="Weather"
                className="w-40 h-40 mx-auto scale-in"
              />
              <div
                className="flex place-content-around mx-5 mt-9 text-sm input-once"
                style={{ animationDuration: "0.5s" }}
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
              </div>
              <div className="flex place-content-between mx-5 my-10 ">
                <p className="text-2xl font-bold">Today</p>
                <p
                  className="my-auto cursor-pointer underline"
                  onClick={() => navigate("/Forecast")}
                >
                  View full Report
                </p>
              </div>

              <div className=" scroll-container flex overflow-x-auto space-x-2 mt-6 scrollbar cursor-pointer">
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
                    <div
                      style={{ "--i": i }}
                      key={i}
                      className="hour-card min-w-[100px] bg-white/10 border border-white/20 rounded-xl shadow-lg p-3 text-center"
                    >
                      <p className="text-medium">{hour.time.split(" ")[1]}</p>
                      <img
                        src={hour.condition.icon}
                        alt="icon"
                        className="mx-auto"
                      />
                      <p className="font-semibold">{hour.temp_c}°C</p>
                    </div>
                  ));
                })()}
              </div>
              <div></div>
            </div>
          </div>
        ) : (
          <p className="text-white mt-10 flex items-center justify-center">
            <FaSpinner className="animate-spin text-3xl mr-2" />
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
