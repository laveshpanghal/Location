export default (state = {}, action) => {
  switch (action.type) {
    case "SET_ARTICLE":
      return [...action.payload];
    default:
      return state;
  }
};
