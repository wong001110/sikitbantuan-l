import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../../../context/PublicContext";

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setAdmin } = useContext(AdminContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/api/login', { email, password });
            setAdmin(data);
            alert('Login successful');
            setRedirect(true);
        } catch (e) {
            alert('Login failed');
            console.log(e);
        }
    }

    if (redirect) {
        return <Navigate to={'/admin/'} />
    }
    return (
        <div className="w-100 h-100 bg-dark bg-gradient position-relative">
            <Container className="w-100 h-100 d-flex justify-content-center align-items-center position-relative">
                <Row className="bg-secondary g-0 position-absolute overflow-hidden py-5">
                    <Col lg="12" className="d-flex justify-content-evenly align-items-center flex-column bg-secondary gap-5" style={{ width: 500 }}>
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <img src="/logo.png" style={{ height: 100, width: 100 }} className="object-fit-cover" />
                            <span>Welcome to the SikitBantuan</span>
                        </div>
                        <Form className='row px-5' onSubmit={handleLoginSubmit}>
                            <Form.Group className="mb-3 col-12">
                                <Form.Control type="email" placeholder="Email"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-12">
                                <Form.Control type="password" placeholder="Password"
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)} />
                            </Form.Group>
                            <div className='text-center my-3'>
                                <Button variant="primary" type="submit" className='py-1 px-5 text-white'>
                                    Sign In
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}