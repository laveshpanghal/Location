import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { API } from "aws-amplify";
import { connect } from "react-redux";

const Track = ({ auth,userData }) => {
  const initialFormState = {
    collector_name: "",
    // household_name: "",
    location: {},
    household_id: userData.username,
    household_name: auth.attributes.name,
    date: new Date(Date.now()).toISOString(),
    city: "Jaipur",
  };
  const [result, setResult] = useState("No result");
  const [trackData, setTrackData] = useState(initialFormState);

  useEffect(() => {

    getLocation();
  }, []);

  function handleScan(data) {
    if (data) {
      const splitData = data.split(":");
      const name = splitData[0];
      const email = splitData[1];

      setTrackData(() => ({
        ...trackData,
        collector_name: name,
        collector_id: email,
      }));
    }
  }

  function handleError(err) {
    console.error(err);
  }

  function onChange(e) {
    e.persist();
    setTrackData(() => ({
      ...trackData,
      [e.target.name]: e.target.value,
    }));
  }

  function getLocation() {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(function (position) {
            setTrackData(() => ({
              ...trackData,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            }));
          });
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(function (position) {
            setTrackData(() => ({
              ...trackData,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            }));
          });
        }
      });
  }

  function uploadTrack(e) {
    e.preventDefault();
    const requestData = {
      ...trackData,
    };

    try {
      API.post("trackApi", "/track", {
        body: {
          ...requestData,
        },
      })
        .then((res) => {
          console.log("Event Created Success", res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container mx-auto items-center mt-8">
      <div className="flex flex-col-reverse">
        <div className="md:w-3/5 px-4">
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="name" className="sr-only">
                  Collector Name
                </label>
                <input
                  className="appearance-none mt-8 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  autocomplete="name"
                  required
                  id="name"
                  type="text"
                  name="collector_name"
                  placeholder="Name"
                  onChange={(_e) => onChange(_e)}
                  value={
                    trackData.collector_name ? trackData.collector_name : ""
                  }
                />
              </div>
              <div>
                <label for="household" className="sr-only">
                  Collector Id
                </label>
                <input
                  className="appearance-none mt-8 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  autocomplete="collector_id"
                  required
                  id="household"
                  type="text"
                  onChange={onChange}
                  name="household"
                  placeholder="Collector Id"
                  onChange={(_e) => onChange(_e)}
                  value={trackData.collector_id ? trackData.collector_id : ""}
                />
              </div>
            </div>

            <div>
              <button
                onClick={(_e) => uploadTrack(_e)}
                name="action"
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-2/5 px-4 py-4">
          <QrReader
            delay={300}
            onError={(e) => handleError(e)}
            onScan={(e) => handleScan(e)}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Track);
