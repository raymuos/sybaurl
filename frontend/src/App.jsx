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

      if (!res.ok) {
        throw new Error('Something went wrong. Please check the URL.');
      }

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
    <div className="container">
      <h1>sybaURL</h1>
      <form onSubmit={handleSubmit} className="url-form">
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter a URL to fck"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading' : 'Start'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="result">
          <p>Your fcked URL:</p>
          <div className="short-url-container">
            <a href={`${redirectUrl}/${shortUrl}`} target="_blank" rel="noopener noreferrer">
              {`${redirectUrl}/${shortUrl}`}
            </a>
            <button onClick={handleCopy}>{copyText}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;