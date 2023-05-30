import { useEffect, useState } from "react";
import { Button, Col, Container, Pagination, Row, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns'
import PostPagination from "../components/PostPagination";

export default function InvolvedPage() {
    const baseApi = "http://localhost:4000/";
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [eventSponsored, setEventSponsored] = useState(false);
    const [eventStatus, setEventStatus] = useState("");
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);
    123
    useEffect(() => {
        axios.get('/api/places').then(response => {
            const { data } = response;
            const filteredData = data.reverse().filter(res => res.eventStatus !== ("Pending") && res.eventStatus !== ("Cancelled") &&
                res.eventTitle.includes(search) && (res.eventSponsored == eventSponsored) && (eventStatus == "" ? res.eventStatus : res.eventStatus == eventStatus)
            );
            setEvents(filteredData);
            console.log(events);
        })

        console.log(eventStatus);
    }, [search, eventSponsored, eventStatus])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = events.slice(firstPostIndex, lastPostIndex);

    function isSponsored(ev) {
        const { checked } = ev.target;
        if (checked) {
            setEventSponsored(true)
        } else {
            setEventSponsored(false)
        }
    }
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

    return (
        <div>
            <Container fluid className='p-0 position-relative'>
                {/* banner */}
                <img src="/img/involvedBanner.jpg" className='banner' />
                <div className="overlay d-flex justify-content-center align-items-center flex-column text-white">
                    <h1 className='m-0'>Involved with</h1><br />
                </div>
            </Container>
            <Container className='py-5' id="involved">
                <div className="bg-white rounded mb-5">
                    <Form className="d-flex w-100 py-2" id="involvedform">
                        <Row className="w-100 m-0">
                            <Col lg="12">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={search}
                                    onChange={ev => setSearch(ev.target.value)}
                                />
                            </Col>
                            <Col lg="2" className="d-flex align-items-center">
                                <Form.Select onChange={ev => setEventStatus(ev.target.value)} value={eventStatus} >
                                    <option value="">All</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="End">End</option>
                                </Form.Select>

                            </Col>
                            <Col lg="4" className="d-flex align-items-center">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Sponsored"
                                    onChange={isSponsored}
                                />
                            </Col>
                            <Col lg="6" className=" text-end">
                                <h3>Total Event Found : <span className="text-primary">{events.length}</span></h3>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Row className='gx-5 gy-5'>
                    {currentPosts.length > 0 && currentPosts.map(event => (
                        <Col lg="4" md="6" key={event._id}>
                            <Link to={"/event/" + event._id} className="text-decoration-none text-dark">
                                <Card className="involved-card">
                                    <div className="position-relative">
                                        <Card.Img variant="top" src={baseApi + "uploads/cover/" + event.eventCover}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = "/defaultimg.jpg";
                                            }} />
                                        <span className={eventCurrStatus(event.eventStatus) + " px-5 position-absolute bottom-0 text-white"} style={{ left: 0 }}>{event.eventStatus}</span>
                                    </div>
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <Card.Title>{event.eventTitle}</Card.Title>
                                        <Card.Text className="text-justify">
                                            {event.eventDesc.slice(0, 190) + '...'}
                                        </Card.Text>
                                        <span className="border rounded-4 px-2 bg-primary text-white">{format(new Date(event.eventStartTime), 'd MMM yyyy H:mm')}</span>
                                        <Card.Text className="mt-3">
                                            {event.eventLocation.slice(0, 40) + '...'}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Link to={"/user/" + event.user._id}><img src={baseApi + "uploads/avatar/" + event.user.user_avatar} className="involved-avatar me-2 object-fit-cover"
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = "/defaulticon.jpg";
                                                    }} /></Link>
                                                <p className="m-0">By <b>{event.user.user_name}</b></p>
                                            </div>
                                            <div>
                                                <p className="m-0">{convertDate(event)} Hours</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
                <PostPagination
                    totalPosts={events.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </Container>
        </div >
    )
}