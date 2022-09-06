import { ADD_SHIPPING_ADDRESS } from "../constants";

export const addShippingAddress = (shippingAddress) => {
    return {
      type: ADD_SHIPPING_ADDRESS,
      payload: shippingAddress,
    };
};