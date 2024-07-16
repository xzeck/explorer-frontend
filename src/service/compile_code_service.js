const API_URL = 'http://localhost:6000/compile';

export const compileCode = async (base64Code, functions, compiler, args) => {
  const payload = {
    base_64_code: base64Code,
    functions: functions,
    compilers: compiler,
    args: args === undefined || args === "" ? [""] : args
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
};

export const extractFunctionNames = (codeValue) => {
  const functionRegex = /(?:^|\n|\r)\s*[\w<>_]+\s+([\w<>_]+)\s*\([^)]*\)\s*(?:const)?(?:\s*override)?(?:\s*=.*|;)?/g;
  let matches = [];
  let match;
  while ((match = functionRegex.exec(codeValue)) !== null) {
    matches.push(match[1]);
  }
  return matches;
};
