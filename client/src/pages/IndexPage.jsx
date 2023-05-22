import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function IndexPage() {
    const [users, setUsers] = useState(0);
    const [events, setEvents] = useState(0);
    const [sponsors, setSponsors] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/places').then(response => {
                const { data } = response;
                const filteredData = data.filter(res => res.eventStatus == ("End"));
                setEvents(filteredData.length);
            })
            await axios.get('/api/users').then(response => {
                const { data } = response;
                setUsers(data.length);
            })
            await axios.get('/api/sponsor').then(response => {
                const { data } = response;
                setSponsors(0)
                data.map(giving => {
                    setSponsors(prevState => (prevState + giving.sponsorAmount))
                })
            })
        }
        fetchData();
    }, [])

    return (
        <div>
            <Container fluid className='p-0 position-relative'>
                {/* banner */}
                <img src="/img/homeBanner.jpg" className='banner' />
                <div className="overlay d-flex justify-content-center align-items-center flex-column text-white">
                    <h1 className='m-0'>Give a Little, Help a Lot.</h1><br />
                    <p>Small acts of kindness can make a big difference.</p>
                </div>

                {/* Statistics */}
                <div id='statistics' className="position-absolute d-flex justify-content-center align-items-center w-100 h-100 left-0">
                    <div id='statistics-con' className='bg-secondary d-flex w-75 justify-content-around py-5 rounded-3 shadow-sm'>
                        <div className='d-flex flex-column text-center justify-content-center align-items-center'>
                            <img src='/icon/donate.svg' className='statisticsIcon' />
                            <h3>RM {sponsors}</h3>
                            <p>The Giving</p>
                        </div>
                        <div className='d-flex flex-column text-center justify-content-center align-items-center'>
                            <img src='/icon/members.svg' className='statisticsIcon' />
                            <h3>{users}</h3>
                            <p>Volunteers</p>
                        </div>
                        <div className='d-flex flex-column text-center justify-content-center align-items-center'>
                            <img src='/icon/events.svg' className='statisticsIcon' />
                            <h3>{events}</h3>
                            <p>Events Completed</p>
                        </div>
                    </div>
                </div>
            </Container>
            {/* Content */}
            <div className='bg-primary'>
                <Container className='py-5'>
                    <h2 className='my-5 text-center text-white'>Let’s Involved Now!</h2>
                    <Row className='gx-8 gy-5'>
                        <Col lg="4">
                            <div className='home-involved position-relative'>
                                <img src="/img/volunteer.jpg" className='w-100 h-100' />
                                <div className='overlay top-0'></div>
                                <div className="position-absolute involved">
                                    <div className='border border-3 border-white involved-border'>
                                        <Link to="/involved" className="text-white text-decoration-none text-center involved-text">
                                            <p className='m-0'>As a Volunteers</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className='home-involved position-relative'>
                                <img src="/img/sponsor.jpg" className='w-100 h-100' />
                                <div className='overlay top-0'></div>
                                <div className="position-absolute involved">
                                    <div className='border border-3 border-white involved-border'>
                                        <Link to="/sponsor" className="text-white text-decoration-none text-center involved-text">
                                            <p className='m-0'>As a Sponsor</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className='home-involved position-relative'>
                                <img src="/img/organize.jpg" className='w-100 h-100' />
                                <div className='overlay top-0'></div>
                                <div className="position-absolute involved">
                                    <div className='border border-3 border-white involved-border'>
                                        <Link to="/profile" className="text-white text-decoration-none text-center involved-text">
                                            <p className='m-0'>Organize Now!</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                <Container>
                    <h2 className='my-5 text-center text-dark'>Stories that Inspired</h2>
                    <Row className='gx-5 gy-4 mb-5'>
                        <Col lg="3">
                            <div className='h-100'>
                                <img src="/img/witness-1.jpg" className="w-100 h-100 object-fit-cover" />
                            </div>
                        </Col>
                        <Col lg="9">
                            <div className='h-100'>
                                <p>Stories of Hope</p>
                                <h3>A Journey of Sponsorship and Hope</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link to="/" className='text-decoration-none bg-primary text-white py-2 px-3 rounded-2 d-inline-block'>Read the full story</Link>
                            </div>
                        </Col>
                        <Col lg="3">
                            <div className='h-100'>
                                <img src="/img/witness-1.jpg" className="w-100 h-100 object-fit-cover" />
                            </div>
                        </Col>
                        <Col lg="9">
                            <div className="h-100">
                                <p>Stories of Hope</p>
                                <h3>A Journey of Sponsorship and Hope</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link to="/" className='text-decoration-none bg-primary text-white py-2 px-3 rounded-2 w-auto d-inline-block'>Read the full story</Link>
                            </div>
                        </Col>
                    </Row>
                    <h2 className='my-5 text-center text-dark'>Our Partner</h2>
                    <Row className="g-5 mb-5 text-center partner">
                        <Col lg="4">
                            <img src="/ngo/4x4Relief.png" className="img-thumbnail" />
                        </Col>
                        <Col lg="4">
                            <img src="/ngo/PTFoundation.jpg" className="img-thumbnail" />
                        </Col>
                        <Col lg="4">
                            <img src="/ngo/TeachForMalaysia.png" className="img-thumbnail" />
                        </Col>
                        <Col lg="4">
                            <img src="/ngo/Street Feeders.png" className="img-thumbnail" />
                        </Col>
                        <Col lg="4">
                            <img src="/ngo/All Hands Volunteers.png" className="img-thumbnail" />
                        </Col>
                        <Col lg="4">
                            <img src="/ngo/UNICEF Malaysia.jpg" className="img-thumbnail" />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}