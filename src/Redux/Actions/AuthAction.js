export const setAuth = (data) => (dispatch) => {
  dispatch({
    type: "SET_AUTH",
    payload: data,
  });
};
