import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import useAuth from '../../Hooks/useAuth';
import Spinner from 'react-bootstrap/Spinner';
import Patient from './Patient/Patient';
import Doctor from './Doctor/Doctor';
import { Card, Col, Row } from 'react-bootstrap';

const AdminDashboard = () => {

    const { user, token } = useAuth();

    const [role, setRole] = useState('');

    const [data, setData] = useState({});

    const [users, setUsersData] = useState([]);

    const [loading, setLoading] = useState(false);

    const coolAlert = useAlert();


    useEffect(() => {
        if (user.email) {
            setLoading(true);
            fetch(`http://localhost:5000/usersData/${user.email}`)
                .then((res) =>
                    res.json()
                )
                .then((data) => {
                    coolAlert.info('Data Fetched!');
                    if (data.data?.role.length > 0) {
                        setRole(data.data.role);
                        setData(data.data);
                    }
                    //console.log("Data: ", data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    coolAlert.error(err);
                    setLoading(false);
                });

        }

    }, []);

    const handleDelete = (id) => {

        fetch("http://localhost:5000/users", {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id: id
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                coolAlert.success("User Deleted !");
                setUsersData(users);
            }).catch((err) => coolAlert.error("Something Went wrong"));
    }


    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then((res) =>
                res.json()
            )
            .then((data) => {
                setUsersData(data);

                setLoading(false);
                coolAlert.info('Data Fetched!');
            })
            .catch((err) => {
                coolAlert.error(err);
                setLoading(false);
            });
    }, [setUsersData]);




    return (
        <div className="py-5">
            <h3>Welcome Admin</h3>
            {
                loading &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

            }
            <Row className='mt-5 pt-5'>
                <Col >
                    <h4>Doctors</h4>
                    {
                        users && users?.map((single) => {
                            if (single.role === 'doctor') {
                                return (
                                    <Card className='m-4'>
                                        <div className='p-4 justify-content-lg-center'>
                                            <p className='display-6'>
                                                Name:
                                                {single.doctorName}
                                            </p>
                                            <p>
                                                Email:
                                                {single.email}
                                            </p>
                                            <button onClick={() => handleDelete(single._id)} className='btn btn-danger'>Delete</button>
                                            <button className='btn btn-outlined btn-info'>Update</button>
                                        </div>
                                    </Card>
                                )
                            }
                        })
                    }
                </Col>
                <Col>
                    <h4>
                        Patients
                    </h4>

                    {
                        users && users?.map((single) => {
                            if (single.role === 'patient') {
                                return (
                                    <Card className='m-4'>
                                        <div className='p-4 justify-content-lg-center'>
                                            <p className='display-6'>
                                                Name:
                                                {single.patientName}
                                            </p>
                                            <p>
                                                Email:
                                                {single.email}
                                            </p>
                                            <button onClick={() => handleDelete(single._id)} className='btn btn-danger'>Delete</button>
                                            <button className='btn btn-outlined btn-info'>Update</button>
                                        </div>
                                    </Card>
                                )
                            }
                        })
                    }
                </Col>

            </Row>
        </div>
    )
}

export default AdminDashboard;