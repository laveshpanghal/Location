import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import Loader from "./Loader/Loader";
import { toastSuccess, toastError } from "./Utility/Toast";
import firestoreDb from "../index";
import firebase from "firebase/compat";

const GetEvent = ({ auth,userData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [participationStatus, setParticipationStatus] = useState(false);
  const [questionData, setQuestionData] = useState({});
  const [closestLocation, setClosestLocation] = useState();

  const location = useLocation();

  useEffect(() => {
    fetchEvents();
    checkParticipationStatus();
  }, []);

  useEffect(() => {
    if (!loading && data) {
       const obj = JSON.parse(userData.location)

       NearestCity(
          obj.lat,
          obj.lng
      );

      // NearestCity(
      //   JSON.parse(auth.attributes["custom:location"]).lat,
      //   JSON.parse(auth.attributes["custom:location"]).lng
      // );

    }
  }, [data, loading]);

  function handleChange(e) {
    e.preventDefault();
    setQuestionData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function fetchEvents() {
    setLoading(true);
    const id = location.pathname.split("/")[2];
    const orgId = location.pathname.split("/")[3];


    firestoreDb.collection("eventData").doc(id).get()
        .then((res) => {
          console.log(res);
          setData(res.data());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function checkParticipationStatus() {
    const id = location.pathname.split("/")[2].toString();
    const uid = firebase.auth().currentUser.uid;

    firestoreDb.collection("eventParticipants").where("userId","==",uid).where("eventId","==",id).get()
      .then((res) => {
        if (res.docs[0].exists) {
          setParticipationStatus(true);
        } else {
          setParticipationStatus(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function sendQuestion(e) {
    e.preventDefault();

    const data = {
      userId_timeStamp: `${firebase.auth().currentUser.uid}_${new Date().getTime()}`,
      userId: firebase.auth().currentUser.uid,
      name: userData.firstName,
      phoneNumber: userData.phoneNumber,
      email:   "No email logic yet",
      eventId: location.pathname.split("/")[2].toString(),
      question: questionData.question,
      createdAt: new Date().getTime(),
      Date: new Date().toISOString(),
    };

    firestoreDb.collection("eventQuestions").doc().set({...data})
      .then((_res) => {
        toastSuccess("Question Posted Success");
      })
      .catch((err) => {
        toastError(`Something went wrong ${err.message}`);
      });
  }

  function participate(e) {
    e.preventDefault();

    const participantData = {
      userId: firebase.auth().currentUser.uid,
      name: userData.firstName,
      phoneNumber: userData.phoneNumber,
      email: "no email logic yet",
      eventId: location.pathname.split("/")[2].toString(),
    };


    firestoreDb.collection("eventParticipants").doc().set({...participantData})
      .then((_res) => {
        toastSuccess("Participation Request Sent");
      })
      .catch((err) => {
        toastError(`Something went wrong ${err.message}`);
      });
  }

  function removeParticipation(e) {
    e.preventDefault();
    const id = location.pathname.split("/")[2].toString();
    const uid = firebase.auth().currentUser.uid;

    firestoreDb.collection("eventParticipants").where("userId","==",uid).where("eventId","==",id).get()

      .then((_res) => {
         _res.docs[0].ref.delete().then(toastSuccess("Participation Request Removed"));
      })
      .catch((err) => toastError(`Something went wrong ${err.message}`));
  }

  function Deg2Rad(deg) {
    return (deg * Math.PI) / 180;
  }

  function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    let R = 6371; // km
    let x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    let y = lat2 - lat1;
    let d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  function NearestCity(latitude, longitude) {
    let minDif = 99999;
    let closest;

    for (let index = 0; index < data.address.length; ++index) {
      let dif = PythagorasEquirectangular(
        latitude,
        longitude,
        data.address[index].location.lat,
        data.address[index].location.lng
      );
      if (dif < minDif) {
        closest = index;
        minDif = dif;
      }
    }

    // echo the nearest city
    setClosestLocation(data.address[closest]);
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
    <div className="mt-10">
      <div className="container mx-auto">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-200 rounded-lg">
            <div className="md:col-span-1">
              <div className="px-4 py-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Event Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              {!loading && data ? (
                <div>
                  <div className="bg-white overflow-hidden shadow-md rounded-r-lg">
                    <div className="w-full h-64 object-cover">
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={{
                          address: data.address[0],
                          lat: data.location.lat,
                          lng: data.location.lng,
                        }}
                        defaultZoom={17}
                      >
                        <LocationPin
                          lat={data.location.lat}
                          lng={data.location.lng}
                          text={`Here`}
                        />
                      </GoogleMapReact>
                    </div>

                    <div className="p-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="text-blue-600 text-xs font-medium uppercase">
                            {data.address ? data.address[0].address : "NA"}
                          </div>
                          <div className="text-indigo-900 text-xs font-medium uppercase">
                            {data.typeOfWaste[0]}
                          </div>
                        </div>
                        <a
                          href="#"
                          className="block text-gray-800 font-semibold text-2xl mt-2 hover:text-gray-600 hover:underline"
                        >
                          {data.title ? data.title : "Plastic Collection"}
                        </a>
                        <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
                          {data.about
                            ? data.about
                            : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!"}
                        </p>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <img
                              className="mx-4 h-10 object-cover rounded-full hidden lg:block"
                              src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                              alt="Avatar"
                            />
                            <div className="flex flex-col items-start">
                              <a className="text-gray-700 text-sm font-bold cursor-pointer">
                                {data.organiserName ? data.organiserName : "NA"}
                              </a>
                              <span className="text-gray-700 text-xs cursor-pointer">
                                {data.contact}
                              </span>
                              <span className="text-gray-700 text-xs cursor-pointer">
                                {data.email}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-start w-1/2">
                            <div className="mx-1 text-gray-600 text-xs">
                              <>
                                <span className="font-bold text-gray-800">
                                  Date:{" "}
                                </span>
                                <span>
                                  {new Date(data.date).toDateString()}
                                </span>
                              </>
                            </div>
                            <div className="mx-1 mt-2 text-gray-600 text-xs">
                              {closestLocation ? (
                                <>
                                  <span className="font-bold text-gray-800">
                                    Closest:{" "}
                                  </span>
                                  <span>{closestLocation.address}</span>
                                </>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Loader />
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
                  Registration Status
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Join hands of our organization to make this world a better
                  place.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="w-full h-full bg-white overflow-hidden shadow-md flex">
                <div className="w-full h-full object-cover flex items-center justify-around">
                  {!participationStatus ? (
                    <div className="flex items-center justify-around w-full px-4 py-3">
                      <div>
                        <p className="font-semibold">
                          Want to join hands with us and save our planet?
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                         onClick={(e) => participate(e)}
                        >
                          Register
                        </button>{" "}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-around w-full px-4 py-3">
                      <div>
                        <p className="font-semibold">
                          You're already registered and ready to make a change.
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-500"
                         onClick={(e) => removeParticipation(e)}
                        >
                          <svg
                            class="-ml-1 mr-2 h-5 w-5 fill-current text-white"
                            viewBox="0 0 40 40"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                          </svg>
                          Cancel Registration.
                        </button>
                      </div>
                    </div>
                  )}
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
        <div className="mt-10 sm:mt-0 mb-20">
          <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-200">
            <div className="md:col-span-1">
              <div className="px-4 py-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Have any Questions?
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Shoot us your questions that is keeping you from attending our
                  event. Can't attend event, tell us why?
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="w-full h-full bg-white shadow-md flex flex-col px-2 py-3">
                <div className="w-full h-full flex items-center justify-around">
                  <div className="w-11/12">
                    <label
                      for="question"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Question
                    </label>
                    <div class="mt-2">
                      <textarea
                        id="question"
                        name="question"
                        rows="3"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Don't know where the event is?"
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-around">
                  <div className="w-11/12">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 my-4"
                     onClick={(e) => sendQuestion(e)}
                    >
                      Submit
                    </button>{" "}
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

const mapStateToProps = (state, _ownProps) => {
  return {
    auth: state.auth,
    userData: state.userData
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GetEvent);
