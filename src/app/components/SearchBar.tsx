import { useState } from "react";
import { FunnelIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface SearchBarProps {
  onSearch: (query: string, startDate: string, endDate: string, exactMatch: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [exactMatch, setExactMatch] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // Toggle state for filters

  const handleSearch = () => {
    onSearch(query, startDate, endDate, exactMatch);
  };

  return (
    <div className="flex flex-col items-center space-y-4 text-black w-full">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for PDFs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-4 border rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xl text-lg"
      />

      {/* Search Button & Filter Toggle (Now on the Next Line) */}
      <div className="flex space-x-3">
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 text-lg transition-all"
        >
          Search
        </button>

        {/* Filter Toggle - More Visible */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-3 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 text-lg transition-all"
        >
          <FunnelIcon className="w-5 h-5 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Date Filters - Smooth Animation & More Spacing */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showFilters ? "max-h-32 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex space-x-2 w-full max-w-xl">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-3 border rounded-lg shadow w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-3 border rounded-lg shadow w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;