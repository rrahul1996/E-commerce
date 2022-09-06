import { ADD_PRODUCT, REMOVE_PRODUCT, ADD_QUANTITY, SUB_QUANTITY, EMPTY_PRODUCT_CART } from "../constants";

const initialState = {
    CartProducts: [],
};   

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PRODUCT:
         return { ...state, CartProducts: action.payload};
      case REMOVE_PRODUCT:
        return { CartProducts: action.payload};   
      case ADD_QUANTITY: 
        return {...state, 
          CartProducts: state.CartProducts.map((product) => 
          product.id === action.payload ? {...product, quantity:product.quantity + 1} : product
          )}
      case SUB_QUANTITY: 
        return {...state, 
          CartProducts: state.CartProducts.map((product) => 
          product.id === action.payload ? {...product, quantity:product.quantity - (product.quantity > 1 ? 1 : 0)} : product
          )}
      case EMPTY_PRODUCT_CART:
        return {...state, CartProducts: []}  
      default:
        return state;
    }
};

