import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/productdetail.css';
import { useDispatch, useSelector } from "react-redux";
import {addProduct} from '../redux/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col } from 'react-bootstrap';

export default function ProductCard(props) {
    const { product, label } = props;

  return (
    <Col lg='3' md='6' sm='12'>
        <>{label}</>
    <div key={product.id} className='product_card'>
      <Link to={`/productdetail/${product.id}`}>
        <img src={product.product_image} alt='Not found'/>
      </Link>
      
      <div className='product_detail'>
        <h4 className='title'>{product.product_name}</h4>
        <p>{product.product_description}</p>
      </div>
      
      <div className='price_product'>
        <span>&#8377; {product.product_price}</span>
        <button>Buy now</button>
      </div>
    </div>
  </Col>
  )
}
