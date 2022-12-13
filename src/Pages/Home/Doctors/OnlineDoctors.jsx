import { faFacebook, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import './Doctors.css';
import img from "../../../Images/doctorIcon.png";
import { Rating } from 'react-simple-star-rating';

const Doctors = (props) => {

    const [doctors, setDoctors] = useState([]);

    let { id } = useParams();

    const [rating, setRating] = useState(5);

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)

        // other logic
    }

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
    ///online-consultancy/doctor/${singleUser._id}
    return (
        <div>
            <h3 className="mb-5 mt-5">{id && id.toUpperCase()}  Specialist </h3>
            <Row xs={1} md={2} className="g-4">

                <Col md='3'>

                    <div className='h-full shadow-lg h-100 py-4 px-2'>
                        <div>
                            <h3>Filters</h3>
                            <div className='mt-4'>
                                <h5>Select Rating</h5>
                                <Rating
                                    onClick={handleRating}
                                    initialValue={0}
                                />
                            </div>
                            <div className='mt-5'>
                                <h5>Short By</h5>
                                <div>
                                    <div className='d-flex justify-center px-5 pt-2'>
                                        <input className='' type='checkbox' checked />
                                        <small className='ml-2'>Relevance (Default)</small>
                                    </div>
                                    <div className='d-flex justify-center px-5 pt-2'>
                                        <input className='' type='checkbox' />
                                        <small className='ml-2'>Popularity</small>
                                    </div>
                                    <div className='d-flex justify-center px-5 pt-2'>
                                        <input className='' type='checkbox' />
                                        <small className='ml-2'>Fees (Low to High)</small>
                                    </div>
                                    <div className='d-flex justify-center px-5 pt-2'>
                                        <input className='' type='checkbox' />
                                        <small className='ml-2'>Fees (High to Low)</small>
                                    </div>
                                    <div className='d-flex justify-center px-5 pt-2'>
                                        <input className='' type='checkbox' />
                                        <small className='ml-2'>Rating</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Col>


                <Col md="9">

                    {
                        doctors.length > 0 ? doctors.map((singleUser) => {
                            console.log(singleUser && singleUser);
                            if (singleUser && singleUser.role === 'doctor' && singleUser.doctorSpecialist === id) {
                                return (

                                    <Col>
                                        <div className="single-feature-box sigle-doctor">
                                            <Link to={`/online-consultancy/doctor/${singleUser._id}`}>
                                                <div className="doctors-profile" data-aos="fade-down">
                                                    <img style={{ width: '13rem' }} src={img} alt="" />
                                                </div>
                                                <div className="doctors-info" data-aos="fade-left">
                                                    <h3 className="mb-0"><a href=".#">{singleUser.doctorName}</a></h3>
                                                    <span>Degree: {" " + singleUser.doctorDegree
                                                    }</span>
                                                </div>
                                            </Link>

                                            <Rating
                                                onClick={handleRating}
                                                initialValue={4}
                                            />

                                            <div className="doctors-social" data-aos="flip-left">
                                                <a href=".#"><FontAwesomeIcon icon={faFacebook} /></a>
                                                <a href=".#"><FontAwesomeIcon icon={faTwitter} /></a>
                                                <a href=".#"><FontAwesomeIcon icon={faWhatsapp} /></a>
                                                <a href=".#"><FontAwesomeIcon icon={faLinkedin} /></a>
                                            </div>
                                        </div>

                                    </Col>
                                )
                            }
                        })
                            :
                            <></>

                    }

                </Col>



            </Row>

        </div>

    );
};

export default Doctors;