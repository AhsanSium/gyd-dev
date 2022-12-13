import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const HospitalContent = () => {
    return (
        <section className="about-content-sec">
            <Container>
                <Row>
                    <Col md={12} lg={8} lg={{ order: 2 }} className="text-center">
                        {/* <VideoChatMain /> */}
                        <div className="section-title">
                            <h1>Our Hospitals</h1>
                        </div>



                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HospitalContent;