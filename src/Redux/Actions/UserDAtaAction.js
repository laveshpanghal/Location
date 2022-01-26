export const SetUserData = (data) => (dispatch) => {

    localStorage.setItem("userLocalData",JSON.stringify(data))

    dispatch({
        type: "USERDATA",
        payload: data,
    });
};
