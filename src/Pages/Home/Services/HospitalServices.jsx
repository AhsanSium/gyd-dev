import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import './Services.css';

import hospitalImage from '../../../Images/hospital-buildings.png';
import { Link } from "react-router-dom";

const HospitalServices = (props) => {

    const { title, description, link, img, name } = props.treatment;
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
        AOS.refresh();
    }, []);
    return (
        <>
            <Col md={6} lg={6} xl={4} xs={12}>
                <Link className="text-decoration-none" to={`/hospitals/${name}`}>
                    <div className="single-service-box1 my-10" data-aos="flip-left">
                        <div className="service-icon">
                            <img style={{ width: '80%' }} src={hospitalImage} alt="" />
                        </div>
                        <h3 className="py-2">{title}</h3>
                        <h4 className="py-2">{description}</h4>
                        <a className="mt-2" href=".#">{link}</a>
                    </div>
                </Link>
            </Col>
        </>
    );
};

export default HospitalServices;