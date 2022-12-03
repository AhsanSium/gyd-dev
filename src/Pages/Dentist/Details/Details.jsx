import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import doctorImage from "../../../Images/doctorIcon.png";
import './Details.css';

const Details = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setUsers(data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <section className="dentist-details-sec">
                <Container>
                    <Row xs={1} md={2} className="g-4">
                        {
                            users.length > 0 ? users.map((singleUser) => {
                                console.log(singleUser && singleUser);
                                if (singleUser && singleUser.role === 'doctor') {
                                    return (

                                        <Col>
                                            <Link to={`/doctors/${singleUser.doctorSpecialist
                                                }`} >
                                                <Card>
                                                    <div>
                                                        <Card.Img
                                                            style={{ width: '10rem' }}

                                                            variant="top" src={doctorImage} />

                                                    </div>
                                                    <Card.Body>
                                                        <Card.Title>{singleUser.doctorSpecialist}</Card.Title>
                                                        {/* <Card.Text>
                                                            Doctor Name:
                                                            {"  " + singleUser.doctorName}
                                                        </Card.Text> */}
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>
                                    )
                                }
                            })
                                :
                                <></>

                        }
                    </Row>
                </Container>
            </section>

            <section className="pb-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <div className="achivement-img-bg"></div>
                        </Col>
                        <Col lg={6}>
                            <div className="expertDentist-txt mt-5 mt-lg-0">
                                <h2>Experienced Doctors</h2>
                                <p>Smiling comes naturally to Dr. Harrie, author of ‘Donto’. He has embraced Cosmetic Dentistry and has redesigned the smiles for thev thousands of patients.</p>
                                <p>Dr. Harrie believes in providing her patients with more than just world class dental care. He also helps patients recognize the vital connection between dental health and whole body health. A graduate of the University of California’s School of Dentistry, Dr. Harrie is a leader in the movement to bring environmental sanity and well-being into the dental world for future.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Details;