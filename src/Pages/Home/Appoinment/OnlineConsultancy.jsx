import emailjs from '@emailjs/browser';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import './Appoinment.css';

const OnlineConsultency = () => {

    const [formData, setFormData] = useState({});
    const [doctor, setDoctor] = useState([]);

    let { id } = useParams();

    const { user } = useAuth();
    //console.log(user);

    const coolAlert = useAlert();

    const navigate = useNavigate();



    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then((data) => {
                //console.log(data);
                data && data.map((singleData) => {
                    if (singleData._id === id) {
                        setDoctor(singleData);
                        console.log(doctor);
                    }
                });
            })
            .catch(err => console.log(err));
    }, [id]);


    const handleAppointmentSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.patientName.value);
        setFormData({
            ...formData,
            doctor: doctor.doctorName,
            doctor_id: doctor._id,
            patientName: e.target.patientName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            time: e.target.time.value,
            serviceName: e.target.serviceName.value,
            date: e.target.date.value,
            problems: e.target.problems.value
        });

        console.log(" Form Data ", formData);

        fetch("http://localhost:5000/prescription", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.err) {
                    coolAlert.error(data.err);
                }
                if (data.insertedId) {
                    coolAlert.success("Prescription Requested !");
                    // navigate('/');
                    var templateParams = {
                        from_name: 'Get Your Doctor',
                        to_name: e.target.patientName.value,
                        doctor: doctor.doctorName,
                        date: e.target.date.value,
                        time: e.target.time.value,
                        to_email: e.target.email.value,
                        message: e.target.problems.value
                    };

                    var templateParams1 = {
                        from_name: e.target.patientName.value,
                        to_name: doctor.doctorName,
                        date: e.target.date.value,
                        time: e.target.time.value,
                        to_email: doctor.email,
                        message: e.target.problems.value
                    };

                    emailjs.send('service_sgl1kkn', 'template_riwwtso', templateParams1, 'sylIrH1UGhTQC3OCc')
                        .then(function (response) {
                            coolAlert.success("Email Sent to Doctor");
                        }, function (error) {
                            coolAlert.error(error);
                        });

                    emailjs.send('service_sgl1kkn', 'template_nw7kswq', templateParams, 'sylIrH1UGhTQC3OCc')
                        .then(function (response) {
                            coolAlert.success("Email Sent to Patient");
                        }, function (error) {
                            coolAlert.error(error);
                        });


                }
            }).catch((err) => {
                coolAlert.error(err.message)
                console.log(err);
            });


    }

    return (
        <section className="appoinment-wrapper">
            <Container className='mt-5 mb-5'>
                <h1 className="mt-5">Your Doctor is : {doctor.doctorName}</h1>
                <p>Degree: {doctor.doctorDegree}</p>
                <p>Specialist: {doctor.doctorSpecialist
                }</p>
            </Container>
            <Container>

            </Container>
            <Container>
                <Row>
                    <Col sm={12} md={12}>
                        <div className="section-title">
                            <h3 className="mt-5">Request Prescription</h3>
                        </div>
                        <div className="appoinment-form">
                            <form onSubmit={(e) => handleAppointmentSubmit(e)} action="#" className="row">
                                <Col md={6} lg={6}>
                                    <input type="text" placeholder="Name" name='patientName' required />
                                </Col>
                                <Col md={6} lg={6}>
                                    <input type="email" placeholder="Email" name='email' required />
                                </Col>
                                <Col md={6} lg={6}>
                                    <input type="phone" placeholder="Phone" name='phone' required />
                                </Col>
                                <Col md={6} lg={6}>
                                    <input type="text" placeholder="Service" name='serviceName' required />
                                </Col>

                                <Col md={6} lg={6}>
                                    <input type="time" placeholder="Time" name='time' required />
                                </Col
                                >
                                <Col md={6} lg={6}>
                                    <input type="date" placeholder="Date" name='date' required />
                                </Col>

                                <Col md={12} lg={12}>
                                    <input type="textarea" placeholder="Your Problems" name='problems' required />
                                </Col>

                                <button className="theme-btn btn-fill form-btn mt-5">Confirm</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default OnlineConsultency;