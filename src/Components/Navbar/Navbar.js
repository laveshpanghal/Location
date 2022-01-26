import React, {useEffect, useState} from "react";
import {Route, NavLink} from "react-router-dom";
//import { Auth } from "aws-amplify";
import {useFirebase, isLoaded, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";
import {setAuth} from "../../Redux/Actions/AuthAction";
import {SetUserData} from "../../Redux/Actions/UserDAtaAction";

const Navbar = ({auth, history,userData}) => {
    const firebase = useFirebase();
    const [toggle, setToggle] = useState(false);
    const[isHidden,setIsHidden]=useState(true);


   useEffect(()=>{

       console.log(userData.role)

       if(userData.role==="individual"){
           setIsHidden(false);
           console.log("individual")
       }
       else if(userData.role==="organisation"){
           setIsHidden(true);
           console.log("org")
       }

   })

    const routes = [
        {
            path: "/",
            main: () => <h2>SheZh</h2>,
            exact: true,
            strict: true,
        },
        {
            path: "/event/:id",
            main: () => <h2>Vehicles</h2>,
            exact: false,
            strict: false,
        },
        {
            path: "/org/event/:id",
            main: () => <h2>Vehicles</h2>,
            exact: false,
            strict: false,
        },
        {
            path: "/dashboard",
            main: () => <h2>Vehicles</h2>,
            exact: true,
            strict: true,
        },
        {
            path: "/requests",
            main: () => <h2>Request</h2>,
            exact: true,
            strict: true,
        },
        {
            path: "/org/requests",
            main: () => <h2>Request</h2>,
            exact: true,
            strict: true,
        },
        {
            path: "/createEvent",
            main: () => <h2>Request</h2>,
            exact: true,
            strict: true,
        },
        {
            path: "/articles",
            main: () => <h2>Article</h2>,
            exact: true,
            strict: true,
        },
        {
            path: "/articles/:time/:key",
            main: () => <h2>Article</h2>,
            exact: true,
            strict: true,
        },
        {
            path: "/learn",
            main: () => <h2>Learn</h2>,
            exact: true,
            strict: true,
        },
        {
            path: "/locate",
            main: () => <h2>Locate</h2>,
            exact: true,
            strict: true,
        },
    ];

    function toggleMenu() {
        setToggle(!toggle);
    }

    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-4 md:mt-5 z-20">
                <div className="pb-1 flex flex-row items-center justify-center">
          <span className="md:hidden w-8 ml-2" onClick={() => toggleMenu()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
              <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
              />
            </svg>
          </span>
                    <span
                        className="text-black-400 md:font-bold font-semibold text-3xl md:text-4xl ml-2 mb-1 sm:mb-0 tracking-wide">
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    children={<route.main/>}
                    exact={route.exact}
                    strict={route.strict}
                />
            ))}
          </span>
                </div>
                <div className="md:flex items-center justify-between mr-6 md:mr-32 hidden">
                    {isLoaded(auth) && !isEmpty(auth) ? (

                        <div className="flex items-center justify-between w-full">

                            <NavLink hidden={!isHidden}
                                className="mr-2 md:ml-16 font-semibold text-base md:text-lg hover:text-blue-400"
                                activeClassName="md:text-lg py-2 px-4 md:py-2 md:px-6 md:font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700"
                                to="/createEvent"
                            >
                                Add Vehicle
                            </NavLink>
                            <NavLink hidden={isHidden}
                                className="mr-2 md:ml-16 font-semibold text-base md:text-lg hover:text-blue-400"
                                activeClassName="md:text-lg py-2 px-4 md:py-2 md:px-6 md:font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700"
                                to="/requests"
                            >
                                Requests
                            </NavLink>
                            <NavLink hidden={!isHidden}
                                     className="mr-2 md:ml-16 font-semibold text-base md:text-lg hover:text-blue-400"
                                     activeClassName="md:text-lg py-2 px-4 md:py-2 md:px-6 md:font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700"
                                     to="/org/requests"
                            >
                                Requests
                            </NavLink>
                            <NavLink
                                className="mr-2 md:ml-16 font-semibold text-base md:text-lg hover:text-blue-400"
                                activeClassName="md:text-lg py-2 px-4 md:py-2 md:px-6 md:font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700"
                                to="/dashboard"
                            >
                                Vehicles
                            </NavLink>
                            <NavLink
                                className="mr-2 md:ml-16 font-semibold text-base md:text-lg hover:text-blue-400"
                                activeClassName="md:text-lg py-2 px-4 md:py-2 md:px-6 md:font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700"
                                to="/editor"
                            >
                                Editor
                            </NavLink>
                            <div className="md:mr-4 md:ml-16">
                                <button
                                    className="mr-2 font-semibold text-base md:text-lg hover:text-blue-400"
                                    onClick={() => {
                                        firebase.logout().then(
                                            ()=>
                                                localStorage.removeItem('userLocalData')


                                        );
                                        history.push("/login");
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </nav>
            {toggle ? (
                <div className="inset-0 top-16 w-1/2 z-10 absolute bg-white">
                    {isLoaded(auth) && !isEmpty(auth) ? (
                        <div className="flex flex-col items-start justify-center leading-8 tracking-wide w-full">
                            <NavLink hidden={isHidden}
                                className="w-full mr-2 font-semibold text-base md:text-lg hover:text-blue-400 px-6 py-2"
                                activeClassName="md:text-lg py-2 px-4 md:py-2 md:px-6 md:font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                to="/requests"
                            >
                                Requests
                            </NavLink>
                            <NavLink hidden={!isHidden}
                                className="w-full mr-2 md:ml-16 font-semibold text-base md:text-lg hover:text-blue-400 px-6 py-2"
                                activeClassName="md:text-lg py-2 px-4 md:py-2 md:px-6 md:font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                to="/createEvent"
                            >
                                Create Event
                            </NavLink>
                            <NavLink
                                className="w-full mr-2 md:ml-16 font-semibold text-base md:text-lg hover:text-blue-400 px-6 py-2"
                                activeClassName="md:text-lg py-2 px-4 md:py-2 md:px-6 md:font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                to="/dashboard"
                            >
                                Event
                            </NavLink>
                            <NavLink
                                className="w-full mr-2 md:ml-16 font-semibold text-base md:text-lg hover:text-blue-400 px-6 py-2"
                                activeClassName="md:text-lg py-2 px-4 md:py-2 md:px-6 md:font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                to="/editor"
                            >
                                Editor
                            </NavLink>
                            <NavLink
                                className="w-full mr-2 md:ml-16 font-semibold text-base md:text-lg hover:text-blue-400 px-6 py-2"
                                activeClassName="md:text-lg py-2 px-4 md:py-2 md:px-6 md:font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                to="/articles"
                            >
                                Articles
                            </NavLink>
                            <div className="md:mr-4 md:ml-16">
                                <button
                                    className="mr-2 font-semibold text-base md:text-lg hover:text-blue-400 px-6 py-2"
                                    onClick={() => {
                                        firebase.logout();
                                        history.push("/login");
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        history: ownProps.history,
        auth: state.firebase.auth,
        userData: state.userData
    };
};

const mapDispatchToProps = {
    setAuth, SetUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

