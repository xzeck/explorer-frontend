import React, { useState, useEffect } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cpp } from '@codemirror/lang-cpp';

const EditableWindow = ({ onApiResponse, selectedOption }) => {
  const [code, setCode] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleCodeChange = (editor, data, value) => {
    setCode(editor);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(setTimeout(() => {
      callApi(editor);
    }, 1250));
  };

  const callApi = (codeValue) => {
    const functions = extractFunctionNames(codeValue);
    const base64Code = btoa(codeValue);
    const payload = {
      base_64_code: base64Code,
      functions: functions,
      compilers: selectedOption
    };

    fetch('http://localhost:6000/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        onApiResponse(data); // Pass API response to parent component
        console.log(data);
      })
      .catch(error => {
        console.error('Error calling API:', error);
      });
  };

  const extractFunctionNames = (codeValue) => {
    const functionRegex = /(?:^|\n|\r)\s*[\w<>_]+\s+([\w<>_]+)\s*\([^)]*\)\s*(?:const)?(?:\s*override)?(?:\s*=.*|;)?/g;
    let matches = [];
    let match;
    while ((match = functionRegex.exec(codeValue)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <CodeMirror
      value={code}
      onChange={handleCodeChange}
      theme={vscodeDark}
      extensions={[cpp()]}
      height='100%'
      minHeight='100%'
      
    />
  );
};

export default EditableWindow;
