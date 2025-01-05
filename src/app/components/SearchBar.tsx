import { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string, startDate: string, endDate: string, exactMatch: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [exactMatch, setExactMatch] = useState(false);


  const handleSearch = () => {
    console.log("Search initiated with:", { query, startDate, endDate });

    onSearch(query, startDate, endDate, exactMatch);
  };

  return (
    <div className="flex flex-col items-center space-y-4 text-black">
    <input
      type="text"
      placeholder="Search for PDFs"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="p-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    />
    <div className="flex space-x-2 w-full">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="p-3 border rounded shadow w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="p-3 border rounded shadow w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex items-center space-x-3">
      <button
        onClick={handleSearch}
        className="p-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
        Search
      </button>
      {/* <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={exactMatch}
          onChange={(e) => setExactMatch(e.target.checked)}
          className="w-4 h-4"
        />
        <span>Exact Match</span>
      </label> */}
    </div>
  </div>
  
  );
};

export default SearchBar;
