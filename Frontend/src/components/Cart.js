import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/cart.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addQuantity, removeProduct, subQuantity } from '../redux/actions/cartAction';
import { Link } from 'react-router-dom';


export default function Cart() {

  const [ cartProductRemoved, setCartProductRemoved ] = useState(false);

  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cart.CartProducts);

  const users = useSelector((state) => state.user);
  const { userData, token } = users;

  const removeProductHandler = (productId) => {
    const updatedCartItems = cartProducts.filter((cartProduct) => cartProduct.id !== productId)
    dispatch(removeProduct(updatedCartItems));
    setCartProductRemoved(true);
  }

  if(cartProductRemoved) {
    toast("Product Removed SuccessFully...")
  }

  const quantityIncreaseHandler = (productId) =>{
    dispatch(addQuantity(productId))
  }

  const quantityDecreaseHandler = (productId) =>{
    dispatch(subQuantity(productId))
  }


  return (
    <div>
      <div className="cart_heading">
        <span>Cart</span>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
      />
      { 
        cartProducts.length === 0 && <div 
        style={{marginTop: '50px', textAlign: 'center', color: 'red'}}>
          <h2 style={{ fontSize: '50px'}}>Cart is Empty</h2>
          </div>
      }
      {
        cartProducts.map((product) => (
          <div key={product.id} className="cartWrapper">
            <div className="cart_Card">
              <img src={product.image} alt="product logo"/>
              <div className='card_right'>
                <div className="product_info">
                  <h5>{product.name}</h5>
                  <span>&#8377; {product.price}</span>
                </div>
                <div className='quantity_change'>
                  <button onClick={() => quantityIncreaseHandler(product.id)}>+</button>
                  <div className='quantity_number'>{product.quantity}</div>
                  <button onClick={() => quantityDecreaseHandler(product.id)}>-</button>
                </div>
                <div className="total_price">
                  <span>Total Price :</span>&#8377; {product.price * product.quantity}
                </div>
                <button
                  className="remove_btn"
                  onClick={() => removeProductHandler(product.id)}
                >
                  Remove
                </button>
              </div>  
            </div>
          </div>
        ))
      }

        <div className="checkout_container">
          <div className='checkout_btn'>
            <Link to="/shipping">
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </div>

    </div>
  )
}
