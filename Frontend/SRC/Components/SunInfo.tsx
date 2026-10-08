interface SunInfoProps {
  sunrise: string;
  sunset: string;
}

export default function SunInfo({ sunrise, sunset }: SunInfoProps) {
  const formatSunTime = (value: string): string => {
    return value;
  };

  return (
    <section className="sun-card">
      <div>
        <p className="eyebrow">DAYLIGHT</p>
        <h2>Sun cycle</h2>
      </div>

      <div className="sun-times">
        <div>
          <span>Sunrise</span>
          <strong>↗ {formatSunTime(sunrise)}</strong>
        </div>

        <div>
          <span>Sunset</span>
          <strong>↘ {formatSunTime(sunset)}</strong>
        </div>
      </div>
    </section>
  );
}