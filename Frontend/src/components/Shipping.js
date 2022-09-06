import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addShippingAddress } from '../redux/actions/shippingAddressAction';
import '../styles/shipping.css'

export default function Shipping() {

    const dispatch = useDispatch();

    // const [ shippingAddressData, setShippingAddressData ] = useState({});
    const [ isAddressAdded, setIsAddressAdded ] = useState(false)
    const [ shippingData, setShippingData] = useState({
        address : "",
        landmark : "",
        city : "",
        state : "",
        country : "",
        pincode : "",
        phone : ""
      });

      const users = useSelector((state) => state.user);
      const { token } = users;

    const shippingFormHandler = (e) => {

        setShippingData({
            ...shippingData,
            
            [e.target.name]: e.target.value.trim()
          });
    }


    const shippingHandler = async (e) => {
        e.preventDefault();
        try {
            const data = shippingData
            const headers = {
                authorization: `Bearer ${token}`,
            }
            const shippingAddressData = await axios.post("http://localhost:8080/api/v1/auth/shippingaddress",
                data, 
                {headers}
            )
            setIsAddressAdded(true)
            dispatch(addShippingAddress(shippingAddressData.data.data))
            console.log(shippingAddressData.data.data);
        } catch (error) {
            console.log("!!!!Error!!!", error);
        }
    }

      //   useEffect(() => {
  //     fetchShippingAddress();
  // }, []);

    // const fetchShippingAddress = async () => {
    //   try {
    //     const shippingAddress = await axios.get(`http://localhost:8080/api/v1/auth/shippingaddress/${userData.id}`,
    //     {
    //       headers: {
    //         authorization: `Bearer ${token}`,
    //       },
    //     }
    //     );
    //     // dispatch(addShippingAddress(shippingAddress.data.data))
    //     setShippingAddressData(shippingAddress.data.data);
    //   }catch(e) {
    //     console.log('!!!!Error!!!!!!!!!', e)
    //   } 
    // }

    const navigate = useNavigate();

    if(isAddressAdded ) {
      navigate(`/placeorder`);
    }

  return (
    <div>
        <h1 style={{textAlign : "center", marginTop : "10px", color : "black"}}>Shipping Address</h1>

        <div className='shipping_form'>
        <Form className='form' onSubmit={shippingHandler}>
          <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter address"
                name="address"
                required
                onChange={shippingFormHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a Address...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Landmark</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter Landmark"
              name="landmark"
              required
              onChange={shippingFormHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a Landmark...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" >
              <Form.Label>City</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter City"
              name="city"
              required
              onChange={shippingFormHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose City...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" >
              <Form.Label>State</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter State"
                required
                name="state"
                onChange={shippingFormHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a State...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter Country" 
              name="country"
              required
              onChange={shippingFormHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose Country...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter Pincode"
              name="pincode"
              required
              onChange={shippingFormHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose Pincode...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter your Phone Number"
              name="phone"
              required
              onChange={shippingFormHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose Phone number...
              </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
              Submit
          </Button>
        </Form>
        </div>
    </div>
  )
}
