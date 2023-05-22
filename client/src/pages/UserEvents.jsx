import { Button, Card, Col, Container, Pagination, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ProfileTop from "../components/ProfileTop";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/PublicContext";
import { format } from 'date-fns'
import axios from "axios";
import PostPagination from "../components/PostPagination";

export default function UserEvents() {
    const baseApi = "http://localhost:4000/";
    const currPageID = useParams().id;
    const [events, setEvents] = useState([]);
    const { user } = useContext(UserContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);

    useEffect(() => {
        axios.get('/api/places/' + currPageID).then(response => {
            const { data } = response;
            const filteredData = data.reverse().filter(res => res.eventStatus !== ("Pending") && res.eventStatus !== ("Cancelled"));
            setEvents(filteredData);
        })
    }, [user]);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = events.slice(firstPostIndex, lastPostIndex);

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
            <ProfileTop />
            <Container className='py-5 overflow-hidden' id="involved">
                <div className="user-profile-list mb-4">
                    <Link to="/" className="active">Latest Event</Link>
                </div>
                <Row className='gx-5 gy-5'>
                    {currentPosts.length > 0 && currentPosts.map(event => (
                        <Col lg="4" md="6" key={event._id}>
                            <Link to={"/event/" + event._id} className="text-decoration-none text-dark">
                                <Card className="involved-card">
                                    <div className="position-relative">
                                        <Card.Img variant="top" src={baseApi + "uploads/cover/" + event.eventCover} />
                                        <span className={eventCurrStatus(event.eventStatus) + " px-5 position-absolute bottom-0 text-white"} style={{ left: 0 }}>{event.eventStatus}</span>
                                    </div>
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <Card.Title>{event.eventTitle}</Card.Title>
                                        <Card.Text>
                                            {event.eventDesc.slice(0, 190) + '...'}
                                        </Card.Text>
                                        <span className="border rounded-4 px-2 bg-primary text-white">{format(new Date(event.eventStartTime), 'd MMM yyyy H:mm')}</span>
                                        <Card.Text className="mt-3">
                                            {event.eventLocation.slice(0, 40) + '...'}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Link to={"/user/" + event.user._id}><img src={baseApi + "uploads/avatar/" + event.user.user_avatar} className="involved-avatar me-2"
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