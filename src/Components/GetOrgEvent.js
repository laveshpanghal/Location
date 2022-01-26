import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import SendNotification from "./SendNotification/SendNotification";
import firestoreDb from "../index";
import {MapContainer, TileLayer, Marker, Popup,SVGOverlay,useMap,Rectangle,Polygon} from 'react-leaflet';


const GetOrgEvent = ({ auth }) => {
  const [eventData, setEventData] = useState(null);
  const [volunteerData, setVolunteerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const[position , setPosition]=useState([51.505, -0.09])

  useEffect(() => {
    fetchEvents();
    fetchParticipant();
  }, []);

  const bounds = [
    [22.6613549, 75.8908974],
    [22.6913559, 75.9108984],
  ]

  const rectangle = [
    [22.6613549, 75.8908974],
    [22.6913559, 75.9108984],
  ]
  const polygon = [
    [22.6913549, 75.8508974 ],
    [22.6613549, 75.8508974],
    [22.6613549, 75.8818974],
  ]
  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }
  function fn30sec() {
  fetchLocation()
  }

  setInterval(fn30sec, 20*1000);


  function fetchLocation(){
    firestoreDb
      .collection("location")
      .orderBy("timestamp", "desc")
      .get()
      .then((res) => {

       // setPosition([res.docs[0].data().longitude],[res.docs[0].data().latitude])
        console.log(res.docs[0]);
        setPosition([res.docs[0].data().coords.latitude,res.docs[0].data().coords.longitude]);

      })
      .catch((err) => {
        console.log(err);
      });

  }
  function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  }

  function fetchEvents() {
    setLoading(true);
    const id = location.pathname.split("/")[3];
    const orgId = location.pathname.split("/")[4];

    firestoreDb
      .collection("eventData")
      .doc(id)
      .get()
      .then((res) => {
        console.log(res, id);
        setEventData(res.data());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchParticipant() {
    const id = location.pathname.split("/")[3];
    console.log('working',id);
    firestoreDb
      .collection("eventParticipants")
      .where("eventId", "==", id)
      .get()
      .then((res) => {
        console.log(res,'nor');
        setVolunteerData(res.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const LocationPin = ({ text }) => (
    <div className="flex items-center">
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

    <div className="container mx-auto">
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-200 rounded-lg">
          <div className="md:col-span-1">
            <div className="px-4 py-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Vehicle Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            {!loading && eventData ? (
              <div>
                <div className="bg-white overflow-hidden shadow-md rounded-r-lg">
                  <div className="w-full h-64 object-cover">
                    <MapContainer
                      className='h-64'
                      id="map"
                      center={position} zoom={13} scrollWheelZoom={false}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <ChangeMapView coords={position}/>
                      <Marker position={position}>
                        <Popup>
                         Vehicle No {eventData.title}. <br /> Easily customizable.
                          {position}
                        </Popup>
                        <Polygon pathOptions={purpleOptions} positions={polygon} label={'asf'}
                        />
                        <SVGOverlay  bounds={bounds}>
                          <text x="50%" y="50%" stroke="white">
                            Zone A
                          </text>
                        </SVGOverlay>
                        <Rectangle bounds={rectangle} pathOptions={blackOptions} />
                      </Marker>
                      <Marker position={position}>
                      </Marker>
                    </MapContainer>
                  </div>

                  <div className="p-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-blue-600 text-xs font-medium uppercase">
                          {eventData.city}
                        </div>
                        <div className="text-indigo-900 text-xs font-medium uppercase">

                        </div>
                      </div>
                      <a
                        href="#"
                        className="block text-gray-800 font-semibold text-2xl mt-2 hover:text-gray-600 hover:underline"
                      >
                        {eventData.title
                          ? eventData.title
                          : ''}
                      </a>
                      <p className="text-sm text-gray-600 mt-2">
                        {eventData.about
                          ? eventData.about
                          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis."}
                      </p>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            className="mx-4 h-10 object-cover rounded-full"
                            src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                            alt="Avatar"
                          />
                          <div className="flex flex-col items-start">
                            <a className="text-gray-700 text-sm font-bold cursor-pointer">
                              Driver
                              {/*{auth.attributes.name ? auth.attributes.name : ""}*/}
                            </a>
                            <span className="text-gray-700 text-xs cursor-pointer">
                              {eventData.contact ? eventData.contact : ""}
                            </span>
                            <span className="text-gray-700 text-xs cursor-pointer">
                              {eventData.organiserName}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="mx-1 text-gray-600 text-xs font-bold">

                          </div>
                          <div className="mx-1 text-gray-600 text-xs font-bold">
                            Radius of Breach:{" "}
                            <span className="text-gray-500 text-xs">
                              {eventData.radius ? eventData.radius : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h4>Loading</h4>
            )}
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
               Previous Pickup Information
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
                            Driver
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Zone/Ward
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
                            Date
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {volunteerData && volunteerData.length ? (
                          <>
                            {volunteerData.map((value, key) => {
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
                                          {value.data().phoneNumber}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                     Ward-23,22
                                    </div>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Completed
                                    </span>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    19/01/2022
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a
                                      href="#"
                                      class="text-indigo-600 hover:text-indigo-900"
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        ) : (
                          <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                No Registration Yet
                              </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap"></td>
                            <td class="px-6 py-4 whitespace-nowrap"></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                          </tr>
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

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>



    </div>
  );
};

const mapStateToProps = (state, _ownProps) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GetOrgEvent);
