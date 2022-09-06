import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/footer.css'

export default function Footer() {
  return (
    <>
        <div className="footer">
            <div className="footer_container">
                <Container>
                    <Row>
                        <Col lg='3' md='4' sm='12'>
                            <div className='footer_content'>
                                <h4>ABOUT</h4>
                                <p>Contact us</p>
                                <p>About us</p>
                                <p>Career</p>
                                <p>Stories</p>
                                <p>Corporate Information</p>
                            </div>
                        </Col>
                        <Col lg='3' md='4' sm='12'>
                            <div className='footer_content'>
                                <h4>HELP</h4>
                                <p>Payment</p>
                                <p>Shipping</p>
                                <p>Cancellation & Shipping</p>
                                <p>Stories</p>
                            </div>
                        </Col>
                        <Col lg='3' md='4' sm='12'>
                            <div className='footer_content'>
                                <h4>POLICY</h4>
                                <p>Return Policy</p>
                                <p>Security</p>
                                <p>Privacy</p>
                                <p>Sitemap</p>
                            </div>
                        </Col>
                        <Col lg='3' md='4' sm='12'>
                            <div className='footer_content'>
                                <h4>SOCIAL</h4>
                                <p>Facebook</p>
                                <p>Twitter</p>
                                <p>Youtube</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    </>
  )
}
