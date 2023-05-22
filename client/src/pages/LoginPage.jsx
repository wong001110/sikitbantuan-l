import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { UserContext } from '../../context/PublicContext';

export default function LoginPage() {
    const [isActive, setIsActive] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [user_name, setName] = useState('');
    const [user_email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_avatar, setAvatar] = useState('');
    const { user, setUser } = useContext(UserContext);
    if (user) {
        return <Navigate to={'/'} />
    }
    function toggleSwap() {
        setIsActive(current => !current);
    };

    async function userRegister(ev) {
        ev.preventDefault();
        try {
            await axios.post('/api/user-register', {
                user_name,
                user_email,
                password,
                user_avatar,
            }).then(response => {
                const { data } = response;
                if (data !== 'exist') {
                    alert('Registration successful. Now you can log in');
                    setIsActive(current => !current);
                } else {
                    alert("The Email is " + data + " ,Please try other email");
                }
            });

        } catch (e) {
            alert("registration failed")
        }
    }
    async function userLogin(ev) {
        ev.preventDefault();
        try {
            await axios.post('/api/user-login', { user_email, password }).then(response => {
                const { data } = response;
                if (data !== 'not found') {
                    setUser(data);
                    alert('Login successful');
                    setRedirect(true);
                } else {
                    alert("user " + data);
                }
            });
        } catch (e) {
            alert('Login failed');
            console.log(e);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="w-100 h-100 bg-dark bg-gradient position-relative">
            <Container className="w-100 h-100 d-flex justify-content-center align-items-center position-relative">
                <Row className={`loginForm ${isActive ? 'active' : ''} bg-secondary g-0 position-absolute overflow-hidden`}>
                    <Col lg="6" className="swap-con d-flex justify-content-evenly align-items-center flex-column bg-secondary">
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <img src="/logo.png" style={{ height: 100, width: 100 }} className="object-fit-cover" />
                            <span>Welcome to the SikitBantuan</span>
                        </div>
                        <Form className='row px-5' onSubmit={userLogin}>
                            <Form.Group className="mb-3 col-12" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email"
                                    value={user_email}
                                    onChange={ev => setEmail(ev.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3 col-12" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password"
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)} />
                            </Form.Group>
                            <div className='text-center my-3'>
                                <Button variant="primary" type="submit" className='py-1 px-5 text-white'>
                                    Sign In
                                </Button>
                            </div>
                            <p className="login-divider">Or</p>
                            <div className='d-flex justify-content-around align-content-center'>
                                <Link><FontAwesomeIcon icon={faFacebook} size='2x' /></Link>
                                <Link><FontAwesomeIcon icon={faGoogle} size='2x' /></Link>
                                <Link><FontAwesomeIcon icon={faLinkedin} size='2x' /></Link>
                            </div>
                        </Form>
                        <p>Don't have account yet?<Link className='text-primary text-decoration-none'> Register Now!</Link></p>
                    </Col>
                    <Col lg="6" className='swap-con'>
                        <div className="position-relative w-100 h-100">
                            <img src="/img/login.jpeg" className="h-100 w-100 object-fit-cover" />
                            <div className="overlay"></div>
                        </div>
                    </Col>
                </Row>
                <Row className={`registerForm ${isActive ? '' : 'active'} bg-secondary g-0 position-absolute overflow-hidden`}>
                    <Col lg="6" className='swap-con'>
                        <div className="position-relative w-100 h-100">
                            <img src="/img/register.jpg" className="h-100 w-100 object-fit-cover" />
                            <div className="overlay"></div>
                        </div>
                    </Col>
                    <Col lg="6" className="swap-con d-flex justify-content-evenly align-items-center flex-column bg-secondary">
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <img src="/logo.png" style={{ height: 100, width: 100 }} className="object-fit-cover" />
                            <span>Welcome to the SikitBantuan</span>
                        </div>
                        <Form className='row px-5' onSubmit={userRegister}>
                            <Form.Group className="mb-3 col-12">
                                <Form.Control type="text" placeholder="Name"
                                    value={user_name}
                                    onChange={ev => setName(ev.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-12">
                                <Form.Control type="email" placeholder="Email"
                                    value={user_email}
                                    onChange={ev => setEmail(ev.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-12">
                                <Form.Control type="password" placeholder="Password"
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)} />
                            </Form.Group>
                            <div className='text-center my-3'>
                                <Button variant="primary" type="submit" className='py-1 px-5 text-white'>
                                    Register
                                </Button>
                            </div>
                            <p className="login-divider">Or</p>
                            <div className='d-flex justify-content-around align-content-center'>
                                <Link><FontAwesomeIcon icon={faFacebook} size='2x' /></Link>
                                <Link><FontAwesomeIcon icon={faGoogle} size='2x' /></Link>
                                <Link><FontAwesomeIcon icon={faLinkedin} size='2x' /></Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <div className="position-absolute top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-start pt-5">
                <div className='bg-secondary border border-secondary rounded overflow-hidden w-25 d-flex position-relative login-swap'>
                    <div className='w-50 h-100 position-absolute bg-dark swap-bar'
                        style={{ transform: isActive ? 'translateX(100%)' : 'translateX(0)' }}
                    ></div>
                    <Button onClick={toggleSwap} className={`rounded-0 border-0 w-100
                    ${isActive ? 'text-dark pe-auto' : 'text-white pe-none'}
                    `}>
                        Login
                    </Button>
                    <Button onClick={toggleSwap} className={`rounded-0 border-0 w-100
                    ${isActive ? 'text-white pe-none' : 'text-dark pe-auto'}
                    `}>
                        Register
                    </Button>
                </div>
            </div>
        </div>
    )
}