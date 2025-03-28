import { useState } from "react";
import axios from "axios";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { BASE_URL } from "@/utils/constants";

interface SearchBarProps {
  onSearch: (query: string, startDate: string, endDate: string, exactMatch: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [actType, setActType] = useState("");
  const [department, setDepartment] = useState("");

  // Function to Fetch Auto-Complete Suggestions
  const fetchSuggestions = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get<{ suggestions: string[] }>(`${BASE_URL}/autocomplete`, {
        params: { query: input },
      });
      setSuggestions(response.data.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearch = () => {
    onSearch(query, startDate, endDate, false);
    setShowSuggestions(false); // Hide suggestions when searching
  };

  return (
    <div className="flex flex-col items-center space-y-4 text-black w-full px-4 relative">
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          placeholder="Buscar PDFs"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide suggestions when user clicks outside
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="p-3 border rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base"
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white shadow-md rounded-lg mt-1 border">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setQuery(suggestion);
                  setShowSuggestions(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex flex-wrap justify-center gap-3 w-full">
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 text-base transition-all"
        >
          Buscar
        </button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-3 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 text-base transition-all"
        >
          <FunnelIcon className="w-5 h-5 mr-2" />
          {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
        </button>
      </div>

      {/* Filters */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showFilters ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-3 border rounded-lg shadow w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-3 border rounded-lg shadow w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Select Filters */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="p-3 border rounded-lg shadow w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Departamento</option>
            <option value="ventas">Ventas</option>
            <option value="finanzas">Finanzas</option>
            <option value="recursos-humanos">Recursos Humanos</option>
            <option value="tecnologia">Tecnología</option>
          </select>

          <select
            value={actType}
            onChange={(e) => setActType(e.target.value)}
            className="p-3 border rounded-lg shadow w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Tipo</option>
            <option value="reunion">Reunión</option>
            <option value="acuerdo">Acuerdo</option>
            <option value="decision">Decisión</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;