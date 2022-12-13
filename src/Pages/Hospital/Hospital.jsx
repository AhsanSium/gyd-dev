import React from 'react'
import Content from '../About/AboutContent/Content';
import HospitalContent from '../About/AboutContent/HospitalContent';
import Banner from '../About/Banner/Banner';
import HospitalBanner from '../About/Banner/HospitalBanner';
import HospitalServices from '../Home/Services/HospitalServices';
import { HospitalFocus } from '../../FakeData/HospitalFocus';
import { Col, Container, Row } from 'react-bootstrap';

const Hospital = () => {
    return (

        <div>
            <HospitalBanner />
            <HospitalContent />
            <Container className='mt-10 mb-10'>
                <Row>
                    <Col sm={12}>
                        <div className="section-title text-center">
                            <h1>Patient Focused Approach</h1>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-10 mb-10'>
                    {
                        HospitalFocus.map(treatment => (
                            <HospitalServices key={treatment.id} treatment={treatment} />
                        ))
                    }
                </Row>
            </Container>

        </div>
    )
}

export default Hospital;