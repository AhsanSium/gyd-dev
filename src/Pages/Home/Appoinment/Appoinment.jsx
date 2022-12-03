import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import './Appoinment.css';

const Appoinment = () => {

    const [formData, setFormData] = useState({});

    const { user } = useAuth();

    const coolAlert = useAlert();

    const navigate = useNavigate();

    const handleAppointmentSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.patientName.value);
        setFormData({
            ...formData,
            patientName: e.target.patientName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            time: e.target.time.value,
            serviceName: e.target.serviceName.value,
            date: e.target.date.value
        });

        console.log(formData);

        fetch("http://localhost:5000/appointments", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    coolAlert.success("Appointment Successful !");
                    navigate('/');
                }
            }).catch((err) => coolAlert.error(err));


    }

    return (
        <section className="appoinment-wrapper">
            <Container>
                <Row>
                    <Col sm={12} md={12}>
                        <div className="section-title">
                            <h1 className="mt-5">Request Appointment</h1>
                        </div>
                        <div className="appoinment-form">
                            <form onSubmit={(e) => handleAppointmentSubmit(e)} action="#" className="row">
                                <Col md={6} lg={6}>
                                    <input type="text" placeholder="Name" name='patientName' required />
                                </Col>
                                <Col md={6} lg={6}>
                                    <input type="email" placeholder="Email" name='email' defaultValue={user.email} required readOnly />
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

                                <button className="theme-btn btn-fill form-btn mt-5">Confirm</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Appoinment;