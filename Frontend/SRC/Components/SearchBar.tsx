import { FormEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value);
  };

  return (
    <form className="search" onSubmit={submit}>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search a city or place"
        aria-label="Search city"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading…" : "Search"}
      </button>
    </form>
  );
}
