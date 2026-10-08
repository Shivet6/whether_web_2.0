import type { WeatherData } from "../Types/weather";

export default function CurrentWeather({ data }: { data: WeatherData }) {
  const c = data.current;

  return (
    <section className="hero-weather">
      <div className="hero-copy">
        <p className="eyebrow">CURRENT CONDITIONS</p>
        <h1>{data.location.name}</h1>
        <p className="country">{data.location.region ? `${data.location.region}, ` : ""}{data.location.country}</p>

        <div className="temperature">
          <span>{Math.round(c.temperature)}°</span>
          <div>
            <strong>{c.condition}</strong>
            <small>Feels like {Math.round(c.feelsLike)}°</small>
            <small className="high-low">H {Math.round(c.highTemperature)}° · L {Math.round(c.lowTemperature)}°</small>
          </div>
        </div>

        <p className="description">{c.description}</p>
      </div>

      <div className="weather-orb">
        <div className="sun-symbol">{c.icon}</div>
        <span>LIVE</span>
      </div>
    </section>
  );
}
