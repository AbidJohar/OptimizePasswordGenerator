import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  let letter = "sdfadfpoiuwerhnc";
  console.log(Math.floor(Math.random() * letter.length));

  const [length, setLength] = useState(8);
  const [numCheckBox, setNumCheckBox] = useState(false);
  const [charCheckBox, setCharCheckBox] = useState(false);
  const [password, setPassword] = useState("fhgsfdhsdfhsdhshdsfseryweywerywerter");
  const passwordRef = useRef();
  const passwordGenerator = useCallback(() => {

    let pass = ""
    let letter = "ABCDEFGHIGKLMINOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numCheckBox) letter += "0123456789";
    if (charCheckBox) letter += "%$#@!&*(){}[]";

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * letter.length);
      pass += letter.charAt(randomIndex);

    }
    setPassword(pass);
  }, [length, numCheckBox, charCheckBox, setPassword]);

  const copytoClipboard = ()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    passwordGenerator();
  }, [length, numCheckBox, charCheckBox, passwordGenerator])

  return (
    <>
      <div className="w-screen h-screen bg-white flex justify-center items-start">
        <div className="w-1/2 bg-transparent shadow-xl border border-1 border-black rounded-lg p-5 mt-10 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-black mb-5 text-center"> <span className='text-blue-700'>Password</span> Generator</h2>
          <div className="flex w-full items-center">
            <input
              type="text"
              placeholder="Password"
              value={password}
              ref={passwordRef}
              className="outline-none border border-1 border-black w-full px-3 py-2 rounded-l-md"
            />
            <button 
            onClick={copytoClipboard}
            className="text-white hover:bg-blue-900 font-bold bg-blue-700 px-4 py-2 rounded-r-md focus:outline-none">copy</button>
          </div>
          <div className='w-full flex flex-row mt-3 justify-start gap-x-3 '>
            <div className=' flex justify-center align-center gap-x-2'>
              <input
                type="range"
                min={8}
                max={50}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                className=' bg-blue-600 cursor-pointer'
              />
              <label className='text-black font-bold w-24' htmlFor="length">Length : {length}</label>

            </div>

            <div className=' flex justify-center align-center gap-x-2 '>
              <input
                type="checkbox"
                defaultChecked={numCheckBox}
                onChange={() => {
                  setNumCheckBox((prev) => !prev);
                }}
                className=' cursor-pointer'
              />
              <label className='text-black font-bold' htmlFor="length">Numbers</label>

            </div>
            <div className=' flex justify-center align-center gap-x-2 '>
              <input
                type="checkbox"
                defaultChecked={charCheckBox}
                onChange={() => {
                  setCharCheckBox((prev) => !prev)
                }}
                className='checkbox cursor-pointer '
              />
              <label className='text-black font-bold' htmlFor="length">Charactor</label>

            </div>

          </div>
          <button
              className='mt-4 px-3  font-bold hover:bg-blue-900 focus:outline-none py-1.5 bg-blue-700 text-white rounded-md shadow-md'
              onClick={() => {
                passwordGenerator();
              }}
              >Change Password</button>
        </div>
      </div>
    </>
  )
}

export default App
