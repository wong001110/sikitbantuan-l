import { Button, Col, Form, Row } from "react-bootstrap";

export default function AdminSettings() {
    return (
        <Row className="g-3 py-4 px-5 w-100">
            <Col lg="12">
                <h2 className="text-dark">Settings</h2>
            </Col>

            <Col lg="12" id="adminSponsor">
                <div className="p-5">
                    <Form>
                        <Row className="d-flex g-4">
                            <Col sm="6" className="text-center">
                                <div className="mb-3">
                                    <img src="/defaulticon.jpg" className="admin-img" />
                                </div>
                                <Button variant="primary" type="submit" className="text-white fw-bold px-5">
                                    Change Avatar
                                </Button>
                            </Col>
                            <Col sm="6" className="mt-auto">
                                <div>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Admin 123" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="px-4 text-white">
                                        Update
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>

            </Col>
        </Row>
    );
}