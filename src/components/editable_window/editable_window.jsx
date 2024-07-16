import React, { useState, useEffect } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cpp } from '@codemirror/lang-cpp';
import { extractFunctionNames } from '../../service/compile_code_service';

const EditableWindow = ({ onCodeChange }) => {
  const [code, setCode] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleCodeChange = (editor) => {
    setCode(editor);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(setTimeout(() => {
      const functions = extractFunctionNames(editor);
      const base64Code = btoa(editor);
      onCodeChange(base64Code, functions);
    }, 1250));
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