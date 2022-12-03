import { useRef, useState } from 'react';
import { useAlert } from 'react-alert';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import './Login.css';

const Register = () => {

    const { registerUser } = useAuth();

    const [doctorRegData, setDoctorRegData] = useState({
        role: 'doctor',
        doctorName: '',
        doctorSpecialist: '',
        doctorDegree: '',
        email: '',
        password: ''
    });
    const [patientRegData, setPatientRegData] = useState({
        role: 'patient',
        patientName: '',
        patientIllness: '',
        patientAge: '',
        patientDescription: '',
        email: '',
        password: ''
    });

    const [role, setRole] = useState('patient');


    const form = useRef(null);

    const coolAlert = useAlert();

    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e.target.name, ": ", e.target.value);

        if (role === 'patient') {
            setPatientRegData({
                ...patientRegData, 'role': 'patient', [e.target.name]: e.target.value
            });
        }
        if (role === 'doctor') {
            setDoctorRegData({
                ...doctorRegData, 'role': 'doctor', [e.target.name]: e.target.value
            });
        }


    }

    function isEmpty(object) {
        for (const property in object) {
            //console.log(object[property]);
            if (object[property].length === 0) {
                return {
                    value: false,
                    property: property
                };
            }
        }
        return {
            value: true
        };
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (role === 'patient') {
            //console.log(isEmpty(patientRegData));

            const validate = isEmpty(patientRegData);

            if (validate.value === false) {
                coolAlert.error("Fillup " + validate.property + " Again!")
            }
            else {
                registerUser(patientRegData.email, patientRegData.password, patientRegData.patientName, patientRegData, navigate);
            }

            //console.log(patientRegData);
        }

        if (role === 'doctor') {
            console.log(isEmpty(doctorRegData));

            const validate = isEmpty(doctorRegData);

            if (validate.value === false) {
                coolAlert.error("Fillup " + validate.property + " Again!")
            }
            else {
                registerUser(doctorRegData.email, doctorRegData.password, doctorRegData.doctorName, doctorRegData, navigate);
            }

            //console.log(doctorRegData);
        }

    }

    const handleRoleChange = (e) => {
        form.current.reset();
        console.log(e.target.value);
        setRole(e.target.value);
        //setRegData({});
    }

    return (
        <div>
            <p className="d-flex justify-content-start">Please Register</p>

            <div className="form-outline mb-4">
                <p>Select Role</p>
                <Form.Select onChange={(e) => handleRoleChange(e)} className="form-control select" required>
                    <option defaultValue value="patient">Patient</option>
                    <option value='doctor' >Doctor</option>
                </Form.Select>
            </div>

            <form ref={form} onSubmit={(e) => handleRegister(e)}>


                {
                    role === 'doctor' ?
                        <div>
                            <div className="form-outline mb-4">
                                <small>Doctor Name</small>
                                <input name='doctorName' onChange={handleChange} type="text" id="form2Example21" className="form-control"
                                    placeholder="Doctor Name" required />
                            </div>

                            <div className="form-outline mb-4">
                                <small>Doctor Specialist In</small>
                                <select className="form-control" name='doctorSpecialist' onChange={handleChange} id="form2Example22" placeholder="Specialist In" required>
                                    <option value="medicine">Medicine</option>
                                    <option value="skin">Skin</option>
                                    <option value="eye">Eye</option>
                                    <option value="heart">Heart</option>
                                </select>
                                {/* <input name='doctorSpecialist' onChange={handleChange} type="text" id="form2Example22" className="form-control"
                                    placeholder="Specialist In" required /> */}
                            </div>

                            <div className="form-outline mb-4">
                                <small>Doctor Degree</small>
                                <input name='doctorDegree' onChange={handleChange} type="text" id="form2Example23" className="form-control"
                                    placeholder="Doctor Degree" required />
                            </div>

                        </div>
                        :
                        <div>
                            <div className="form-outline mb-4">
                                <small>Patient Name</small>
                                <input name="patientName" onChange={handleChange} type="text" id="form2Example31" className="form-control"
                                    placeholder="Patient Name" required />
                            </div>

                            <div className="form-outline mb-4">
                                <small>Patient Illness</small>
                                <input name="patientIllness" onChange={handleChange} type="text" id="form2Example32" className="form-control"
                                    placeholder="Illness" required />
                            </div>

                            <div className="form-outline mb-4">
                                <small>Patient Age</small>
                                <input name="patientAge" onChange={handleChange} type="text" id="form2Example33" className="form-control"
                                    placeholder="Age" required />
                            </div>

                            <div className="form-outline mb-4">
                                <small>Patient Additional Description</small>
                                <textarea name="patientDescription" onChange={handleChange} type="text" id="form2Example23" className="form-control"
                                    placeholder="Additional Description" required />
                            </div>

                        </div>
                }


                <div className="form-outline mb-4">
                    <small>Email</small>
                    <input name="email" onChange={handleChange} type="email" id="form2Example11" className="form-control"
                        placeholder="Email Address" required />
                </div>

                <div className="form-outline mb-4">
                    <small>Password</small>
                    <input name="password" onChange={handleChange} type="password" id="form2Example22" placeholder="Password" className="form-control" required />
                </div>

                <div className="text-center pt-1 mb-5 pb-1">
                    <button className="theme-btn btn-fill" type="submit">Register</button>
                </div>

            </form>
        </div>
    )
}

export default Register