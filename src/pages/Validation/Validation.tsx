import React, { useState } from 'react';
import Home from '../../assets/img/home.jpg'

export default function Validation (){
    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
        setError(null); // Réinitialiser l'erreur lors de la saisie
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code === '') {
            setError('Please enter the verification code.');
        } else {
            alert('Code verified!');
            // Ici, vous pouvez ajouter la logique pour vérifier le code
        }
    };
  return (
    <div className="flex h-screen bg-gray-300">
        <div className='bg-white px-12   w-96  flex'>
        <div className=' w-full m-auto '>
      <h1 className="text-2xl font-semibold mb-4">Verification Code</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="code">
                        Enter your verification code:
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-gray-900 transition"
                >
                    Verify Code
                </button>
                <div className='text-center mt-5'>
              <span className='text-[0.9rem]'>
                already have an account ,
                <a className='text-orange-700' href='/login'>
                  signin
                </a>
              </span>


            </div>
            </form>
            </div>
            </div>
        <div className=' flex-1 flex items-center h-full overflow-hidden'>
<img src={Home} className='object-contain min-w-full'/>
      </div>

    </div>
  )}