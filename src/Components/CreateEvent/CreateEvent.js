import React, {useState, useEffect} from "react";
// import { API } from "aws-amplify";
import {connect} from "react-redux";
import {v4 as uuidv4} from "uuid";
import AddressAutoFill from "../AddressAutoFill/AddressAutoFill";
import firestoreDb from "../../index";
import moment from "moment";
import firebase from "firebase/compat";
import {toastError, toastSuccess} from "../Utility/Toast";


const CreateEvent = ({auth,userData}) => {


    const id = firebase.auth().currentUser.uid;
    const [eventInputData, setEventInputData] = useState({
        date: "",
        email: "",
        title: "",
        radius: 0,
        about: "",

    });
    const [data, setData] = useState({
        eventId: uuidv4(),
        organizerId: id,
        location: {},
        contact: "",
        organiserName: "",
        address: "",
    });
    const [address, setAddress] = useState([]);
    const [select, setSelect] = useState(["Plastic"]);
    const [addressCount, setAddressCount] = useState(1);


    useEffect(
        () => {
            console.log(userData);

            setData({
                ...data,
                organiserName: userData.firstName,
                createdAt: moment().toString(),
                contact: userData.phoneNumber,
            });

        }, []
    )


    function handleChange(event) {
        event.persist();
        setEventInputData({
            ...eventInputData,
            [event.target.name]: event.target.value,
        });
    }


    function onClickSelect(e) {
        console.log(e.target.value);
        setSelect([e.target.value]);
    }

    function incrementAddress() {
        setAddressCount(addressCount + 1);
    }

    function decrementAddress(e) {
        console.log(e.target);
        if (addressCount > 1) {
            setAddressCount(addressCount - 1);
            setAddress(address.slice(0, addressCount - 1));
        }
    }

    function uploadEvent(e) {
        e.preventDefault();
        const eventData = {
            ...data,
            ...eventInputData,
           address: address,
            typeOfWaste: select,
        };



        firestoreDb
            .collection("eventData")
            .doc(data.eventId)
            .set(eventData).then((res) => {
            console.log("Event Created Success", res);
        })
            .catch((err) => {
                console.log(err);
            });

    }


    function handleMapInput(name, value) {
        console.log(name, value);
        setData(() => ({
            ...data,
            location: value,
        }));
    }

    function handleAddress(address, state, city, location) {
        const Address = {
            address: address,
            state: state,
            city: city,
            location: location,
        };


        setAddress((prev) => [...prev, Address]);
    }

    function renderAddress() {
        let addressArray = [];
        for (let count = 0; count < addressCount; count++) {
            addressArray.push(
                <AddressAutoFill
                    onChange={handleChange}
                    handleMapInput={handleMapInput}
                    handleAddress={handleAddress}
                />
            );
        }
        return addressArray;
    }


    //console.log(address);

    return (

        <div className="container mx-auto">

            <div className="mt-10 sm:mt-0 bg-gray-200">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 pt-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Event Information
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Use a permanent address where you can receive mail and resolve
                                queries.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            for="first_name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Event name
                                        </label>
                                        <input
                                            autocomplete="given-name"
                                            className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            id="first_name"
                                            name="title"
                                            type="text"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <div className="flex items-end justify-between">
                                            <div className="w-3/4">
                                                {renderAddress().map((value, key) => {
                                                    return value;
                                                })}
                                            </div>
                                            <div className="flex flex-row">
                                                <div
                                                    className="w-10"
                                                    onClick={(e) => decrementAddress(e)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <div
                                                    className="w-10"
                                                    onClick={() => incrementAddress()}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            for="email_address"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email address
                                        </label>
                                        <input
                                            name="email"
                                            autocomplete="email"
                                            className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            id="email"
                                            type="text"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            for="wasteType"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Select Waste type
                                        </label>
                                        <select
                                            id="wasteType"
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            onClick={(e) => onClickSelect(e)}
                                        >
                                            <option value="Plastic">Plastic</option>
                                            <option value="E-Waste">E-Waste</option>
                                        </select>
                                    </div>

                                    <div className="col-span-3">
                                        <label
                                            for="radius"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Radius of Notification (in Kilometers)
                                        </label>
                                        <input
                                            autocomplete="street-address"
                                            className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            id="radius"
                                            name="radius"
                                            type="number"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>


                                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                        <label
                                            for="date"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Event Date
                                        </label>
                                        <input
                                            className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            id="date"
                                            name="date"
                                            type="date"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                                        <label
                                            for="about"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            About event
                                        </label>
                                        <div class="mt-1">
                      <textarea
                          id="about"
                          name="about"
                          rows="3"
                          className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Collection drive ..."
                          onChange={(e) => handleChange(e)}
                      ></textarea>
                                        </div>
                                        <p class="mt-2 text-sm text-gray-500">
                                            Brief description of your event.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex items-center justify-center">
                                <button
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={(e) => uploadEvent(e)}
                                >
                                    Create Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row">
        <h3>Create an Event</h3>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="first_name"
                name="title"
                type="text"
                className="validate"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="first_name">Title of Event</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={auth.attributes.email}
                id="email"
                type="text"
                className="validate"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <select multiple>
                <option value="" disabled selected>
                  Select Waste type
                </option>
                <option value="Plastic">Plastic</option>
                <option value="Paper">Paper</option>
                <option value="Cardboard">Cardboard</option>
              </select>
              <label>Type of Waste</label>
            </div>
          </div>
          <Address
            onChange={handleChange}
            handleMapInput={handleMapInput}
            handleAddress={handleAddress}
          />
          <div className="row">
            <div className="input-field col s12">
              <input
                id="radius"
                name="radius"
                type="number"
                className="validate"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="radius">Radius</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="contact"
                name="contact"
                type="number"
                className="validate"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="contact">Contact</label>
            </div>
          </div>
          <button
            className="btn waves-effect waves-light"
            onClick={(e) => uploadEvent(e)}
          >
            Submit
          </button>
        </form>
      </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
