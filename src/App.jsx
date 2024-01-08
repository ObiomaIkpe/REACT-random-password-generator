import { useState, useCallback , useEffect, useRef} from "react"

function App() {
  const [length, setLength] =useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+';

    for(let i = 1; i < length; i++){
     const char =  Math.floor(Math.random() * str.length + 1);
     pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
  }
  return (
    
    
    <div className="w-full max-w-md mx-auto my-8 rounded-lg px-4 py-3 bg-gray-700 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type='text' value={password} ref={passwordRef} className='outline-none w-full py-1 px-3'
        placeholder="password" readOnly /><span className="text-green-800 bg-yellow-700 px-5 py-2"><button
        onClick={copyPasswordToClipBoard} >copy</button></span>
          </div>


      <div className="flex items-center gap-x-2">
      <input type="range" min={6} max={20} value={length}
      className="cursor-pointer" name="range" id="range" 
      onChange={(e) => setLength(e.target.value)}/>
      <label htmlFor="length">Length: {length}</label>



      <input type="checkbox" defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)}
      className="cursor-pointer" name="" id="" 
      />
      <label htmlFor="Number">Number</label>

      <input type="checkbox" defaultChecked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)}
      className="cursor-pointer" name="" id="" 
      />
      <label htmlFor="Character Input">Characters</label>      


      </div>
</div>


  
  )
}

export default App
