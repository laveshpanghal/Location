import React, {useEffect, useState, Fragment} from "react";
import {API} from "aws-amplify";
import List from "../List/List";
import firestoreDb from "../../index";
import firebase from "firebase/compat";
import {setAuth} from "../../Redux/Actions/AuthAction";
import {SetUserData} from "../../Redux/Actions/UserDAtaAction";
import OrgList from "../List/OrgList";
import {connect} from "react-redux";



const Events = ({auth, userData}) => {


    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchEvents();
    }, [userData]);


    // useEffect(() => {
    //     if (auth) {
    //         console.log(auth)
    //
    //         firestoreDb.collection("Users").doc(firebase.auth().currentUser.uid).get().then(
    //             (doc) => {
    //                 SetUserData(doc.data())
    //                 console.log(doc.data())
    //             }
    //         )
    //     }
    // }, [auth]);

    function fetchEvents() {
        setLoading(true);

        if (userData.role === "organisation") {
            firestoreDb.collection("eventData").where("organizerId", "==", firebase.auth().currentUser.uid).get()
                .then((res) => {
                    const events = res.docs
                    setEvents(events);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            firestoreDb.collection("eventData").get().then((res) => {
                const events = res.docs
                setEvents(events);
                setLoading(false);
            })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <Fragment>
            {userData.role === 'organisation' ?  <OrgList loading={loading} events={events}/> :
                <List loading={loading} events={events}/>}
        </Fragment>
    );

};
const mapStateToProps = (state, ownProps) => {


    return {
        auth: state.firebase.auth,
        userData: state.userData

    };
};

const mapDispatchToProps = {
    setAuth, SetUserData
};
export default connect(mapStateToProps, mapDispatchToProps)(Events);