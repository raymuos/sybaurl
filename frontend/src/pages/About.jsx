import "../App.css";

function About(){

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
            <div className=" flex flex-col gap-1 items-center">
                <p className="text-4xl text-gray-200 font-light strider ">
                    About
                </p>

                <p className="text-wrap max-w-[500px]">
                    This is a website that creates redirecting links to your original URL. Signup and login 
                    to track the links that you generated and number of visits of the respective links!
                </p>

            </div>
        </div>
      </div>
    </div>
  );

}

export default About;