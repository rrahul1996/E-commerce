import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/productdetail.css';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProduct, addQuantity, subQuantity } from '../redux/actions/cartAction';
import { Col, Container, Row } from 'react-bootstrap';

export default function ProductDetailpage() {

    const products = useSelector((state) => state.cart.CartProducts);

    const cartProducts = useSelector((state) => state.cart.CartProducts);

    const users = useSelector((state) => state.user);
    const { token, } = users;
   
    const location = useLocation(); 
    const productId = location.pathname.split("/")[2];

    const [ product_item, setProduct_item] = useState({});
    const [ cartProductAdded, setCartProductAdded ] = useState(false);

    useEffect(() => {
        getProductItem();
    }, [])

    const getProductItem = async () => {
        try {
            const ProductItem = await axios.get(`http://localhost:8080/api/v1/auth/product_by_id/${productId}`,{
            headers: {
                authorization: `Bearer ${token}`,
              },}
            );
            setProduct_item(ProductItem.data.data)
        }
        catch (error) {
            console.log("!!!error!!!", error)
        }
    }

    const dispatch = useDispatch();
    
    const addProductHandle = (product) => {
        const newProductsArray = [...products];
        newProductsArray.push({
            name : product.product_name,
            price : product.product_price,
            id: product.id,
            image : product.product_image,
            quantity: product.product_quantity
        });
        dispatch(addProduct(newProductsArray));
        setCartProductAdded(true);
    }

    if(cartProductAdded) {
        toast("Product Added Succefully...")
    }

    const quantityIncreaseHandler = (productId) =>{
        dispatch(addQuantity(productId))
    }

    const quantityDecreaseHandler = (productId) =>{
        dispatch(subQuantity(productId))
    }
    
  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={1000}
      />
        <div className="containerPost">
            <div className="post-container">
                    <div className="post-img">
                        <img
                            src={product_item.product_image}
                            alt="product img"
                            className="postImgBox"
                        />
                    </div>
                
                    <div className="post-desc">
                        <div className="titleheading">
                            <div className="title">{product_item.product_name}</div>
                        </div>
                        <div className="desc">
                            <p>{product_item.product_description}</p>
                        </div>
                        <div className="price">
                            <span className="price-tag">&#8377;{product_item.product_price}</span>
                        </div>
                        <div className="addtocart">
                            <button
                                className="addtocartbtn"
                                onClick={() => addProductHandle(product_item)}
                                >
                                {
                                    products.some(product => product.id === product_item.id) ? "Selected" : "Add To Cart"
                                }
                            </button>
                            {
                            cartProducts.map((product) => (
                                product.id === product_item.id ? (
                                    <div className='quantity'>
                                        <button onClick={() => quantityIncreaseHandler(product.id)}>+</button>
                                        <div className='quantity_number'>{product.quantity}</div>
                                        <button onClick={() => quantityDecreaseHandler(product.id)}>-</button>
                                    </div>
                                ) : null
                            ))
                            }
                        </div>
                        
                    </div>
            </div>
        </div>
    </>
  )
}
