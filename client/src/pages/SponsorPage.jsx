import { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns'

export default function SponsorPage() {
    const baseApi = "http://localhost:4000/";
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/places').then(response => {
            const { data } = response;
            const filteredData = data.reverse().filter(res => (res.eventStatus == ("Ongoing") || res.eventStatus == ("Approved")) && res.eventStatus !== ("Cancelled") && res.eventSponsored);
            setEvents(filteredData);
        })
    }, [])
    function convertDate(event) {
        const eventStart = new Date(event.eventStartTime).getTime();
        const eventEnd = new Date(event.eventEndTime).getTime();
        const eventDuration = eventEnd - eventStart;
        let seconds = (eventDuration / 1000);
        let minutes = (seconds / 60);
        let hours = (minutes / 60);
        let newtime = parseFloat(hours.toFixed(2));
        return newtime;
    }
    function eventCurrStatus(status) {
        if (status === "Approved") {
            return ("bg-primary");
        }
        if (status === "End") {
            return ("bg-warning");
        }
        if (status === "Ongoing") {
            return ("bg-success");
        }
    }
    const currentPosts = events.slice(0, 3);
    console.log(currentPosts);
    return (
        <div>
            <Container fluid className='p-0 position-relative'>
                {/* banner */}
                <img src="/img/becomeBanner.jpg" className='banner' />
                <div className="overlay d-flex justify-content-center align-items-center flex-column text-white">
                    <h1 className='m-0 text-center'>Become a Sponsor</h1>
                </div>
            </Container>
            <Container className='py-5' id="involved">
                <div>
                    <h2 className="my-5 text-center fw-bold">A little <span className="text-primary">help</span> will change the world</h2>
                    <img src="/img/sponsorImg.jpg" className="w-100" style={{ maxHeight: 550, objectFit: "cover" }} />
                    <p className="text-justify fs-4 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h2 className="my-5 text-center">Help them now</h2>
                    <Row className='gx-5 gy-5'>
                        {currentPosts.length > 0 && currentPosts.map(item =>
                            <Col lg="4" md="6">
                                <Link to={"/event/" + item._id} className="text-decoration-none text-dark">
                                    <Card className="involved-card">
                                        <div className="position-relative">
                                            <Card.Img variant="top" src={baseApi + "uploads/cover/" + item.eventCover} />
                                            <span className={eventCurrStatus(item.eventStatus) + " px-5 position-absolute bottom-0 text-white"} style={{ left: 0 }}>{item.eventStatus}</span>
                                        </div>
                                        <Card.Body className="d-flex flex-column justify-content-between">
                                            <Card.Title>{item.eventTitle}</Card.Title>
                                            <Card.Text>
                                                {item.eventDesc.slice(0, 190) + '...'}
                                            </Card.Text>
                                            <span className="border rounded-4 px-2 bg-primary text-white">{format(new Date(item.eventStartTime), 'd MMM yyyy H:mm')}</span>
                                            <Card.Text className="mt-3">
                                                {item.eventLocation.slice(0, 40) + '...'}
                                            </Card.Text>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Link to="/profile"><img src={baseApi + "uploads/avatar/" + item.user.user_avatar} className="involved-avatar me-2" /></Link>
                                                    <p className="m-0">By <b>{item.user.user_name}</b></p>
                                                </div>
                                                <div>
                                                    <p className="m-0">{convertDate(item)} hours</p>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        )}

                    </Row>
                </div>
            </Container>
        </div >
    )
}