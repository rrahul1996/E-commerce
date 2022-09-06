import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles/home.css';
import Slide from './Slide';
import { Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

export default function Home() {

    const users = useSelector((state) => state.user);
  
    const { token, } = users

    const [ product, setProduct] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
      try { 
        const products = await axios.get("http://localhost:8080/api/v1/auth/products", {
          headers: {
            authorization: `Bearer ${token}`,
          },}
          )
        setProduct(products.data.data)
      }
      catch(err){
        console.log('!!!!Error!!!!!!!!!', err)
      }
  }

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      
  return (
    <>
        <div className='carousel'>
            <Carousel>
                <Carousel.Item interval={2000} className='carousel_item'>
                    <img
                    className="d-block w-100"
                    src="assets/img1.png"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2000} className='carousel_item'>
                    <img
                    className="d-block w-100"
                    src="assets/img2.png"
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2000} className='carousel_item'>
                    <img
                    className="d-block w-100"
                    src="assets/img3.png"
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2000} className='carousel_item'>
                    <img
                    className="d-block w-100"
                    src="assets/img4.png"
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
        <div>
            <h3 className='product_heading'>Products</h3>
            <div className='product_slider'>
              <div className='carousel_top'>
                  <Link to='/filter'>
                    <Button variant="contained" color="primary">View All</Button>
                  </Link>
              </div>
                <Slider {...settings}>
                    {
                        product.map((productItems) => (
                            <div key={productItems.id}>
                                <div className='card'>
                                  <Link to={`/productdetail/${productItems.id}`}>
                                    <img src={productItems.product_image} alt='Product logo'/>
                                  </Link>
                                    <div className='product_name'>
                                        <p>{productItems.product_name}</p>
                                    </div>
                                    <p>{productItems.product_description}</p>
                                    <div className='product_price'>
                                        <span>&#8377; {productItems.product_price}</span>
                                        {/* <button>Buy now</button> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    
                </Slider>
            </div>
        </div>

        <Slide product={product}/>
    </>
  )
}
