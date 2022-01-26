import React, {useEffect, useState} from "react";
import CreateRequest from "./CreateRequest";
import {toastError} from "./Utility/Toast";
import firestoreDb from "../index";
import firebase from "firebase/compat";

const Events = ({}) => {
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    function fetchEvents() {
        setLoading(true);

        firestoreDb.collection("requestData").where("userId", "==", firebase.auth().currentUser.uid).get().then((res) => {
            const events = res.docs;
            setEvents(events);
            setLoading(false);

        })
            .catch((err) => {
                throw err
                toastError(`Something went wrong ${err.message}`);
            });


    }

    return (
        <div className="mt-10">
            <div className="container mx-auto">
                <div>
                    <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-200 rounded-lg">
                        <div className="md:col-span-1">
                            <div className="px-4 py-4">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Past Request
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Check all your past request responses.
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
                                                        Title & Address
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
                                                        Created At
                                                    </th>
                                                    <th scope="col" class="relative px-6 py-3">
                                                        <span class="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                {!loading && events && events.length ? (
                                                    <>
                                                        {events.map((value, key) => {
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
                                                                                <div
                                                                                    class="text-sm font-medium text-gray-900">
                                                                                    {value.data().name}
                                                                                </div>
                                                                                <div class="text-sm text-gray-500">
                                                                                    {value.data().phone_number}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                                        <div class="text-sm text-gray-900">
                                                                            {value.data().title}
                                                                        </div>
                                                                        <div class="text-sm text-gray-500">
                                                                            {value.data().address}
                                                                        </div>
                                                                    </td>
                                                                    <td class="px-6 py-4 whitespace-nowrap">
                                      <span
                                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {value.data().status}
                                      </span>
                                                                    </td>
                                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        {new Date(
                                                                            value.data().createdAt
                                                                        ).toLocaleDateString("en-US")}
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
                                                    <tr>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  No Past Request
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
                    <div className="hidden sm:block" aria-hidden="true">
                        <div className="py-5">
                            <div className="border-t border-gray-200"></div>
                        </div>
                    </div>
                    <div className="mt-10 sm:mt-0 mb-20">
                        <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-200 rounded-lg">
                            <div className="md:col-span-1">
                                <div className="px-4 py-4">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Register Request
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Request organization to collect your waste. Take a step
                                        towards saving our world.
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600">
                                        If you have multiple type of waste, you can send request
                                        multiple times.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <CreateRequest/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
