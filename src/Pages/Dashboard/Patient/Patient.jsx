import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

const Patient = ({ data, token }) => {

    const [appointments, setAppointments] = useState([]);

    const [prescription, setPrescription] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/appdata/${data.email}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log("Appointments:", data);
                setAppointments(data);
            });



    }, [data.email]);

    return (
        <div>
            <h3>Patient Dashboard</h3>
            <p>Welcome {data.patientName && data.patientName}</p>

            <Row className="mt-5">
                <Col>
                    <h5>Appointments</h5>

                    <ListGroup as='ul' numbered >
                        {
                            appointments && appointments
                                .map(function (data) {
                                    return (
                                        <ListGroup.Item>
                                            <h5>
                                                Patient Name: {" " + data.patientName}
                                            </h5>

                                            <p>Email: {" " + data.email}</p>
                                            <p>Time: {" " + data.time}</p>
                                            <p>Date: {" " + data.date}</p>

                                        </ListGroup.Item>
                                    )
                                })
                        }

                    </ListGroup>


                </Col>

                <Col>
                    <h5>Online Prescription</h5>

                    <ListGroup as='ul' numbered >
                        {
                            appointments && appointments
                                .map(function (data) {
                                    return (
                                        <ListGroup.Item>
                                            <h5>
                                                Patient Name: {" " + data.patientName}
                                            </h5>

                                            <p>Email: {" " + data.email}</p>
                                            <p>Time: {" " + data.time}</p>
                                            <p>Date: {" " + data.date}</p>

                                        </ListGroup.Item>
                                    )
                                })
                        }

                    </ListGroup>


                </Col>

                <Col>
                    <div className="">

                        <h5>Patient Data</h5>

                        <ListGroup as='ol' numbered >
                            {
                                data.email &&
                                Object.keys(data)?.map(function (keyName, keyIndex) {
                                    return (
                                        <ListGroup.Item>
                                            <h5>
                                                {keyName} :
                                            </h5>

                                            <h6>{data[keyName]}</h6>

                                        </ListGroup.Item>
                                    )
                                })
                            }

                        </ListGroup>
                    </div>

                </Col>
            </Row>


        </div>
    )
}

export default Patient;