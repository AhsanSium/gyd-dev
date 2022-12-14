import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Button, Card, CardGroup, Col, Form, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ListGroup from 'react-bootstrap/ListGroup';
import emailjs from '@emailjs/browser';
import { HospitalFocus } from '../../../FakeData/HospitalFocus';
import useAuth from '../../../Hooks/useAuth';

const Doctor = ({ data }) => {

    const [prescription, setPrescription] = useState([]);
    const [presTrue, setPresTrue] = useState('');
    const [testTrue, setTestTrue] = useState('');
    const formRef = useRef(null);
    const coolAlert = useAlert();

    const { user } = useAuth();

    useEffect(() => {
        setPrescription([]);
        fetch('http://localhost:5000/prescription')
            .then(res => res.json())
            .then((pData) => {
                console.log("Prescription Data", pData);
                let prescriptionArray = [];
                pData && pData.map((single) => {
                    if (single.doctor_id && single.doctor_id === data._id) {
                        console.log("Single", single);
                        prescriptionArray.push(single);
                        // setPrescription(prescription => [...prescription, single]);
                    }
                });

                setPrescription(prescriptionArray);
                console.log("Prescription", prescription);
                console.log("Prescription Array", prescriptionArray);

                prescriptionArray = [];

            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const handlePrescriptionSend = (single, e) => {
        e.preventDefault();
        console.log(single._id, e.target.pres.value);

        fetch("http://localhost:5000/prescription-solved", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                user: user,
                prescriptionId: single._id,
                commonMeds: e.target.meds.value,
                prescription: e.target.pres.value

            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    coolAlert.success("Prescription Saved !");
                }
            }).catch((err) => coolAlert.error(err));

        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        let textAdded = 'Medicines: ' + e.target.meds.value + ', Text:  ' + e.target.pres.value;

        var templateParams = {
            from_name: 'Get Your Doctor',
            to_name: single.patientName,
            doctor: single.doctorName,
            date: date,
            time: time,
            to_email: single.email,
            pres: 'Your Prescription Is Below: ',
            message: textAdded
        };

        emailjs.send('service_sgl1kkn', 'template_nw7kswq', templateParams, 'sylIrH1UGhTQC3OCc')
            .then(function (response) {
                coolAlert.success("Email Sent to Patient");
            }, function (error) {
                coolAlert.error(error);
            });


        // coolAlert.success("Prescription Sent");
    }


    const handleTestSend = (single, e) => {
        e.preventDefault();
        console.log(single._id, e.target.pres.value);

        fetch("http://localhost:5000/test-solved", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                user: user,
                prescriptionId: single._id,
                commonMeds: e.target.meds.value,
                prescription: e.target.pres.value

            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    coolAlert.success("Test Report Sent to Hospital !");
                }
            }).catch((err) => coolAlert.error(err));

        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        let textAdded = e.target.pres.value;

        const mail = e.target.email.value;

        var templateParams = {
            from_name: 'Get Your Doctor',
            to_name: single.patientName,
            doctor: single.doctorName,
            date: date,
            time: time,
            to_email: mail,
            pres: 'Your Test Is Below: ',
            message: textAdded
        };

        emailjs.send('service_sgl1kkn', 'template_nw7kswq', templateParams, 'sylIrH1UGhTQC3OCc')
            .then(function (response) {
                coolAlert.success("Email Sent to Hospital For Testing");
            }, function (error) {
                coolAlert.error(error);
            });


        // coolAlert.success("Prescription Sent");
    }

    return (
        <div>
            <h3>Doctor Dashboard</h3>
            <p>Welcome {data.doctorName && data.doctorName}</p>


            <div className="mt-5">
                <Row>
                    <Col className='m-4'>

                        <h4>Requested Prescriptions</h4>

                        {
                            prescription && prescription.map((single) => {
                                if (presTrue === single._id && testTrue !== single._id) {
                                    return (
                                        <Card key={single._id} className='mt-5'>
                                            <Card.Header>
                                                <h5>
                                                    Prescription
                                                </h5>
                                            </Card.Header>
                                            <form onSubmit={(e) => { handlePrescriptionSend(single, e) }}>
                                                <Card.Body>
                                                    <select name='meds' placeholder='Common Medicine' className='form-control my-4'>
                                                        <option value="napa">Napa</option>
                                                        <option value="maxpro">Max Pro</option>
                                                        <option value="orsaline">Orsaline</option>
                                                        <option value="zimax">Zimax</option>
                                                        <option value="almex">Almex</option>
                                                        <option value="civit">Civit</option>
                                                    </select>
                                                    <textarea style={{ width: '100%' }}
                                                        placeholder="Type Prescription"
                                                        name="pres"
                                                        required
                                                    ></textarea>

                                                </Card.Body>
                                                <Card.Footer>
                                                    <Button type='submit' >Send</Button>
                                                    <Button onClick={() => { setPresTrue(false) }} className='bg-danger'>Cancel</Button>
                                                </Card.Footer>
                                            </form>
                                        </Card>

                                    )
                                }
                                else if (presTrue !== single._id && testTrue !== single._id) {
                                    return (
                                        <Card className='mt-5'>
                                            <Card.Header>
                                                <h5>
                                                    Patient Name : {single.patientName}
                                                </h5>

                                                Patient Email: {single.email}
                                            </Card.Header>
                                            <Card.Body>
                                                Patient Illness:
                                                {single.problems}
                                                <br /> <br />
                                                Paient Desired Treatment:
                                                {single.serviceName}
                                            </Card.Body>
                                            <Card.Footer>
                                                <Button onClick={() => { setPresTrue(single._id) }}>Write Prescription</Button>
                                                <Button className='btn btn-success' onClick={() => { setTestTrue(single._id) }} >Request a Test</Button>
                                            </Card.Footer>
                                        </Card>

                                    )
                                }
                                else {
                                    return (
                                        <Card key={single._id} className='mt-5'>
                                            <Card.Header>
                                                <h5>
                                                    Test Form
                                                </h5>
                                            </Card.Header>
                                            <form onSubmit={(e) => { handleTestSend(single, e,) }}>
                                                <Card.Body>
                                                    <input placeholder='Hospital Mail' className='form-control my-2' type="email" name='email' required />
                                                    <select name='meds' placeholder='Hospital' className='form-control my-4'>
                                                        {
                                                            HospitalFocus.map((single) => {
                                                                return (
                                                                    <option value={single.name}>{single.name}</option>
                                                                )
                                                            })
                                                        }

                                                    </select>
                                                    <textarea style={{ width: '100%' }}
                                                        placeholder="Type Prescription"
                                                        name="pres"
                                                        required
                                                    ></textarea>

                                                </Card.Body>
                                                <Card.Footer>
                                                    <Button type='submit' >Send</Button>
                                                    <Button onClick={() => { setTestTrue(false) }} className='bg-danger'>Cancel</Button>
                                                </Card.Footer>
                                            </form>
                                        </Card>

                                    )
                                }
                            })
                        }

                    </Col>
                    <Col className='m-4' >
                        <h4>Doctor Info</h4>
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
                    </Col>
                </Row>

            </div>


        </div>
    )
}

export default Doctor;