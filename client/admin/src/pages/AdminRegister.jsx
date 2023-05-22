import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";

export default function AdminRegister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [avatar, setAvatar] = useState('');


    function uploadAvatar(ev) {
        const file = ev.target.files;
        const data = new FormData();
        data.append('avatar', file[0]);
        axios.post('/upload-avatar', data).then((response) => {
            setAvatar(response.data[0]);
        }).catch((error) => {
            console.log(error);
        });
    }
    async function registerAdmin(ev) {
        ev.preventDefault();
        try {
            await axios.post('/admin-register', {
                name,
                email,
                password,
                role,
                avatar,
            });
            alert('Registration successful. Now you can log in');
        } catch (e) {

        }

    }
    if (role == "") {
        setRole("Admin Assistant");
    }
    return (
        <div className="w-100 h-100 bg-dark bg-gradient position-relative">
            <Container className="w-100 h-100 d-flex justify-content-center align-items-center position-relative">
                <Row className="bg-secondary g-0 position-absolute overflow-hidden py-5">
                    <Col lg="12" className="d-flex justify-content-evenly align-items-center flex-column bg-secondary gap-5" style={{ width: 500 }}>
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <img src="/logo.png" style={{ height: 100, width: 100 }} className="object-fit-cover" />
                            <span>Welcome to the SikitBantuan</span>
                            <p>this is a page for register admin</p>
                        </div>
                        <Form className='row px-5' onSubmit={registerAdmin}>
                            <Form.Group className="mb-3 col-12">
                                <Form.Control type="text" placeholder="Admin Name"
                                    value={name}
                                    onChange={ev => setName(ev.target.value)} />
                            </Form.Group>
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
                            <Form.Group className="mb-3 col-12">
                                <Form.Select aria-label="role"
                                    value={role}
                                    onChange={ev => setRole(ev.target.value)}>
                                    <option value="Admin Assistant">Admin Assistant</option>
                                    <option value="Admin Supervisor">Admin Supervisor</option>
                                    <option value="Admin Manager">Admin Manager</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 col-12">
                                <Form.Control type="file" onChange={uploadAvatar} />
                            </Form.Group>
                            <div className='text-center my-3'>
                                <Button variant="primary" type="submit" className='py-1 px-5 text-white'>
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}