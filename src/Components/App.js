import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ListRequest from "./ListRequest";
import CreateRequest from "./CreateRequest";
import Events from "./Events/Events";
import HomePage from "./HomePage/HomePage";

 import GetEvent from "./GetEvent";
import Login from "./Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Navbar from "./Navbar/Navbar";
import Track from "./Track/Track";
import Editor from "./Editor/Editor";
import BottomBar from "./BottomBar/BottomBar";
import Article from "./Article/Article";
import GetArticle from "./GetArticle/GetArticle";
import CreateEvent from "./CreateEvent/CreateEvent";
import PageNotFound from "../Components/PageNotFound/PageNotFound";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddressAutoFill from "./AddressAutoFill/AddressAutoFill";
import GetOrgEvent from "./GetOrgEvent";
import OrgRequest from "./OrgRequest/OrgRequest";

const App = ({}) => {
    return (

        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute exact path="/event/:id/:orgId" component={GetEvent} />
                <PrivateRoute exact path="/org/event/:id/:orgId" component={GetOrgEvent} />
                <PrivateRoute exact path="/dashboard" component={Events}/>
                <PrivateRoute exact path="/createEvent" component={CreateEvent}/>
                <PrivateRoute exact path="/requests" component={ListRequest}/>
                <PrivateRoute exact path="/org/track" component={OrgRequest}/>
                <PrivateRoute exact path="/createRequest" component={CreateRequest}/>
                <PrivateRoute exact path="/org/requests" component={Track} />
                <PrivateRoute exact path="/editor" component={Editor}/>
                {/*<PrivateRoute exact path="/articles" component={Article} />*/}
                {/*<PrivateRoute*/}
                {/*  exact*/}
                {/*  path="/articles/:time/:key"*/}
                {/*  component={GetArticle}*/}
                {/*/>*/}
                <Route component={PageNotFound}/>
            </Switch>
            <BottomBar/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Router>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        history: ownProps.history,

    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
