import React, { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000"; // Fetch from env or default

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
  const [selected, setSelected] = useState<string | null>(null);

  if (!results || !results.length) {
    return (
      <p className="text-gray-600 text-center mt-4 px-4">
        No se encontraron resultados para "<span className="font-semibold">{searchQuery}</span>".
      </p>
    );
  }

  return (
    <div className="w-full max-w-4xl px-4">
      <div className={`${selected ? "filter blur-sm" : ""}`}>
        {results.map((result, index) => (
          <div
            key={`${result.file_name}-${index}`}
            className="p-4 sm:p-5 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-all mb-4 cursor-pointer"
            onClick={() => setSelected(`${BASE_URL}/view/${result.file_name}`)}
          >
            {/* File Name */}
            <h2 className="font-semibold text-base sm:text-lg text-gray-900">{result.file_name}</h2>

            {/* Snippet */}
            <p className="text-gray-700 text-sm mt-2 leading-relaxed">
              {highlightTerms(result.snippet, searchQuery)}...
            </p>

            {/* Download Link */}
            <div className="mt-3">
              <a
                href={`${BASE_URL}/download/${result.file_name}`}
                download
                className="text-blue-600 hover:text-blue-700 font-medium transition-all text-sm sm:text-base"
              >
                ⬇ Descargar PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de vista previa del PDF */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl sm:max-w-5xl h-[85vh] sm:h-[90vh] overflow-hidden relative flex flex-col">
            {/* Botón de Cerrar */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl sm:text-3xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Cerrar vista previa"
            >
              &times;
            </button>

            {/* Encabezado */}
            <div className="p-3 sm:p-4 border-b bg-gray-100 flex justify-between items-center">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-800">Vista previa del documento</h3>
            </div>

            {/* Contenedor del PDF */}
            <div className="flex-1 bg-gray-50">
              <iframe src={selected} className="w-full h-full border-none" />
            </div>

            {/* Pie de Página con Botón de Descarga */}
            <div className="p-3 sm:p-4 border-t bg-gray-100 flex flex-col sm:flex-row justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                Si tienes problemas, intenta descargar el archivo.
              </span>
              <a
                href={selected.replace('/view/', '/download/')}
                download
                className="mt-2 sm:mt-0 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
              >
                ⬇ Descargar PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsList;