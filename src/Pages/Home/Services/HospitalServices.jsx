import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import './Services.css';

import hospitalImage from '../../../Images/hospital-buildings.png';

const HospitalServices = (props) => {

    const { title, description, link, img } = props.treatment;
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
        AOS.refresh();
    }, []);
    return (
        <>
            <Col md={6} lg={6} xl={4} xs={12}>
                <div className="single-service-box1 my-10" data-aos="flip-left">
                    <div className="service-icon">
                        <img style={{ width: '80%' }} src={hospitalImage} alt="" />
                    </div>
                    <h3>{title}</h3>
                    <h4>{description}</h4>
                    <a href=".#">{link}</a>
                </div>
            </Col>
        </>
    );
};

export default HospitalServices;