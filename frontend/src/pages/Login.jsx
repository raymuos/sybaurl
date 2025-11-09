import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "../App.css";

function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const redirectUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUrl = `${redirectUrl}/user/login/`;
    
    try {
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error( data.message || 'Something went wrong. Try refreshing.');
      console.log(data);
      
      navigate("/");

      setUsername('');
      setPassword('');
      setError('');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-950 text-white size-full min-h-screen flex justify-center items-center inter ">
      <div className=" w-[300px] md:w-[450px] lg:w-[600px] min-h-screen md:bg-blue-950 p-4 lg:p-8 
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
                    Login
                </p>
            <input
                className='bg-gray-700 inter border-0 rounded-t-2xl rounded-b-lg outline-0 text-lg px-2 py-1 lg:px-4 w-full'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
            />
            <input
                className='bg-gray-700 inter border-0 rounded-t-lg rounded-b-2xl outline-0 text-lg px-2 py-1 lg:px-4 w-full mb-4'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
            />

            <button className= {`border-black border-0 rounded-lg w-[100px] py-1 text-center
                                bg-gray-50 text-gray-950 hover:bg-cyan-600 hover:text-white
                                outline-0 text-lg font-semibold 
                                transition duration-300 ease-in-out cursor-pointer
                                `}
                                type="submit">
                Login
            </button>
            </form>

            {error && <p className="error">{error}</p>}

        </div>
      </div>
    </div>
  );

}

export default Login;