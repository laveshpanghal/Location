import React from "react";

const SignInForm = ({ onChange, signIn, setFormType,handleSignUp,hiddenLoginCheck}) => {
  return (
    <div className="md:max-w-md md:w-full space-y-8">
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
            onClick={() => setFormType("signUp")}
            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Don't have an account? SignUP
          </span>
        </p>
      </div>
      <div className="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="mb-4">
            <label
              for="phone_number"
              className="flex justify-between text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              autocomplete="name"
              required
              id="phone_number"
              type="tel"
              maxLength='10'
              name="phone_number"
              placeholder="800XXXX1254"
              onChange={(_e) => onChange(_e)}
            />
          </div>
          <div className="mb-4" hidden={hiddenLoginCheck}>
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
        </div>

        {/*<div className="flex items-center justify-between">*/}
        {/*  <div className="flex items-center">*/}
        {/*    <input*/}
        {/*      id="remember_me"*/}
        {/*      name="remember_me"*/}
        {/*      type="checkbox"*/}
        {/*      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"*/}
        {/*    />*/}
        {/*    <label*/}
        {/*      for="remember_me"*/}
        {/*      className="ml-2 block text-sm text-gray-900"*/}
        {/*    >*/}
        {/*      Remember me*/}
        {/*    </label>*/}
        {/*  </div>*/}

        {/*</div>*/}
        <div hidden={!hiddenLoginCheck}>
          <button  onClick={handleSignUp}
              name="action"
              type="submit"
              className="tracking-wider group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Get OTP
          </button>
        </div>

        <div hidden={hiddenLoginCheck}>
          <button
            onClick={(_e) => signIn(_e)}
            name="action"
            type="submit"
            className="tracking-wider group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
