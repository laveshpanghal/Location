

export const getError = (error) => (dispatch) => {
    dispatch(setError(error));
};

export function setError(data) {
    return {
        type: "GET_ERRORS",
        payload: data,
    };
}
