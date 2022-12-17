import React, { useState } from 'react'
import { useEffect } from 'react';
import { Card, CardGroup, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import HospitalBanner from '../About/Banner/HospitalBanner';
import { HospitalFocus } from '../../FakeData/HospitalFocus';

const SingleHospitalInfo = () => {

    let { name } = useParams();
    //console.log(" = > ", name);

    const [users, setUsers] = useState([]);
    const [hospital, setHospital] = useState([]);

    useEffect(() => {
        console.log('i fire once');
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then((pData) => {
                console.log(users.length);
                //setUsers(data);
                const key = 'doctorsHospital';
                // const arrayUniqueByKey = [...new Map(data.map(item =>
                //     [item[key], item])).values()];

                let doctorsArray = [];


                pData && pData.map((single) => {
                    //console.log("Single", single.doctorsHospital);
                    if (single.doctorsHospital && single.doctorsHospital === name) {
                        console.log("Single", single);

                        //doctorsArray.push(single);
                        if (users && users[users.length - 1]?._id !== single._id) {
                            setUsers(users => [...users, single]);
                        }
                        // if (!users.includes(single)) {
                        // }
                        //setUsers(single);
                        // setPrescription(prescription => [...prescription, single]);
                    }
                });



                //setUsers(doctorsArray);

                // const uniqueArray = users.filter((v, i, a) => a.findIndex(t => (t._id === v._id)) === i)
                // console.log("uniqueArray => ", uniqueArray);
                // setUsers(uniqueArray);


            })
            .catch(err => console.log(err));

        HospitalFocus.map((single) => {
            if (single.name === name) {
                setHospital(single);
            }
        })

        console.log(" = > ", users);


    }, []);

    return (
        <div>
            <HospitalBanner />
            <div className='my-5 py-5'>
                <h2 className='fs-2'>{name && name.toUpperCase()}</h2>
                <Row className='mt-5 pt-5'>
                    <Col>
                        <h3 className='m-4'>Available Doctors</h3>

                        {
                            users && users.map((single) => {
                                return (
                                    <Card className='m-4'>
                                        <Card.Header>
                                            <Card.Title>
                                                DR. {single.doctorName}

                                            </Card.Title>
                                            <Card.Text>Specialist: {single.doctorSpecialist
                                            }</Card.Text>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>Visiting Hours : {single.visitHours
                                            }</Card.Text>
                                            <Card.Text>Email:{single.email}</Card.Text>


                                        </Card.Body>
                                        <Card.Footer>
                                        </Card.Footer>

                                    </Card>
                                )
                            })

                        }


                    </Col>
                    <Col>

                        <h3 className='m-4' >Hospital Information</h3>

                        <Card className='m-4 p-4'>

                            <Card.Title>{hospital.description} </Card.Title>

                            <br />

                            <Card.Text> Location: {hospital.location}</Card.Text>

                        </Card>

                    </Col>
                </Row>

            </div>
        </div>
    )
}

export default SingleHospitalInfo;