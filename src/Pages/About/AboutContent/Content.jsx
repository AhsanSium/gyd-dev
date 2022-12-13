import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import VideoChatMain from '../../../components/VideoChat/VideoChatMain';
import './Content.css';

const Content = () => {
    return (
        <section className="about-content-sec">
            <Container>
                <Row>
                    <Col md={12} lg={8} lg={{ order: 2 }} className="text-center">
                        {/* <VideoChatMain /> */}
                        <div className="section-title">
                            <h1>Our Practice</h1>
                        </div>
                        <p className="w-50 m-auto content-inner">Since 1998, GYD has been proud to combine modern techniques and high-tech equipment. Dr. John Dae, Micha and his team deliver a personalized and comfortable dental care experience unlike any other Mason dentist.</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Content;