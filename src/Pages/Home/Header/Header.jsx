import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import logo from '../../../Images/doctor.png';
import './Header.css';

const Header = () => {

    const { user, logout } = useAuth();

    return (
        <div className="head-bg">
            <Navbar className="navbar" collapseOnSelect expand="lg">
                <Container className="container-head">
                    <Link style={{ textDecoration: 'none' }} to='/'>
                        <Navbar.Brand ><img style={{ width: '80px' }} src={logo} alt="logo" />
                            <span style={{ fontWeight: 'bold' }}>
                                Get Your Doctor
                            </span>

                        </Navbar.Brand>

                    </Link>
                    {/* <Navbar.Brand className="text-lg" href="/home">Get Your Doctor</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" expand="lg" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Link to="/home" className='list-item text-decoration-none'>Home</Link>
                            <Link to="/about" className='list-item text-decoration-none'>About</Link>
                            {/* <Link to="/service" className='list-item text-decoration-none'>Service</Link> */}
                            <Link to="/doctors" className='list-item text-decoration-none'>Doctors</Link>
                            <Link to="/online-consultancy" className='list-item text-decoration-none'>Consultancy</Link>
                            <Link to="/contact" className='list-item text-decoration-none'>Contact</Link>
                            {user.email
                                ?
                                <button type="button" className="btn btn-danger" onClick={logout}>Log Out</button>
                                :
                                <Link to="/login" type="button" className="btn btn-danger">Login</Link>
                            }
                            {user.email &&
                                <Link style={{ textDecoration: 'none' }} to='/dashboard' title='Dashboard'>
                                    <Navbar.Text><FontAwesomeIcon icon={faUser} /><span className="userName">{user.displayName}</span></Navbar.Text>
                                </Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;