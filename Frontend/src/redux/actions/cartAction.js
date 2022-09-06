import { ADD_PRODUCT, REMOVE_PRODUCT, ADD_QUANTITY, SUB_QUANTITY, EMPTY_PRODUCT_CART} from "../constants";

export const addProduct = (product) => {
    return {
      type: ADD_PRODUCT,
      payload: product,
    };
};

export const removeProduct = (updatedProducts) => {
    return {
      type: REMOVE_PRODUCT,
      payload: updatedProducts,
    };
};

export const addQuantity = (productId) => {
  return {
    type: ADD_QUANTITY,
    payload: productId,
  };
};

export const subQuantity = (productId) => {
  return {
    type: SUB_QUANTITY,
    payload: productId,
  };
};

export const emptyCartProduct = () => {
  return {
    type: EMPTY_PRODUCT_CART,
  };
};