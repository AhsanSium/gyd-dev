import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import useAuth from '../../Hooks/useAuth';
import Spinner from 'react-bootstrap/Spinner';
import Patient from './Patient/Patient';
import Doctor from './Doctor/Doctor';

const Dashboard = () => {

    const { user } = useAuth();

    const [role, setRole] = useState('');

    const [data, setData] = useState({});

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
                    console.log("Data: ", data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    coolAlert.error(err);
                    setLoading(false);
                });
        }

    }, []);

    return (
        <div className="py-5">
            {
                loading &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

            }
            {
                role === 'patient' &&
                <Patient data={data} />
            }
            {
                role === 'doctor' &&
                <Doctor data={data} />
            }

        </div>
    )
}

export default Dashboard;