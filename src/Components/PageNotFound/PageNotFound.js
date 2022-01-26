import React from "react";
import cat from "../../Images/cat.svg";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div class="flex items-center justify-center -mt-20 lg:-mt-0 w-full min-h-screen bg-gray-100">
        <div class="flex flex-col text-gray-700 lg:flex-row lg:space-x-16 lg:space-x-reverse">
          <div class="order-1 max-w-md px-2 text-sm md:text-base lg:px-0">
            <header class="mb-6">
              <h2 class="text-4xl font-bold leading-none text-gray-400 select-none lg:text-6xl">
                404.
              </h2>
              <h3 class="text-xl font-light leading-normal lg:text-3xl md:text-3xl">
                Sorry, we couldn't find this page.
              </h3>
            </header>

            <p class="max-w-sm mb-5 leading-5 md:leading-7">
              Don't worry, sometimes even we make mistakes. You can find plenty
              of other things on our homepage.
            </p>

            <Link to="/">
              <button class="inline px-4 py-2 text-sm font-medium leading-5 text-white uppercase transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-blue-600 hover:bg-blue-700">
                Back to Homepage
              </button>
            </Link>
          </div>

          <div class="max-w-lg">
            <img src={cat} alt="Our Fault" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
