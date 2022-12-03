import { faFacebook, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import './Doctors.css';
import img from "../../../Images/doctorIcon.png";

const Doctors = (props) => {

    const [doctors, setDoctors] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setDoctors(data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
        AOS.refresh();
    }, []);
    return (
        <div>
            <h3 className="mb-5 mt-5">{id && id.toUpperCase()}  Specialist </h3>
            <Row xs={1} md={2} className="g-4">



                {
                    doctors.length > 0 ? doctors.map((singleUser) => {
                        console.log(singleUser && singleUser);
                        if (singleUser && singleUser.role === 'doctor' && singleUser.doctorSpecialist === id) {
                            return (

                                <Col md={6} lg={6} xl={4} xs={12}>
                                    <Link to={`/appointment/${singleUser._id}`}>
                                        <div className="single-feature-box sigle-doctor">
                                            <div className="doctors-profile" data-aos="fade-down">
                                                <img style={{ width: '13rem' }} src={img} alt="" />
                                            </div>
                                            <div className="doctors-info" data-aos="fade-left">
                                                <h3 className="mb-0"><a href=".#">{singleUser.doctorName}</a></h3>
                                                <span>Degree: {" " + singleUser.doctorDegree
                                                }</span>
                                            </div>
                                            <div className="doctors-social" data-aos="flip-left">
                                                <a href=".#"><FontAwesomeIcon icon={faFacebook} /></a>
                                                <a href=".#"><FontAwesomeIcon icon={faTwitter} /></a>
                                                <a href=".#"><FontAwesomeIcon icon={faWhatsapp} /></a>
                                                <a href=".#"><FontAwesomeIcon icon={faLinkedin} /></a>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            )
                        }
                    })
                        :
                        <></>

                }
            </Row>

        </div>

    );
};

export default Doctors;