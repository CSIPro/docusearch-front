"use client";

import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import Pagination from "./components/Pagination";

export default function Page() {
  const [results, setResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [exactMatch, setExactMatch] = useState<boolean>(false);

  let latestRequestTimestamp = 0;

  const fetchResults = async (
    query: string,
    startDate: string = "",
    endDate: string = "",
    page: number = 1,
    exactMatch: boolean = false
  ) => {
    if (!query && (!startDate || !endDate)) {
      console.error("Search query is required!");
      return;
    }

    const currentTimestamp = Date.now();
    latestRequestTimestamp = currentTimestamp;

    try {
      const response = await axios.get("http://127.0.0.1:8000/search", {
        params: {
          query,
          exact_match: exactMatch,
          start_date: startDate || undefined,
          end_date: endDate || undefined,
          page,
          page_size: 10,
        },
      });
      const data = response.data as { results: any[]; total_results: number };

      if (currentTimestamp >= latestRequestTimestamp) {
        setResults(data.results);
        setTotalPages(Math.ceil(data.total_results / 10));
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  // Function to reset the search
  const resetSearch = () => {
    setSearchQuery("");
    setStartDate(undefined);
    setEndDate(undefined);
    setExactMatch(false);
    setResults([]); // Clears the results
    setCurrentPage(1);
    setTotalPages(1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Search Bar Section */}
      <div className="w-full max-w-3xl text-center">
        <h1 
          onClick={resetSearch} 
          className="text-7xl font-extrabold bg-gradient-to-r from-red-600 via-yellow-400 to-blue-800 bg-clip-text text-transparent mb-6 cursor-pointer transition-all hover:opacity-80"
        >
          DocuSearch
        </h1>
        <SearchBar
          onSearch={(query, startDate, endDate, exactMatchValue) => {
            setSearchQuery(query);
            setStartDate(startDate || "");
            setEndDate(endDate || "");
            setExactMatch(exactMatchValue);
            fetchResults(query, startDate, endDate, 1, exactMatchValue);
          }}
        />
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="w-full max-w-4xl mt-8">
          <ResultsList results={results} searchQuery={searchQuery} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) =>
              fetchResults(searchQuery, startDate || "", endDate || "", page, exactMatch)
            }
          />
        </div>
      )}
    </div>
  );
}