import React from "react";
import Address from "../AddressAutoFill/AddressAutoFill";
import WasteSpace from "./WasteSpace";
import Checkbox from "./Checkbox";
import { useEffect, useState } from "react";
import { WASTE_SPACE } from './WasteSpaceOptions';
import {getError} from "../../Redux/Actions/errorAction";
import M from "materialize-css";
import {toastError, toastSuccess} from "../Utility/Toast";

const SignUpForm = ({
  hiddenCheck,
  onChange,
  handleSignUp,
  signUp,
  handleMapInput,
  handleAddress,
  setFormType,
  signUpData,
  handelWasteSpace,
  renderToastError,
  renderToast

}) => {
  const [wasteSpaceDisplay, setWasteSpaceDisplay] = useState(true);
  const [checkboxes, setCheckboxes] = useState(
      WASTE_SPACE.reduce(
          (options, option) => ({
            ...options,
            [option]: false,
          }),
          {}
      )
  );



  function handleCheckboxChange(e) {
    const { name } = e.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
    console.log(checkboxes);
  }

async function onOrgSelect(e){
  console.log('ok')
      if (e.target.value === 'organisation') {
        setWasteSpaceDisplay(false)
      } else {
        setWasteSpaceDisplay(true)
    }
}


  function handleCheckboxSubmit(e) {
    console.log('chala')
    setWasteSpaceDisplay(true)
var wasteSpace=[];

    for (var checkbox in checkboxes) {
      if (checkboxes[checkbox]) wasteSpace.push(checkbox);
    }
    handelWasteSpace(wasteSpace);
    if (wasteSpace.length > 0) {
      console.log("here");
      renderToast('Choices Saved')
    } else {
      getError({
        checkbox: "Choose atleast one relevant play to move forward.",
      },renderToastError('Select a Role'));
    }
    console.log(wasteSpace)
  }



  return (
    <div className="md:max-w-md md:w-full space-y-8 max-w-full">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <span
            onClick={() => setFormType("signIn")}
            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Already have an account? Login
          </span>
        </p>
      </div>
      <div className="mt-8 space-y-6">
        {/* <input type="hidden" name="remember" value="true" /> */}
        <div className="rounded">
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="flex justify-between text-gray-700 text-sm font-bold mb-2"
            >
              <span>Name</span>
              <span className="text-gray-400 text-xs ">Required</span>
            </label>
            <input
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              autoComplete="on"
              required
              placeholder=""
              id="first_name"
              type="text"
              name="firstName"
              onChange={onChange}
            />
          </div>
          {/* <div>
            <label htmlFor="last_name" className="flex justify-between text-gray-700 text-sm font-bold mb-2">Sign Up
Or Already have an account? Login

Name
Required

              Last Name
            </label>
            <input
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              autoComplete="on"
              required
              onChange={onChange}
              name="lastName"
              placeholder="Last name"
              id="last_name"
              type="text"
            />
          </div> */}
          {/* <div>
            <label htmlFor="username" className="flex justify-between text-gray-700 text-sm font-bold mb-2">
              Email or Phone Number
            </label>
            <input
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              autoComplete="on"
              required
              onChange={onChange}
              name="email"
              placeholder="Email or Phone Number"
              id="username"
              type="email"
            />
          </div> */}
          {/*<div className="mb-4">*/}
          {/*  <label*/}
          {/*    htmlFor="password"*/}
          {/*    className="flex justify-between text-gray-700 text-sm font-bold mb-2"*/}
          {/*  >*/}
          {/*    <span>Create Password</span>*/}
          {/*    <span className="text-gray-400 text-xs ">Required</span>*/}
          {/*  </label>*/}
          {/*  <input*/}
          {/*    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"*/}
          {/*    autoComplete="on"*/}
          {/*    required*/}
          {/*    name="password"*/}
          {/*    placeholder="Atleast 8 characters long."*/}
          {/*    id="password"*/}
          {/*    type="password"*/}
          {/*    onChange={onChange}*/}
          {/*  />*/}
          {/*  <input*/}
          {/*    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"*/}
          {/*    autoComplete="on"*/}
          {/*    required*/}
          {/*    type="text"*/}
          {/*    value={signUpData ? signUpData.password : ""}*/}
          {/*    readOnly*/}
          {/*  />*/}
          {/*</div>*/}
          <div className="mb-4">
            <label
              htmlFor="phone_number"
              className="flex justify-between text-gray-700 text-sm font-bold mb-2"
            >
              <span>Phone Number</span>
              <span className="text-gray-400 text-xs ">Required</span>
            </label>
            <input
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              autoComplete="on"
              required
              onChange = {onChange}
              name="phone_number"
              placeholder="800XXXX1254"
              id="phone_number"
              type="tel"
              maxLength='10'
            />
            <p className="text-green-500 text-xs italic">For OTP</p>
          </div>
          <div className="mb-4">
            <label
                htmlFor="role"
                className="flex justify-between text-gray-700 text-sm font-bold mb-2"
            >
              <span>Sign-up as an</span>
              <span className="text-gray-400 text-xs ">Required</span>
            </label>
           <select className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   required
                   onChange = {onChange}
                   onClick={onOrgSelect}
                   name="role"
                   id="role"
           defaultValue={'individual'}>
             <option value={'individual'}selected>Individual</option>
             <option value={'organisation'} onClick={(e)=>(console.log('checking'))}
             >Organisation</option>
           </select>
          </div>
          <div hidden={wasteSpaceDisplay} className='mb-4'>
            <WasteSpace
                WasteSpace={WASTE_SPACE}
                onChange={handleCheckboxChange}
                onSubmit={handleCheckboxSubmit}
                checkboxes={checkboxes}
            />

          </div>
          <Address
            onChange={onChange}
            handleMapInput={handleMapInput}
            handleAddress={handleAddress}
            placeholder="To see events organized nearby"
          />
        </div>

        {/* <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div> */}
        <div className="mb-4" hidden={hiddenCheck}>
          <label
              htmlFor="otp"
              className="flex justify-between text-gray-700 text-sm font-bold mb-2"
          >
            <span>Enter Otp</span>
            <span className="text-gray-400 text-xs ">Required</span>
          </label>
          <input
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="otp"
              id="otp"
              type="number"
              onChange={onChange}
          />
        </div>
        <div hidden={!hiddenCheck}>
          <button
              name="action"
              onClick={handleSignUp}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
          Get OTP
          </button>
        </div>
        <div hidden={hiddenCheck}>
          <button
            name="action"
            onClick={
                  signUp

            }
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
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
