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
  if (!text || !query) return text;

  const terms = query.split(" ").filter(Boolean);
  const regex = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        terms.some((term) => part.toLowerCase() === term.toLowerCase()) ? (
          <mark key={index} className="bg-yellow-300 px-1 rounded">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const ResultsList: React.FC<ResultsListProps> = ({ results, searchQuery }) => {
  if (!results || !results.length) {
    return (
      <p className="text-gray-600 text-center mt-4">
        No results found for "<span className="font-semibold">{searchQuery}</span>".
      </p>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      {results.map((result, index) => (
        <div
          key={`${result.file_name}-${index}`}
          className="p-5 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-all mb-4"
        >
          {/* File Name */}
          <h2 className="font-semibold text-lg text-gray-900">{result.file_name}</h2>

          {/* Snippet */}
          <p className="text-gray-700 text-sm mt-2 leading-relaxed">
            {highlightTerms(result.snippet, searchQuery)}...
          </p>

          {/* Download Link */}
          <div className="mt-3">
            <a
              href={`http://127.0.0.1:8000/download/${result.file_name}`}
              download
              className="text-blue-600 hover:text-blue-700 font-medium transition-all"
            >
              ⬇ Download PDF
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;