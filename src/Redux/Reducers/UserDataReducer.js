const userLocalData =  JSON.parse(localStorage.getItem('userLocalData'))




export default (state = {
...userLocalData

}, action) => {
    switch (action.type) {
        case "USERDATA": {
         if(action.payload !== null ){
             return {...action.payload}

         }

         else{
             return {...state}
         }
        }
        default:
            return state;
    }
};
