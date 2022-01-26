import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import firestoreDb from "../../index";

const SendNotification = ({ eventId, eventData }) => {
    const [notificationData, setNotificationData] = useState(null);
    const [data,setData]=useState("")

    function scheduleNotification() {

        try {
            console.log(data)
            firestoreDb.collection("notificationData").doc().set( {
                            ...notificationData,
                            eventId: eventId,
                            location: eventData.location,
                            radius: eventData.radius,
                            address: eventData.address,
                            contact: eventData.contact,
                            UTCTime: new Date(
                `${notificationData.date} ${notificationData.time}`
            ).toISOString(),})
                .then((res) => {
                    console.log("Scheduled Notification");
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(event) {
        event.persist();
        setNotificationData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <div className="container mx-auto bg-white shadow rounded-r-lg">
            <div className="max-w-md w-full px-8 py-4 space-y-8">
                <input
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    name="title"
                    type="text"
                    placeholder="Text for Message notification."
                    onChange={(e) => handleChange(e)}
                />
                <input
                    className="appearance-none mt-8 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    name="date"
                    type="date"
                    placeholder="Date"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    className="appearance-none mt-8 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    name="time"
                    type="time"
                    placeholder="Time"
                    onChange={(e) => handleChange(e)}
                />
                <div className="flex items-center justify-center w-full">
                    <button
                        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e) => scheduleNotification(e)}
                    >
                        Schedule Notification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SendNotification;