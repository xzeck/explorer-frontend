import React, { useState } from 'react';
import EditableWindow from '../editable_window/editable_window';
import ReadableWindow from '../readable_window/readable_window';


const CodeEditorLayout = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [dropDownOpt_1, setDropDownOpt_1] = useState('g++');
  const [dropDownOpt_2, setDropDownOpt_2] = useState('clang++');

  const handleApiResponse = (data) => {
    setApiResponse(data);
  };

  const handleDropDownChange = (option, windowNumber) => {
    if (windowNumber === 1) {
      setDropDownOpt_1(option);
    } else if (windowNumber === 2) {
      setDropDownOpt_2(option);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 h-screen bg-dark-background text-white">
      <EditableWindow onApiResponse={handleApiResponse} />
      <ReadableWindow windowNumber={1} selectedOption={dropDownOpt_1} onDropDownChange={handleDropDownChange} apiResponse={apiResponse} />
      <ReadableWindow windowNumber={2} selectedOption={dropDownOpt_2} onDropDownChange={handleDropDownChange} apiResponse={apiResponse} />
    </div>
  );
};

export default CodeEditorLayout;
