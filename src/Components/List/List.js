import React from "react";
import {Link} from "react-router-dom";
import Loader from "../Loader/Loader";
import {ShareButton} from "../Utility/UtilityButton";

const List = ({loading, events}) => {
    console.log(loading,"check 5")
    return (
        <div className="container md:mx-auto mb-10 sm:mt-20">
            <div className="lg:text-left flex items-center justify-between mx-4">
                <div>
                    <h1 className="md:ml-32 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="hidden lg:block xl:inline">Collection Drives</span>{" "}
                    </h1>
                </div>
                <div className="flex flex-row">
          <span className="px-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 stroke-current text-gray-500"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </span>
                    <span className="px-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 stroke-current text-gray-500"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </span>
                </div>
            </div>
            {!loading && events && events.length ? (
                <div className="mt-4 lg:mt-8 md:mt-16 mx-6 md:mx-0">
                    {events.map((value, key) => {
                        const address = value.data().address;
                        return (
                            <div
                                className="max-w-2xl flex flex-row mx-auto rounded-lg mb-12"
                                key={key}
                            >
                                <div className="w-1/3 py-2">
                                    <img
                                        src={
                                            require(`../../Images/${Math.floor(
                                                Math.random() * 7 + 1
                                            )}.jpeg`).default
                                        }
                                    />
                                </div>

                                <div className="px-4 w-2/3" key={key}>
                                    <div>
                                        <Link
                                            to={`/event/${value.data().eventId}/${value.data().organizerId}`}
                                            className="text-base md:text-2xl text-gray-700 font-bold hover:text-gray-600 hover:underline"
                                        >
                                            {value.data().title ? value.data().title : "Plastic Collection"}
                                        </Link>
                                        <p className="mt-2 hidden lg:block text-sm md:text-base text-gray-600 whitespace-pre-wrap overflow-ellipsis">
                                            {value.data().about
                                                ? value.data().about.slice(0, 300) + " ...."
                                                : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!"}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-semibold text-xs lg:text-sm">
                      {new Date(value.data().date).toDateString()}
                    </span>
                                        <Link
                                            to={`/event/${value.data().eventId}/${value.data().organizerId}`}
                                            className="hidden lg:block px-3 py-1 bg-gray-600 text-gray-100 text-sm font-bold rounded hover:bg-gray-500 tracking-wide"
                                        >
                                            {value.data().typeOfWaste[0]}
                                        </Link>
                                    </div>

                                    <div className="flex justify-between items-center mt-1 lg:mt-4">
                                        <div>
                                            <h6 className="text-xs lg:text-sm md:text-base text-gray-600 hover:underline lg:font-bold">
                                                {address ? address[0].address.slice(0, 40) : "NA"}
                                            </h6>
                                            <Link
                                                className="hidden lg:block text-sm md:text-base text-blue-600 hover:underline"
                                                to={`/event/${value.data().eventId}/${value.data().organizerId}`}
                                            >
                                                Read more
                                            </Link>
                                        </div>

                                        <div className="items-center hidden lg:flex">
                                            <img
                                                className="mx-4 w-10 h-10 object-cover rounded-full hidden lg:block"
                                                src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
                                                alt="avatar"
                                            />
                                            <div className="flex flex-col items-start text-sm md:text-base">
                                                <a className="text-gray-700 text-sm font-bold cursor-pointer">
                                                    {value.data().name ? value.data().name : ""}
                                                </a>
                                                <span className="text-gray-700 text-xs cursor-pointer">
                          {value.data().contact}
                        </span>
                                                <span className="text-gray-700 text-xs cursor-pointer">
                          {value.data().email}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row mt-3 items-center justify-start">
                    <span className="w-4">
                      <ShareButton
                          link={`${window.location.origin}/event/${value.data().eventId}/${value.data().organizerId}`}
                      />
                    </span>
                                        <span className="w-4 ml-8">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="stroke-current text-gray-500"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </span>
                                        <span className="w-4 ml-8">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="stroke-current text-gray-500"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <Loader/>
            )}
        </div>
    );
};

export default List;
