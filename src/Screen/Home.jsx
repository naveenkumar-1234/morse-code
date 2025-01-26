import { useState } from 'react';

const Home = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('encode');
  const [result, setResult] = useState('');

  const encodeFetch = async () =>{
   try{
    const reponse = await fetch('http://localhost:8080/api/v1/morse/encode',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({"text":text})
    })
    if(reponse.ok) {
        const data = await reponse.json();
        setResult(data.text);
    }else{
        alert("error in server side")
    }
   }catch(e){
    console.error(e);
   }
  }

  const decodeFetch = async () =>{
    try{
     const reponse = await fetch('http://localhost:8080/api/v1/morse/decode',{
         method:"POST",
         headers:{'Content-Type':'application/json'},
         body: JSON.stringify({"text":text})
     })
     if(reponse.ok) {
         const data = await reponse.json();
         setResult(data.text);
     }else{
         alert("error in server side")
     }
    }catch(e){
     console.error(e);
    }
   }
  const handleClick = (e) =>{
    e.preventDefault();
    if(mode === "encode") encodeFetch();
    else decodeFetch();
    console.log("clicked")
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-4">Morse Code Generator</h2>

        <textarea
          className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-lg"
          placeholder="Enter text here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="encode"
                checked={mode === 'encode'}
                onChange={() => setMode('encode')}
                className="mr-2"
              />
              Encode
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="decode"
                checked={mode === 'decode'}
                onChange={() => setMode('decode')}
                className="mr-2"
              />
              Decode
            </label>
          </div>
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full sm:w-auto"
            onClick={handleClick}
          >
            Enter
          </button>
        </div>

        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg border-2 border-gray-300">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Result</h3>
            <p className="text-gray-700">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
