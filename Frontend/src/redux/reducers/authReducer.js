import { USER_SIGNUP, USER_SIGNIN, USER_LOGOUT, USER_BALANCE } from "../constants";

const initialState = {
    userData: [],
    userLoggedIn : false,
    token:""
};   

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_SIGNUP:
        return {...state, userData: action.payload };
      case USER_SIGNIN:
        return { ...state, userData: action.payload, userLoggedIn: true, token:action.payload.token};
      case USER_BALANCE: 
        return { ...state, userData: action.payload};
      case USER_LOGOUT:
        return {...state, userData: [], userLoggedIn: false, token:""};  
      default:
        return state;
    }
};