import { useState } from 'react';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copyText, setCopyText] = useState('Copy');
  const redirectUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShortUrl('');
    setCopyText('Copy');

    const backendUrl = `${redirectUrl}/url/`;
    
    try {
      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalUrl }),
      });
      if (!res.ok) throw new Error('Something went wrong. Please check the URL.');

      const data = await res.json();
      setShortUrl(data.shortId); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${redirectUrl}/${shortUrl}`);
    setCopyText('Copied!');
  };

  return (
    <div className="border-2 size-full min-h-screen flex justify-center items-center">
      <div className="border-2 min-w-[300px] bg-green-500 p-4 lg:p-8">
        <p className=' text-4xl text-center mb-8 font-light strider'>sybaURL</p>
        <form onSubmit={handleSubmit} className=" flex flex-col md:flex-row gap-1 items-center">
          <input
            className='bg-white border-2 outline-0 text-lg px-2 lg:px-4 w-full md:w-fit '
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter a URL to fck"
            required
          />
          <button className= {`border-2 border-black w-full md:w-[100px] text-center
                             ${isLoading? 
                              'bg-black text-white' :
                              'bg-white text-black hover:bg-black hover:text-white'}
                             outline-0 text-lg font-semibold 
                             transition duration-300 ease-in-out cursor-pointer
                             `}
                             type="submit" disabled={isLoading}>
            {isLoading ? 'LOADING' : 'START'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {shortUrl && (
          <div className="mt-4 text-lg w-full">
            <p>Your fcked URL:</p>
            <div className="border-2 border-black bg-amber-200 p-2 flex-col">
              <a href={`${redirectUrl}/${shortUrl}`} target="_blank" rel="noopener noreferrer">
                {`${redirectUrl}/${shortUrl}`}
              </a>
              <button
              className='border-2 border-black w-full text-center
                         outline-0 text-lg font-semibold 
                         transition duration-300 ease-in-out cursor-pointer
                         bg-white text-black hover:bg-black hover:text-white
                         '
              onClick={handleCopy}>
                {copyText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;