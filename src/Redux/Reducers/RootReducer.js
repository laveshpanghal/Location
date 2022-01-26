import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ArticleReducer from "./ArticleReducers";
import { firebaseReducer } from "react-redux-firebase";
import UserDataReducer from "./UserDataReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: AuthReducer,
  article: ArticleReducer,
  errors: errorReducer,
  userData:UserDataReducer,
  firebase: firebaseReducer,
});
