import React, { useEffect, useState } from 'react';
import '../styles/orderhistory.css';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Orderhistory() {

    const [ orderDetailData, setOrderDetailData ] = useState([]);

    const users = useSelector((state) => state.user);
    const { userData, token, } = users;

    useEffect(() => {
        getOrderDetailData();
    }, [])

    // sub OrderDetail data fetching
    const getOrderDetailData = async () => {
        try {
        const orderDetails = await axios.get(`http://localhost:8080/api/v1/auth/orders/${userData.id}`,
        {
            headers: {
            authorization: `Bearer ${token}`,
            },
        }
        );
        setOrderDetailData(orderDetails.data.data);
        }catch(e) {
        console.log('!!!!Error!!!!!!!!!', e)
        } 
    }


  return (
    <div>
        <div style={{marginLeft: '2%', marginTop: '20px', color:'green'}}>
            <h2> ORDERS SUMMERY </h2>
        </div>

        {    
            orderDetailData === [] && 
            <div 
                style={{marginTop: '50px', textAlign: 'center', color: 'red',}}>
                <h2 style={{ fontSize: '50px'}}>No order founds...</h2>
            </div>
                        
        }

        {
            orderDetailData.map((orderData) => {
                const products = JSON.parse(orderData.products)
                return  (
                
                    <div key={orderData.id} style={{ border: '2px solid #E3E3E3', width: '90%', 
                    marginLeft: '5%', marginRight: '5%', marginBottom: '5%', marginTop: '5%' }}>
                        <div style={{marginTop: '50px',}}>
                            <span 
                            style={{marginLeft: '4%', fontWeight: '500',  fontSize: '16px', backgroundColor:'#E3E3E3', 
                            padding: '8px 5% 8px 10px', marginTop: '15px'}}
                            >
                            Shipping Address
                            </span>
                            <div className='buyer_info'>
                                <div> {orderData.shippingaddress.address} </div>
                                <div> {orderData.shippingaddress.city} </div>
                                <div> {orderData.shippingaddress.state} </div>
                                <div> {orderData.shippingaddress.pincode} </div>
                            </div>
                        </div>
                        
                        <div style={{marginTop: '30px',}}>
                            <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
                                <span className='product_header'>
                                Products
                                </span>
                                <span className='product_date'>ORDER DATE : {new Date(orderData.createdAt).toDateString()}</span>
                            </div>    
                        </div>
                        
                        <div className='buyer_info'>
                            <Table striped="columns">
                                <thead>
                                    <tr className='table_headings'>
                                        <th></th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        products.map((productItem) => (
                                            <tr key={productItem.id} className='table_data'>
                                                <td>
                                                    <img style={{width:'50px', height:'50px'}} src={productItem.image} alt='product img'/>
                                                </td>
                                                <td>{productItem.name}</td>
                                                <td>&#8377; {productItem.price}</td>
                                                <td>{productItem.quantity}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>      
                            </Table>
                        </div>
                    </div>
                )
            })
        }
        
        
    </div>
  )
}
