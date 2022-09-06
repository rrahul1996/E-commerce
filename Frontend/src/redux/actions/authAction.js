import { USER_SIGNUP, USER_SIGNIN, USER_LOGOUT, USER_BALANCE } from "../constants";

export const userSignUp = (userSignupData) => {
    return {
      type: USER_SIGNUP,
      payload: userSignupData,
    };
  };
  
  export const userSignIn = (userSigninData) => {
    return {
      type: USER_SIGNIN,
      payload: userSigninData,
    };
  };

  export const userLogout = () => {
    return {
      type: USER_LOGOUT,
    };
  };

  export const userWalletBalance = (userWalletBalance) => {
    return {
      type: USER_BALANCE,
      payload: userWalletBalance,
    };
  };