import React, {useEffect, useState} from "react";
import {setAuth} from "../../Redux/Actions/AuthAction";
import {SetUserData} from "../../Redux/Actions/UserDAtaAction";
import {connect} from "react-redux";
import SignUpForm from "../SignUpForm/SignUpForm";
import ConfirmSignUp from "../ConfirmSignUp/ConfirmSignUp";
import SignInForm from "../SignInForm/SignInForm";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";
import firestoreDb from "../../index";
import moment from "moment";
import {useHistory} from "react-router-dom";
import {useFirebase, isLoaded, isEmpty} from "react-redux-firebase";
import firebase from "firebase/compat";


const Login = ({setAuth, history, auth, SetUserData,userData}) => {
    let historyIs = useHistory();
    const firebaseReactRedux = useFirebase();

    const initialFormState = {
        password: "",
        phone_number: "",
        address: "",
        otp: "",
        location: "",
        firstName: "",
        lastName: "",
        updatedAt: "",
        role:"individual",
        workAs:null
    };
    const [formType, setFormType] = useState("signUp");
    const [signUpData, setSignUpData] = useState(initialFormState);
    const [final, setFinal] = useState("");
    const [address, setAddress] = useState();
    const[hiddenCheck, setHiddenCheck] =useState(true);
    const[hiddenLoginCheck, setHiddenLoginCheck] =useState(true);
    const[temp,setTemp]=useState(null)


    function handleMapInput(name, value) {
        setSignUpData(() => ({
            ...signUpData,
            location: JSON.stringify(value),
        }));
    }

    function handleAddress(address, state, city) {
        const Address = {
            address: address,
            state: state,
            city: city,
        };
        setAddress(JSON.stringify(Address));
    }
    function handleWasteSpace(wasteSpace) {
        console.log(wasteSpace)
      setTemp(wasteSpace)
        console.log(temp)
    }


    function onChange(e) {
        e.persist();
        setSignUpData(() => ({
            ...signUpData,
            [e.target.name]: e.target.value,
        }));

    }

    async function signUp(
        e,
        {phone_number, location, password, firstName, lastName, otp,role},
        setFormType,
        address,
        final,
    ) {
        e.preventDefault();
        try {
            if (otp === null || final === null) return;
            final
                .confirm(otp)
                .then(async (result) => {
                    console.log(temp,'asdasdasd')

                    var credential = firebase.auth.PhoneAuthProvider.credential(result.verificationId, otp);
                    const user = result.user;

                    firestoreDb
                        .collection("Users")
                        .doc(firebase.auth().currentUser.uid)
                        .set({
                            phoneNumber: phone_number,
                            firstName: firstName,
                            location: location,
                            role:role,
                            address,
                            worksAs:temp
                        })
                        .then(() => {
                            firestoreDb.collection("Users").doc(firebase.auth().currentUser.uid).get().then(
                                (doc) => {
                                    SetUserData(doc.data())

                                }
                            ).then(()=>{
                                setAuth(result)
                            })

                        });
                })
                .catch((err) => {
                    throw err;
                    alert("Wrong code");
                });
        } catch (err) {
            throw err;
        }
    }

    async function handleSignUp(e, {phone_number}) {
        e.preventDefault();
        try {
            let appVerifier = new firebase.auth.RecaptchaVerifier(
                "recaptcha-container",
                {size: "invisible"}
            );
            firebase
                .auth()
                .signInWithPhoneNumber("+91" + phone_number, appVerifier)
                .then((result) => {
                    setFinal(result);
                    setHiddenCheck(false)
                    setHiddenLoginCheck(false)
                   renderToast("Code Sent");
                    console.log("Success");

                });
        } catch (err) {
            console.log(err);
            window.location.reload();
        }
    }

    async function signIn(e, {phone_number, otp}, final) {
        e.preventDefault();
        try {
            firestoreDb
                .collection("Users")
                .where("phoneNumber", "==", phone_number)
                .get()
                .then((doc) => {
                    if (doc.empty === true) {
                        renderToastError("Please SignUp first!!!");
                        return;
                    } else {
                        if (otp === null || final === null) return;
                        final
                            .confirm(otp)
                            .then((result) => {
                                // var credential = firebase.auth.PhoneAuthProvider.credential(result.verificationId, otp);
                                // const user = result.user;
                                setAuth(result);
                                firestoreDb.collection("Users").doc(firebase.auth().currentUser.uid).get().then(
                                    (doc) => {
                                        SetUserData(doc.data())
                                    }
                                )
                            })
                            .catch((err) => {
                                throw err
                                //alert("Wrong code");
                            });
                    }
                });
            // if((firestoreDb.collection("Users").where("phoneNumber","==",phone_number).get()) {
        } catch (err) {
            throw err;
            renderToastError("Something went wrong!");
        }
    }



    function renderToastError(text) {
        toast.error(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function renderToast(text) {
        toast.success(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function renderForm() {
        switch (formType) {
            case "signUp":
                return (
                    <SignUpForm
                        signUp={(e) => signUp(e, signUpData, setFormType, address, final)}
                        handleSignUp={(e) => handleSignUp(e, signUpData)}
                        onChange={onChange}
                        hiddenCheck={hiddenCheck}
                        handleMapInput={handleMapInput}
                        handleAddress={handleAddress}
                        setFormType={setFormType}
                        signUpData={signUpData}
                        handelWasteSpace={handleWasteSpace}
                        renderToast={renderToast}
                        renderToastError={renderToastError}

                    />
                );
            // case "confirmSignUp":
            //   return (
            //     <ConfirmSignUp
            //       confirmSignUp={(e) => confirmSignUp(e, signUpData, setFormType)}
            //       onChange={onChange}
            //       setFormType={setFormType}
            //     />
            //   );
            case "signIn":
                return (
                    <SignInForm
                        signIn={(e) => signIn(e, signUpData, final)}
                        handleSignUp={(e) => handleSignUp(e, signUpData)}
                        onChange={onChange}
                        setFormType={setFormType}
                        hiddenLoginCheck={hiddenLoginCheck}
                        renderToast={renderToast}
                        renderToastError={renderToastError}
                    />
                );
            default:
                return null;
        }
    }

    if (isLoaded(auth) && !isEmpty(auth)) {
        return <Redirect to="/dashboard"/>;
    }

    return (
        <div className="container mx-auto flex items-center justify-center pb-10 lg:py-16">
            {renderForm(formType)}
            <div id="recaptcha-container"/>
        </div>
    );
};
const mapStateToProps = (state, ownProps) => {


    return {
        auth: state.firebase.auth,
        history: ownProps.history,

    };
};

const mapDispatchToProps = {
    setAuth, SetUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
