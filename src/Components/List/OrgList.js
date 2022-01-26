import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const OrgList = ({ auth, loading, events }) => {
  return (
    <div className="container mx-auto sm:mt-20">
      <div className="sm:text-center lg:text-left sm:px-40">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Vehicles</span>{" "}
        </h1>
      </div>

      {!loading && events && events.length ? (
        <div className="mx-auto">
          {events.map((value, key) => {
            return (
              <div
                className="w-full sm:w-2/3 mx-auto px-8 py-4 bg-white rounded-lg shadow-md mt-3.5"
                key={key}
              >
                <div className="flex justify-between items-center">
                  <span className="font-light text-gray-600 text-sm">
                  </span>
                  <Link
                    to={`/org/event/${value.data().eventId}/${
                      value.data().organizerId
                    }`}
                    className="px-3 py-1 bg-green-600 text-gray-100 text-sm font-bold rounded hover:bg-gray-500"
                  >
                    Out for Pickup
                  </Link>
                </div>

                <div className="mt-2">
                  <Link
                    to={`/org/event/${value.data().eventId}/${
                      value.data().organizerId
                    }`}
                    className="text-2xl text-gray-700 font-bold hover:text-gray-600 hover:underline"
                  >
                    {value.data().title
                      ? value.data().title
                      : "Plastic Collection"}
                  </Link>
                  <p className="mt-2 text-gray-600">
                    {value.data().about
                      ? value.data().about
                      : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <h6 className="text-gray-600 hover:underline font-bold">
                      {value.data().address ? value.data().address[0].city : ""}
                    </h6>
                    <Link
                      className="text-blue-600 hover:underline"
                      to={`/org/event/${value.data().eventId}/${
                        value.data().organizerId
                      }`}
                    >
                      Get Live Location
                    </Link>
                  </div>

                  <div className="flex items-center">
                    <img
                      className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                      src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
                      alt="avatar"
                    />
                    <div className="flex flex-col items-start">
                      <a className="text-gray-700 text-sm font-bold cursor-pointer">
                        {value.data().name ? value.data().name : ""}
                      </a>
                      <span className="text-gray-700 text-xs cursor-pointer">
                        {value.data().contact ? value.data().contact : ""}
                      </span>
                      <span className="text-gray-700 text-xs cursor-pointer">
                        {value.data().email ? value.data().email : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          No Events
          <Loader />
        </div>
      )}
    </div>
  );
};

export default OrgList;
