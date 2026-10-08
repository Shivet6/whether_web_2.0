import type { HourlyForecastItem } from "../Types/weather";

export default function HourlyForecast({ items }: { items: HourlyForecastItem[] }) {
  return (
    <section className="section">
      <div className="section-title">
        <div>
          <p className="eyebrow">NEXT 24 HOURS</p>
          <h2>Hourly forecast</h2>
        </div>
      </div>

      <div className="hourly-scroll">
        {items.map((item, i) => (
          <div className={`hour ${i === 0 ? "active" : ""}`} key={item.time + i}>
            <span>{i === 0 ? "Now" : new Date(item.time).toLocaleTimeString([], { hour: "numeric" })}</span>
            <b>{item.icon}</b>
            <strong>{Math.round(item.temperature)}°</strong>
            <small className="hour-condition">{item.condition}</small>
            {item.precipitationChance !== undefined && <small>{item.precipitationChance}% rain</small>}
          </div>
        ))}
      </div>
    </section>
  );
}
