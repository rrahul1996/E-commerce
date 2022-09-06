import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userWalletBalance } from '../redux/actions/authAction';
import '../styles/placeorder.css';
import { ToastContainer } from 'react-bootstrap';
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { emptyCartProduct } from '../redux/actions/cartAction';

export default function PlaceOrder() {

    // const location = useLocation(); 
    // const shippingAddressId = location.pathname.split("/")[2];

    // const [ shippingAddressData, setShippingAddressData ] = useState({});

    const cartProducts = useSelector((state) => state.cart.CartProducts);

    const totalQuantity = cartProducts.map((products) => products.quantity ).reduce((acc, curr) => acc + curr, 0);
    
    const totalAmount = cartProducts.map((products) => products.price * products.quantity).reduce((acc, curr) => acc + curr, 0);
    
    const users = useSelector((state) => state.user);
    const { userData, token } = users;

    // getting address data from redux store
    const shippingAddress = useSelector((state) => state.shippingAddress);
    const { shippingAddressData } = shippingAddress;

    const [ isOrderCreated, setIsOrderCreated ] = useState("");

    // useEffect(() => {
    //     fetchShippingAddress();
    // }, []);

    
    // const fetchShippingAddress = async () => {
    //     try {
    //       const shippingAddress = await axios.get(`http://localhost:8080/api/v1/auth/shippingaddress/${userData.id}`,
    //       {
    //         headers: {
    //           authorization: `Bearer ${token}`,
    //         },
    //       }
    //       );
    //       setShippingAddressData(shippingAddress.data.data);
    //     }catch(e) {
    //       console.log('!!!!Error!!!!!!!!!', e)
    //     } 
    //   }

      // CheckOutAPI...

      const dispatch = useDispatch();

      const checkOutHandler = async () => {
        try {
          if(userData.user_wallet_balance === 0) {
            alert ("Your wallet is empty please Top up the Wallet Balance");
            return
          }

          if(userData.user_wallet_balance < totalAmount) {
            alert ("Not enough balance");
            return
          }

          const  data = {
            userId : userData.id,
            products : cartProducts,
            shippingaddress_id : shippingAddressData.id
          }
          const headers = {
              authorization: `Bearer ${token}`,
          }
    
          const checkOutData = await axios.post("http://localhost:8080/api/v1/auth/createorder",
            data , 
            {headers}
          )
          dispatch(userWalletBalance(checkOutData.data.data));
          dispatch(emptyCartProduct())
          console.log(checkOutData.data.data);
          setIsOrderCreated(checkOutData.data.message)
          // setIsOrderCreated(true);
        } 
        catch (error) {
          console.log("!!!Error!!!", error);
          console.log(error.message);
        }
      }

    const navigate = useNavigate();

    if (isOrderCreated) {
      navigate("/orderhistory");
    }  

    if (isOrderCreated !== "") {
      alert("Order created successfully");
    }

  return (
    <div>
     <ToastContainer
        position="top-center"
        autoClose={1000}
      />
        <div style={{marginLeft: '5%', marginTop: '20px', color:'green'}}>
            <h2>ORDERS PREVIEW</h2>
        </div>

        <div>
            <div className="shipping_details">
                <h3>Shipping Detail</h3>
                <div className="name"><span style={{fontWeight: 'bold'}}>Name : </span><span>{`${userData.first_name} ${userData.last_name}`}</span></div>
                <div className="address">
                    <span style={{fontWeight: 'bold'}}>Address : </span><span>{`${shippingAddressData.address}, ${shippingAddressData.city},
                     ${shippingAddressData.state}, ${shippingAddressData.country}`}</span>
                </div>
                <div className="address">
                    <span style={{fontWeight: 'bold'}}>Landmark : </span><span>{shippingAddressData.landmark}</span>
                </div>
                <div className="address">
                    <span style={{fontWeight: 'bold'}}>Pincode : </span><span>{shippingAddressData.pincode}</span>
                </div>
            </div>

            <div className="order_details">
                <h3>Order Details</h3>
                <div className="item_quantity">
                    <span style={{fontWeight: 'bold'}}>Items Quantity : </span> <span>{totalQuantity}</span>
                </div>
                <div className="Subtotal">
                    <span style={{fontWeight: 'bold'}}>Subtotal : </span> <span>&#8377; {totalAmount}</span>
                </div>
                <div>
                <div className='place_order_btn'>
                    <button onClick={checkOutHandler}>Place Order</button>
                </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}
