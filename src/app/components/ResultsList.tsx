interface Result {
  file_name: string;
  file_path: string;
  snippet: string;
}

interface ResultsListProps {
  results: Result[];
  searchQuery: string;
}

const highlightTerms = (text: string, query: string) => {
  if (!text || !query) return text; // Return original text if invalid input

  const terms = query.split(" ").filter(Boolean); // Split query into words and filter out empty terms
  const regex = new RegExp(`(${terms.join("|")})`, "gi"); // Build regex for all terms
  const parts = text.split(regex); // Split the text using the regex

  return (
    <>
      {parts.map((part, index) =>
        terms.some((term) => part.toLowerCase() === term.toLowerCase()) ? (
          <mark key={index} className="bg-yellow-200">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};


const ResultsList: React.FC<ResultsListProps> = ({ results, searchQuery }) => {
  // Split the search query into individual terms
  const terms = searchQuery.split(" ").filter((term) => term);

  console.log("Search Query:", searchQuery);
  console.log("Results Length:", results.length);

  if (!results || !results.length) {
    console.log("No results found");
    return <p>No results found.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4">
    {results.map((result) => (
      <li key={result.file_name} className="p-4 border rounded shadow hover:shadow-lg">
        <h2 className="font-bold text-lg">{result.file_name}</h2>
        <p className="text-sm text-gray-600">
          {highlightTerms(result.snippet, searchQuery)}...
        </p>
        <a
          href={`http://127.0.0.1:8000/download/${result.file_name}`}
          download
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Download
        </a>
      </li>
    ))}
  </ul>
  );
};

export default ResultsList;
