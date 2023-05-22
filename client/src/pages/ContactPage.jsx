import { Col, Container, Row, Form, Button } from "react-bootstrap";

export default function ContactPage() {
    return (
        <div>
            <Container fluid className='p-0 position-relative'>
                {/* banner */}
                <img src="/img/contactusBanner.jpg" className='banner' />
                <div className="overlay d-flex justify-content-center align-items-center flex-column text-white">
                    <h1 className='m-0 text-center'>Contact Us</h1>
                </div>
            </Container>
            <Container className='py-5 d-flex justify-content-center' id="contact">
                <Form className="w-100 py-5" style={{ maxWidth: 600 }}>
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="First Name" />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                        </Col>
                        <Col sm={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                        </Col>
                        <Col sm={12}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control as="textarea" rows={8} placeholder="Message to us now!" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="float-end px-5 text-white">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div >
    )
}