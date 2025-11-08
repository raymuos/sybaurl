import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "../App.css";

function Signup(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const redirectUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupUrl = `${redirectUrl}/user/signup/`;
    
    try {
      const res = await fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error('Something went wrong. Try refreshing.');
      console.log("Created User: " + data);

      navigate("/user/login");

      setEmail('');
      setUsername('');
      setPassword('');
      setError('');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-950 text-white size-full min-h-screen flex justify-center items-center inter ">
      <div className=" min-w-[300px] md:min-w-[450px] lg:min-w-[600px] min-h-screen md:bg-blue-950 p-4 lg:p-8 
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
                    Sign Up
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
                className='bg-gray-700 inter border-0 rounded-lg outline-0 text-lg px-2 py-1 lg:px-4 w-full'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email id"
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

            <button className= {`border-black border-0 rounded-full w-[100px] py-1 text-center
                                bg-gray-50 text-gray-950 hover:bg-cyan-600 hover:text-white
                                outline-0 text-lg font-semibold 
                                transition duration-300 ease-in-out cursor-pointer
                                `}
                                type="submit">
                Sign Up
            </button>
            </form>

            {error && <p className="error">{error}</p>}

        </div>
      </div>
    </div>
  );

}

export default Signup;