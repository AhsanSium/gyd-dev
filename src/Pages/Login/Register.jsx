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
        doctorsHospital: '',
        visitHours: '',
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
                                    <option value="kidney">Kidney</option>
                                    <option value="brain">Brain</option>
                                    <option value="nutrition">Nutrition</option>
                                    <option value="diabetes">Diabetes</option>
                                </select>
                                {/* <input name='doctorSpecialist' onChange={handleChange} type="text" id="form2Example22" className="form-control"
                                    placeholder="Specialist In" required /> */}
                            </div>

                            <div className="form-outline mb-4">
                                <small>Doctor Degree</small>
                                <input name='doctorDegree' onChange={handleChange} type="text" id="form2Example23" className="form-control"
                                    placeholder="Doctor Degree" required />
                            </div>

                            <div className="form-outline mb-4">
                                <small>Doctor's Hospital</small>
                                <select className="form-control" name='doctorsHospital' onChange={handleChange} id="form2Example72" placeholder="Visiting Hospitals" required>
                                    <option value="dhaka-medical">Dhaka Medical</option>
                                    <option value="popular-hospital">Popular Hospital</option>
                                    <option value="medinova-hospital">Medinova Hospital</option>
                                    <option value="labaid-hospital">Lab Aid Hospital</option>
                                    <option value="bsmmu-hospital">BSMMU</option>
                                    <option value="bardem-hospital">BARDEM</option>

                                </select>
                            </div>
                            <div className="form-outline mb-4">
                                <small>Visiting Hours</small>
                                <select className="form-control" name='visitHours' onChange={handleChange} id="form2Example73" placeholder="Visit Hours" required>
                                    <option value="10am-1pm">10 AM - 1 PM</option>
                                    <option value="2pm-5pm">2 PM - 5 PM</option>
                                    <option value="6pm-8pm">6 PM - 8 PM</option>
                                    <option value="9pm-11pm">9 PM - 11 PM</option>

                                </select>
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
                                <small>Patient Image</small>
                                <input name="patientImage" onChange={handleChange} type="file" accept="image/*" id="form2Example41" alt='' className="form-control"
                                    placeholder="Patient Image" required />
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
                                <small>Patient Gender</small>
                                <select className="form-control" name='patientGender' onChange={handleChange} id="form2Example22" placeholder="Gender" required>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="form-outline mb-4">
                                <small>Patient Weight</small>
                                <input name="patientWeight" onChange={handleChange} type="number" id="form2Example53" className="form-control"
                                    placeholder="Weight" required />
                            </div>

                            <div className="form-outline mb-4">
                                <small>Patient Height </small>
                                <input name="patientHeight" onChange={handleChange} type="number" id="form2Example53" className="form-control"
                                    placeholder="Height" required />
                            </div>

                            <div className="form-outline mb-4">
                                <small>Patient BMI</small>
                                <input name="patientBMI" onChange={handleChange} type="number" id="form2Example63" className="form-control"
                                    placeholder="BMI" required />
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