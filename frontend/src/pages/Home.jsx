import { useState } from "react";
import "../App.css";

function Home() {
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
    <div className="bg-gray-950 text-white size-full min-h-full flex justify-center items-center inter">
      <div className=" w-full md:w-[450px] lg:w-[600px] min-h-screen md:bg-blue-950 p-4 lg:p-8 
                       flex items-center flex-col justify-center md:flex-row">
        <div className="shrink-0 md:w-[150px] flex justify-center items-center flex-1/4">
          <p className="text-7xl text-yellow-500 font-light strider 
                        inline-block whitespace-nowrap md:-rotate-90 origin-center">
            sybaURL
          </p>
        </div>
        
        <div className=" flex-3/4 ">
            <form onSubmit={handleSubmit} className=" flex flex-col gap-1 items-center">
              <p className="text-4xl text-gray-200 font-light strider ">
                    Shorten your URL
              </p>
            <input
                className='bg-gray-700 border-0 rounded-lg outline-0 text-lg px-2 py-1 lg:px-4 w-full mb-2 inter'
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Enter a URL"
                required
            />
            <button className= {`border-black border-0 rounded-lg w-[100px] py-1 text-center
                                ${isLoading? 
                                'bg-cyan-600 text-gray-50' :
                                'bg-gray-50 text-gray-950 hover:bg-cyan-600 hover:text-gray-50'}
                                outline-0 text-lg font-semibold 
                                transition duration-300 ease-in-out cursor-pointer
                                `}
                                type="submit" disabled={isLoading}>
                {isLoading ? 'Loading' : 'Start'}
            </button>
            </form>

            {error && <p className="error">{error}</p>}

            {shortUrl && (
            <div className="mt-4 text-lg w-full">
                <p className="text-2xl font-stretch-100% strider">Your short URL: (Click on the link)</p>
                <div className="border-0 px-4 rounded-xl bg-cyan-700 p-2 flex flex-col gap-2 text-base">
                <a href={`${redirectUrl}/${shortUrl}`} className="hover:underline underline-offset-2 inter font-semibold" target="_blank" rel="noopener noreferrer">
                    {`${redirectUrl}/${shortUrl}`}
                </a>
                <button
                className='border-0 rounded-full w-[100px] text-center self-end
                            outline-0 text-lg font-semibold py-1
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
    </div>
  );
}

export default Home;