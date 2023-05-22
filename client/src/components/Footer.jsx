import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/PublicContext';
import { useContext } from 'react';

export default function Footer() {
    const apiurl = "http://localhost:4000/"
    const { user } = useContext(UserContext);
    return (
        <div>
            <div className='bg-dark text-white'>
                <Container className='py-4'>
                    <Row className='pt-3'>
                        <Col lg="3" className='mb-3'>
                            <Link className="me-5" href="/"><img src="/logo-w.png" className="flogo" /></Link>
                        </Col>
                        <Col lg="3" className='mb-3'>
                            <p className='m-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </Col>
                        <Col lg="3" className='mb-3'>
                            <h4>Contact US</h4>
                            <p className='m-0'>
                                Calling us with (603) 3544 2149<br />
                                Email : dummy@gmail.com<br /><br />
                                Address: Lorem ipsum dolor sit amet, consectetur adipiscing, Lorem ipsum dolor
                            </p>
                        </Col>
                        <Col lg="3" className='mb-3'>
                            <h4>Follow us</h4>
                            <div className="d-flex w-100 justify-content-between">
                                <Link className='text-white' to="/"><FontAwesomeIcon icon={faFacebook} size='3x' /></Link>
                                <Link className='text-white' to="/"><FontAwesomeIcon icon={faTwitter} size='3x' /></Link>
                                <Link className='text-white' to="/"><FontAwesomeIcon icon={faInstagram} size='3x' /></Link>
                                <Link className='text-white' to="/"><FontAwesomeIcon icon={faWhatsapp} size='3x' /></Link>
                                <Link className='text-white' to="/"><FontAwesomeIcon icon={faLinkedin} size='3x' /></Link>
                            </div>
                        </Col>
                    </Row>
                    <div className='mt-5 text-center'><p className='m-0'>© SikitBantuan. All rights reserved.</p></div>
                </Container>
            </div>
            {user && (
                <div className='profile'>
                    <Link to={"/user/" + user._id}><img src={apiurl + 'uploads/avatar/' + (user && user.user_avatar)} className="w-100 h-100 object-fit-cover"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/defaulticon.jpg";
                        }} /></Link>
                </div>
            )}
        </div>
    );
}