import React, { useState } from 'react';
import axios from 'axios';
import { Container, Nav, Navbar } from 'react-bootstrap';
import '../styles/header.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout, userWalletBalance } from '../redux/actions/authAction';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from '@mui/material/Modal';
import { emptyCartProduct } from '../redux/actions/cartAction';


export default function Header() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 200,
        backgroundColor: '#8bb18b',
        boxShadow: 24,
        p: 4,
        borderRadius:'5px',
      };
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [oopen, setOopen] = useState(false);
    const [amount, setAmount] = useState(0);  

    const handleOopen = () => setOopen(true);
    const handleCclose = () => setOopen(false);

    const cartProducts = useSelector((state) => state.cart.CartProducts);
    const users = useSelector((state) => state.user);
    const { userData, userLoggedIn, token } = users;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(userLogout());
        dispatch(emptyCartProduct());
    }

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // const navigate = useNavigate();

    // if (!userLoggedIn) {
    //     navigate("/signin");
    // }

    // const handleAmount = (e) => {
    //     e.preventDefault();
    
    //     setAmount(e.target.value);
    // }

    const topUpHandler = async () => {

        try {
           const  data = {
                id: userData.id,
                amount: amount
            }
            const headers = {
                authorization: `Bearer ${token}`,
            }
           const walletBalance = await axios.put ("http://localhost:8080/api/v1/auth/updatewallet", 
                data , 
                {headers}
            );
            console.log(walletBalance.data.data);
            dispatch(userWalletBalance(walletBalance.data.data))
        } catch (error) {
            console.log("!!!Error!!!", error);
        }
    }

  return (
    <div>
        <Navbar bg="light" expand="lg" className='navbar'>
            <Container>
                <Navbar.Brand className='home_logo'>
                    <Link to="/">
                        <img
                            className='nav_logo'
                            src='assets/ekart.png'
                            alt='ekart logo'
                        />
                    </Link>
                    <Link to="/cart">
                        <Badge color="secondary" badgeContent={cartProducts.length}>
                            <ShoppingCartIcon color="secondary" 
                                className='me-auto' 
                                style={{marginLeft: '17px'}}
                            ></ShoppingCartIcon>
                        </Badge>
                    </Link>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto nav_tabs">
                        <Nav.Link className='terms'>
                            terms & conditions
                        </Nav.Link>
                        {
                            userLoggedIn ? (
                            // <Nav.Link className='user_name'
                            // >
                            //     {userData.first_name}
                            // </Nav.Link>
                            <div style={{display: 'flex', }} className='nav_links'>
                                <Link to="/orderhistory" style={{marginTop: '6px'}}>
                                    <span className='order_btn'>
                                        My orders
                                    </span>
                                </Link>
                                <Nav.Link className='wallet_btn' onClick={handleOopen}>
                                    Wallet Balance
                                </Nav.Link>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? "basic-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    style={{backgroundColor:'#7fa97f', color:'#FFFFFF', 
                                    fontWeight:'bold', padding:'4px 19px 4px 19px'}}
                                    className='user_btn'
                                    onClick={handleClick}
                                >
                                {userData.first_name}
                                </Button>
                                
                                <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                                >
                                <Link to={"/"} className="link">
                                    <MenuItem onClick={handleClose}>
                                        <Nav.Link className='Logout_btn'
                                            onClick={logoutHandler}
                                            >
                                                Logout
                                        </Nav.Link>
                                    </MenuItem>
                                </Link>
                                </Menu>
                            </div>
                            ) : (<Nav.Link className='Login_btn'>
                                <Link to='/signin'>
                                    Login
                                </Link>
                            </Nav.Link>)
                        }
                            
                        {/* {
                            userLoggedIn ? (
                                <Nav.Link className='Logout_btn'
                                onClick={logoutHandler}
                                >
                                    Logout
                                </Nav.Link>
                            ): null
                        } */
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Modal
            open={oopen}
            onClose={handleCclose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <div style={style}>
            <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                <label style={{fontWeight: 'bold'}}>Amount : </label>
                <input type="number" onChange={(e) => setAmount(e.target.value)}
                style={{width: '50%', marginLeft: '25%', marginTop:'5%'}}
                />
                <button 
                style={{
                width: '20%', 
                height: '35px',
                borderRadius: '5px',
                marginLeft: '25%', 
                marginTop:'5%', 
                border: 'none', 
                backgroundColor:'#0070CC'}}
                onClick={topUpHandler}
                >
                    Top up
                </button>
                <div style={{marginLeft: '-10%'}}>
                    <p id="modal-modal-description" sx={{ mt: 2 }}
                        style={{marginTop: '30px', fontWeight:'bold', fontSize:'20px'}}
                    >
                        Total Balance: &#8377; {userData.user_wallet_balance}
                    </p>
                </div>
                
            </div>
        </div>
      </Modal>
    </div>
  )
}
