import { useEffect, useRef, useState } from "react";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import CurrentWeather from "./Components/CurrentWeather";
import HourlyForecast from "./Components/HourlyForecast";
import WeatherDetails from "./Components/WeatherDetails";
import WeeklyForecast from "./Components/WeeklyForecast";
import SunInfo from "./Components/SunInfo";
import LoadingState from "./Components/LoadingState";
import ErrorMessage from "./Components/ErrorMessage";
import { getWeatherByCity, getWeatherByCoordinates } from "./Services/weatherApi";
import type { WeatherData } from "./Types/weather";
import "./Styles/variables.css";
import "./Styles/global.css";
import "./Styles/responsive.css";
import "./Styles/animations.css";

const FALLBACK_CITY = "London";

type Theme = "light" | "dark";

function App() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dark, setDark] = useState<Theme>(() =>
    localStorage.getItem("weather-theme") === "dark" ? "dark" : "light",
  );
  const lastRequestRef = useRef<() => Promise<WeatherData>>(() => getWeatherByCity(FALLBACK_CITY));

  useEffect(() => {
    document.documentElement.dataset.theme = dark;
    localStorage.setItem("weather-theme", dark);
  }, [dark]);

  const load = async (request: () => Promise<WeatherData>, remember = true) => {
    if (remember) lastRequestRef.current = request;
    setLoading(true);
    setError("");

    try {
      setData(await request());
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load(() => getWeatherByCity(FALLBACK_CITY));
  }, []);

  const refresh = () => {
    void load(lastRequestRef.current, false);
  };

  const search = (city: string) => {
    const value = city.trim();
    if (!value) {
      setError("Please enter a city or place.");
      return;
    }

    void load(() => getWeatherByCity(value));
  };

  const locate = () => {
    if (!navigator.geolocation) {
      setError("Location is not supported by this browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        void load(() =>
          getWeatherByCoordinates(
            position.coords.latitude,
            position.coords.longitude,
          ),
        );
      },
      () => {
        setLoading(false);
        setError("Location permission was not available. Search for a city instead.");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  };

  return (
    <div className="app-shell">
      <Header
        isDark={dark === "dark"}
        onToggleTheme={() => setDark((value) => (value === "dark" ? "light" : "dark"))}
        onLocation={locate}
        onRefresh={refresh}
      />

      <main>
        <div className="intro">
          <div>
            <p className="eyebrow">A CLEARER WAY TO CHECK THE SKY</p>
            <h2>Weather, without the noise.</h2>
          </div>
          <SearchBar onSearch={search} loading={loading} />
        </div>

        {loading && !data ? <LoadingState /> : null}

        {!loading && error && !data ? (
          <ErrorMessage
            message={error}
            onRetry={refresh}
          />
        ) : null}

        {data ? (
          <>
            {error ? (
              <div className="inline-error" role="status">
                <span>{error}</span>
                <button onClick={() => setError("")}>Dismiss</button>
              </div>
            ) : null}

            <CurrentWeather data={data} />
            <HourlyForecast items={data.hourly} />
            <div className="two-column">
              <WeatherDetails current={data.current} />
              <SunInfo
                sunrise={data.current.sunrise}
                sunset={data.current.sunset}
              />
            </div>
            <WeeklyForecast items={data.daily} />
          </>
        ) : null}
      </main>

      <footer>Made for calm mornings, changing skies, and better decisions.</footer>
    </div>
  );
}

export default App;
