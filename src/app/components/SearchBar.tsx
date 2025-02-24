import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/solid";

interface SearchBarProps {
  onSearch: (query: string, startDate: string, endDate: string, exactMatch: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [actType, setActType] = useState("");
  const [department, setDepartment] = useState("");

  const handleSearch = () => {
    onSearch(query, startDate, endDate, false);
  };

  return (
    <div className="flex flex-col items-center space-y-4 text-black w-full px-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Buscar PDFs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="p-3 border rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-2xl text-base"
      />

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
            <option value="">Seleccione un departamento</option>
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
            <option value="">Seleccione un tipo de acta</option>
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