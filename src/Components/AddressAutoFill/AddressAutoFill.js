import React from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {toastError} from "../Utility/Toast";

const AddressAutoFill = ({
                             onChange,
                             handleAddress,
                             handleMapInput,
                             placeholder,
                         }) => {
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {},
        debounce: 400,
    });

    const registerRef = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = ({description, terms}) => () => {
        setValue(description, false);
        clearSuggestions();
        getGeocode({address: description})
            .then((results) => getLatLng(results[0]))
            .then(({lat, lng}) => {
                handleMapInput("coordinates", {lat: lat, lng: lng});
                handleAddress(
                    description,
                    terms[terms.length - 2].value,
                    terms[terms.length - 3].value,
                    {lat: lat, lng: lng}

                );
            })
            .catch((error) => {
                toastError("Something went wrong!");
            });

    };

    const renderSuggestions = () =>
        data.map((suggestion, key) => {
            const {
                id,
                structured_formatting: {main_text, secondary_text},
            } = suggestion;

            return (
                <li
                    id="listbox-item-0"
                    role="option"
                    className="text-gray-900 cursor-default select-none relative py-2 px-2"
                    key={key}
                    onClick={handleSelect(suggestion)}
                >
                    <div className="flex items-center flex-wrap w-2/3">
            <span className="text-gray-700 font-bold cursor-pointer">
              {main_text}
            </span>
                        <span className="ml-3 block font-normal truncate">
              {secondary_text}
            </span>
                    </div>
                </li>
            );
        });

    return (
        <div>
            <div className="mb-4">
                <label
                    htmlFor="address"
                    className="flex justify-between text-gray-700 text-sm font-bold mb-2"
                >
                    <span>Address</span>
                    <span className="text-gray-400 text-xs">Required</span>
                </label>
                <input
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    autoComplete="on"
                    required
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder={""}
                    name="address"
                    id="address"
                />
                {placeholder ? (
                    <p className="text-green-500 text-xs italic">{placeholder}</p>
                ) : (
                    <></>
                )}
                {status === "OK" && (
                    <ul className="list-none">{renderSuggestions()}</ul>
                )}
            </div>
        </div>
    );
};

export default AddressAutoFill;
