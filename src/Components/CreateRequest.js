import React, { useState } from "react";
// import { API } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { toastError, toastSuccess } from "./Utility/Toast";
import firebase from "firebase/compat";
import firestoreDb from "../index";
import moment from "moment";

const CreateReact = ({ auth }) => {
  const id = firebase.auth().currentUser.uid;
  const [eventData, setEventData] = useState({
    title: "",
    weight: "",
  });
  const [data, setData] = useState({
    requestId: "",
    typeOfWaste: "",
    userId: firebase.auth().currentUser.uid,
    name: "",
    createdAt: "",
    imageUrl: "",
    status: "PENDING",
    address: "",
    phone_number: "",
    location: "",
  });

  firestoreDb
    .collection("Users")
    .doc(id)
    .get()
    .then((doc) => {
      setData({
        ...data,
        requestId: uuidv4(),
        // userId: user.username,
        name: doc.data().firstName,
        createdAt: moment().toString(),
        imageUrl: "https://unsplash.com/photos/j_Ch0mwBNds",
        status: "PENDING",
        address: doc.data().address,
        phone_number: doc.data().phoneNumber,
        location: doc.data().location,
      });
    });

  const [select, setSelect] = useState("Paper");

  function onClickSelect(e) {
    setSelect(e.target.value);
  }

  function handleChange(event) {
    event.persist();
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  }

  function uploadRequest(e) {
    e.preventDefault();
    const requestData = {
      ...data,
      ...eventData,
      typeOfWaste: select,
    };


    firestoreDb
      .collection("requestData")
      .doc()
      .set(requestData)
      .then((_res) => {
        toastSuccess("Event Created!");
      })
      .catch((err) => {
        toastError(`Something went wrong ${err.message}`);
      });
  }

  return (
    <div className="container mx-auto bg-white shadow rounded-r-lg">
      <div className="max-w-md w-full px-8 py-4 space-y-8">
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          name="title"
          type="text"
          placeholder="What waste do you have?"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="appearance-none mt-8 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          name="weight"
          type="number"
          placeholder="Total Weight of Waste"
          onChange={(e) => handleChange(e)}
        />
        <select
          id="wasteType"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          onClick={(e) => onClickSelect(e)}
        >
          <option value="Plastic">Plastic</option>
          <option value="E-waste">E-waste</option>
        </select>

        <div className="flex items-center justify-center w-full">
          <button
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={(e) => uploadRequest(e)}
          >
            Register Request
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateReact);
