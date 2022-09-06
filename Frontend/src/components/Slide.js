import React from 'react';
import Slider from "react-slick";
import { Divider } from '@mui/material';
import '../styles/slide.css';
import { Link } from 'react-router-dom';

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

export default function Slide({product}) {

  // const allProducts = useSelector((state) => state.products.products);

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
        <div style={{marginTop : '50px', background: '#f1f3f6'}}>
            <div className='carousel_top'>
                <p style={{fontSize: '22px', fontWeight : '500', 
                marginTop: '20px', marginLeft : '10px', 
                background: '#a3d1a3',padding: '3px 30px 3px 5px'}}>
                  Recently Added
                </p>
            </div>
            <Divider />
           <Slider {...settings} >
            {
              product && product.reverse().slice(0 , 4).map((productItems) => (
                <div key={productItems.id}>
                  <div className='category_product'>
                      <Link to={`/productdetail/${productItems.id}`}>
                        <img 
                          src={productItems.product_image} 
                          alt='product logo'
                        />
                      </Link>
                      <p>{productItems.product_name}</p>
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
    </>
  )
}
