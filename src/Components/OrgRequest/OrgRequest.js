import React, { useEffect, useState } from "react";
// import { API } from "aws-amplify";
import GoogleMapReact from "google-map-react";
import firestoreDb from "../../index";

const OrgRequest = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("PENDING");

  useEffect(() => {
    fetchCollectorData(query);
  }, []);

  function fetchCollectorData(id) {
    firestoreDb
      .collection("requestData")
      .get()
      .then((res) => {
        setData(res.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onClickSelect(e) {
    setQuery(e.target.value);
  }

  const LocationPin = ({ text, key }) => (
    <div className="flex items-center" key={key}>
      <div className="text-lg w-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-base w-4"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-base">{text}</p>
    </div>
  );

  return (
    <div className="container mx-auto mt-20">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">User Requests</span>{" "}
        </h1>
      </div>
      <div>
        <div className="flex justify-end items-center">
          <div className="w-auto md:w-40">
            <label
              for="wasteType"
              className="block text-sm font-medium text-gray-700 py-2"
            >
              Request Status
            </label>
            <select
              id="wasteType"
              className="appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              onClick={(e) => onClickSelect(e)}
            >
              <option className="py-2" value="PENDING">
                PENDING
              </option>
              <option className="py-2" value="RESPONDED">
                RESPONDED
              </option>
              <option className="py-2" value="WORKING">
                WORKING
              </option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-200 rounded-lg">
            <div className="md:col-span-1">
              <div className="px-4 py-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  User Collection Request
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Collection request coming from various areas in city.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              {data ? (
                <div>
                  <div className="bg-white overflow-hidden shadow-md rounded-r-lg">
                    <div className="w-full h-96 object-cover">
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={{
                          address: data[0].data().address,
                          lat: parseFloat(
                            JSON.parse(data[0].data().location).lat
                          ),
                          lng: parseFloat(
                            JSON.parse(data[0].data().location).lng
                          ),
                        }}
                        defaultZoom={10}
                      >
                        {data.map((value, key) => {
                          return (
                            <LocationPin
                              key={key}
                              lat={JSON.parse(value.data().location).lat}
                              lng={JSON.parse(value.data().location).lng}
                              text={value.name}
                            />
                          );
                        })}
                      </GoogleMapReact>
                    </div>
                  </div>
                </div>
              ) : (
                <h4>Loading</h4>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-200">
          <div className="md:col-span-1">
            <div className="px-4 py-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Request Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                You can contact them and set the relavant status.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div class="flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Contact
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Weight
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Waste Type
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Address
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {data ? (
                          <>
                            {data.map((value, key) => {
                              return (
                                <tr key={key}>
                                  <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                      <div class="flex-shrink-0 h-10 w-10">
                                        <img
                                          class="h-10 w-10 rounded-full"
                                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                                          alt=""
                                        />
                                      </div>
                                      <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">
                                          {value.data().name}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                          {value.data().email}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                      {value.data().phone_number}
                                    </div>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      {value.data().status}
                                    </span>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {value.data().weight}
                                  </td>
                                  {/*<yahan kya likhna h neeche wala logoic kya h?*/}

                                  {/*                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">*/}
                                  {/*                              {value.typeOfWaste.map((value, key) => (*/}
                                  {/*                                  <span key={key} className="font-bold">*/}
                                  {/*  {key ? " - " : " "} {value}*/}
                                  {/*</span>*/}
                                  {/*                              ))}*/}
                                  {/*                          </td>*/}
                                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {value.data().address}
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a
                                      href="#"
                                      class="text-indigo-600 hover:text-indigo-900"
                                    >
                                      Edit
                                    </a>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        ) : (
                          <h4>Loading</h4>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgRequest;
