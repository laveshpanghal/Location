export const setArticle = (data) => (dispatch) => {
  dispatch({
    type: "SET_ARTICLE",
    payload: data,
  });
};
