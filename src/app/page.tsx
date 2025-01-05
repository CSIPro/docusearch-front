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
  const [searchQuery, setSearchQuery] = useState<string>(""); // Added state for search query
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [exactMatch, setExactMatch] = useState<boolean>(false); // Added state for exact match
  const [isLoading, setIsLoading] = useState(false);

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

    console.log("Fetching results for:", { query, startDate, endDate, page, exactMatch });

    try {
      const response = await axios.get("http://127.0.0.1:8000/search", {
        params: {
          query,
          exact_match: exactMatch, // Pass exact_match to the backend
          start_date: startDate || undefined,
          end_date: endDate || undefined,
          page,
          page_size: 10,
        },
      });
      const data = response.data as { results: any[]; total_results: number };

      console.log("API Response:", data);

      setResults(data.results);
      setTotalPages(Math.ceil(data.total_results / 10));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Search Engine</h1>
      <SearchBar
        onSearch={(query, startDate, endDate, exactMatchValue) => {
          console.log("SearchBar passed:", { query, startDate, endDate, exactMatch: exactMatchValue });
          setSearchQuery(query);
          setStartDate(startDate || "");
          setEndDate(endDate || "");
          setExactMatch(exactMatchValue);
          fetchResults(query, startDate, endDate, 1, exactMatchValue);
        }}
      />
      <ResultsList results={results} searchQuery={searchQuery} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) =>
          fetchResults(searchQuery, startDate || "", endDate || "", page, exactMatch)
        }
      />
    </div>
  );
}
