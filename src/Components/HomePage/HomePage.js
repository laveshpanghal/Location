import React from "react";
import { Link } from "react-router-dom";
import Collector from "../../Images/collector.svg";

const HomePage = ({}) => {
  return (
    <header className="bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:py-16">
        <div className="flex items-end flex-wrap-reverse md:flex-nowrap justify-center leading-8">
          <div className="w-full md:w-1/2 mt-6 mb-10">
            <div className="max-w-lg">
              <h1 className="text-gray-800 dark:text-white text-2xl font-bold uppercase md:text-3xl">
                Best Place To Get To Know About NearBy Event.
              </h1>
              <p className="mt-2 text-gray-700 dark:text-gray-400 font-semibold">
                Contribute your bit towards our Motherland who gave us
                everything we needed to live our beautiful life.
              </p>
              <Link to="/login">
                <button className="mt-4 px-3 py-2 bg-indigo-600 text-white text-sm uppercase font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full mt-6 md:mt-32 md:w-1/2">
            <img className="max-w-2xl w-full h-full" src={Collector} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomePage;
