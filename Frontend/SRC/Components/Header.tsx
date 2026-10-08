interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onLocation: () => void;
  onRefresh: () => void;
}

export default function Header({ isDark, onToggleTheme, onLocation, onRefresh }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-mark">°</span>
        <div>
          <strong>WEATHER</strong>
          <span>quietly accurate</span>
        </div>
      </div>

      <div className="header-actions">
        <button className="icon-button location-button" onClick={onLocation} aria-label="Use current location">
          ⌖ <span>My location</span>
        </button>
        <button className="icon-button refresh-button" onClick={onRefresh} aria-label="Refresh weather">
          ↻ <span>Refresh</span>
        </button>
        <button className="icon-button" onClick={onToggleTheme} aria-label="Toggle theme">
          {isDark ? "☼" : "◐"}
        </button>
      </div>
    </header>
  );
}
