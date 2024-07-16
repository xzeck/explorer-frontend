import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ReadableWindow = ({ windowNumber, selectedOption, onDropDownChange, apiResponse }) => {
  const [selectedCompilerData, setSelectedCompilerData] = useState([]);

  useEffect(() => {

    if (apiResponse && apiResponse["output"][selectedOption]) {

      setSelectedCompilerData(apiResponse["output"][selectedOption].join("\n"));
    }

  }, [apiResponse, selectedOption]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <select
            className="flex h-10 rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={selectedOption}
            onChange={(e) => onDropDownChange(e.target.value, windowNumber)}
          >
            <option value="g++">g++</option>
            <option value="clang++">clang++</option>
          </select>
        </div>
          <SyntaxHighlighter language="nasm" style={atomDark} wrapLines={true}>
            {selectedCompilerData}
          </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default ReadableWindow;
