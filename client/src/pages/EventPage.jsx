import { Button, Col, Container, Form, OverlayTrigger, Row, Tooltip, } from "react-bootstrap";
import { faFacebook, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SponsorCreate from "../components/SponsorCreate";
import { format } from 'date-fns'
import ReactTimeAgo from 'react-time-ago'
import InvolvedEvent from "../components/InvolvedEvent";
import ReviewCreate from "../components/ReviewCreate";
import RateReviews from "../components/RateReviews";
import { UserContext } from "../../context/PublicContext";

export default function EventPage() {
    const baseApi = "http://localhost:4000/";
    const currPageId = useParams().id;
    const [event, setEvent] = useState(null);
    const [blogs, setBlogs] = useState(false);
    const [sponsors, setSponsors] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!currPageId) {
            return '';
        }
        const fetchData = async () => {
            await axios.get('/api/event/' + currPageId).then(response => {
                const { data } = response;
                setEvent(data);
            })
            await axios.get('/api/sponsor/' + currPageId).then(response => {
                const { data } = response;
                setSponsors(data.reverse());
            })
            await axios.get('/api/review/' + currPageId).then(response => {
                const { data } = response;
                setReviews(data);
            })
            await axios.get('/api/blog').then(response => {
                const { data } = response;
                const filteredData = data.filter(res => res.event._id == currPageId)
                console.log(filteredData);
                if (filteredData != "") {
                    setBlogs(true);
                } else {
                    setBlogs(false);
                }
            })

        }
        setRedirect(false);
        fetchData();
    }, [currPageId, redirect]);
    if (!event) {
        return '';
    }

    function totalRating() {
        if (reviews) {
            let total = 0;
            reviews.map((review) => {
                total += review.rating
            })
            return (total / reviews.length);
        }
    }
    function participantId() {
        const list = []
        event.participants.map(item => {
            list.push(item._id)
        })
        return list;
    }
    return (
        <div>
            <Container fluid className='p-0 position-relative'>
                {/* banner */}
                <img src={baseApi + "uploads/cover/" + event.eventCover} className='banner' />
                <div className="overlay">
                    <Container className="d-flex justify-content-start justify-content-sm-end align-items-end flex-rows text-white w-100 h-100 pb-5">
                        <div className="d-flex justify-content-start align-items-start w-100">
                            <img src={baseApi + "uploads/avatar/" + event.user.user_avatar} className="event-profile me-4" />
                            <div>
                                <h2 className='m-0'>{event.eventTitle}</h2>
                                <span className="rounded-4 px-2 bg-primary text-white">{format(new Date(event.eventStartTime), 'd MMM y h:mm')} ~ {format(new Date(event.eventEndTime), 'd MMM y h:mm')}</span>
                                <p className='m-0'>By {event.user.user_name}</p>
                            </div>

                        </div>
                        {event.eventStatus !== "Approved" || (user && user._id === event.user._id) ?
                            "" :
                            <div>
                                {event.eventSponsored ? <SponsorCreate setRefresh={setRedirect} /> : ""}
                                <InvolvedEvent setRefresh={setRedirect} maxParticipants={event.eventParticipants} participantId={participantId()} />
                            </div>}
                        {(event.eventStatus == "End"
                            && (user && user._id == event.user._id) && !blogs) && (
                                <Link to={"./user/" + user._id}><Button className="mb-3 text-white px-4">Report</Button></Link>
                            )}

                    </Container>
                </div>
            </Container>
            <Container className='py-5'>
                <Row className="gx-8 text-justify">
                    <Col lg="8">
                        <h3>About the Event</h3>
                        <p>{event.eventDesc}</p>
                    </Col>
                    <Col lg="4" className="h-100">
                        <h3 className="my-3">Goal</h3>
                        <div>
                            {event.eventCategory.length > 0 && event.eventCategory.map(category => (
                                <img src={"/category/" + category + ".jpg"} className="category-icon" />
                            ))}
                        </div>
                        <h3 className="my-3">Location</h3>
                        <div>
                            <p>{event.eventLocation}</p>
                        </div>
                    </Col>
                    <Col lg="8">
                        <h3 className="my-3">Participants({event.participants.length})</h3>
                        <div>
                            {event.participants.length > 0 ? event.participants.map(participant => (
                                <Link to={"/user/" + participant._id}><img src={baseApi + 'uploads/avatar/' + participant.user_avatar} className="participant-icon rounded-circle mb-2 me-2"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = "/defaulticon.jpg";
                                    }} z /></Link>
                            )) : <div className="d-flex justify-content-center align-items-center my-5">
                                <h6 style={{ color: "grey" }}>There is no participant on this event</h6>
                            </div>}
                        </div>
                        <h3 className="my-3">Photos</h3>
                        <div>
                            {event.eventPhotos.length > 0 ? event.eventPhotos.map(photo => (
                                <img src={baseApi + "uploads/photos/" + photo} className="img-thumbnail mb-2 me-2" />
                            )) : <div className="d-flex justify-content-center align-items-center my-5">
                                <h6 style={{ color: "grey" }}>Event creater didn't set reference photo for this Event</h6>
                            </div>}
                        </div>
                        {event.eventStatus == "End" && (
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="my-3">Reviews ({(reviews && reviews.length)})</h3>
                                    <div>
                                        <RateReviews rating={totalRating()} />
                                    </div>
                                </div>
                                <div className="comment-list p-1">
                                    {(reviews && reviews.length > 0) ? reviews.map(review => (
                                        <div className="d-flex flex-column justify-content-between w-100 mb-3 pb-3 border-bottom border-dark">
                                            <div className="d-flex">
                                                <div>
                                                    <img src={baseApi + "uploads/avatar/" + review.user.user_avatar} className="comment-icon me-2"
                                                        onError={({ currentTarget }) => {
                                                            currentTarget.onerror = null;
                                                            currentTarget.src = "/defaulticon.jpg";
                                                        }} />
                                                </div>
                                                <div>
                                                    <div className="d-flex justify-content-between w-100">
                                                        <h6>{review.user.user_name}</h6>
                                                        <div className="d-flex gap-2 justify-content-start">
                                                            <RateReviews rating={review.rating} />
                                                        </div>
                                                    </div>
                                                    <p className="m-0 fs-comment">{review.review}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )) :
                                        <div className="d-flex justify-content-center align-items-center my-5">
                                            <h6 style={{ color: "grey" }}>Currently no reviews on this event</h6>
                                        </div>}
                                </div>
                                <ReviewCreate setRefresh={setRedirect} />
                            </div>
                        )}

                    </Col>
                    {/* Sponsor */}
                    <Col lg="4">
                        <div>
                            {event.eventSponsored && (
                                <h3 className="my-3">Sponsor ({sponsors && sponsors.length})</h3>
                            )}
                        </div>
                        <div className="comment-list p-1">
                            {(sponsors && sponsors.length > 0) && sponsors.map(sponsor => (
                                <div className="d-flex flex-column justify-content-between w-100 mb-3 pb-3 border-bottom border-dark">
                                    <div className="d-flex">
                                        <div>
                                            <img src={baseApi + "uploads/avatar/" + sponsor.user.user_avatar} className="comment-icon me-2"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = "/defaulticon.jpg";
                                                }} />
                                        </div>
                                        <div className="w-100">
                                            <div className="d-flex justify-content-between w-100">
                                                <div>
                                                    <h6 className="mb-0">{sponsor.user.user_name}</h6>
                                                    <p className="m-0 fs-remarks"><ReactTimeAgo date={sponsor.sponsor_time} locale="en-US" /></p>
                                                </div>
                                                <div>
                                                    <h6>RM {sponsor.sponsorAmount}</h6>
                                                </div>
                                            </div>
                                            <p className="m-0 fs-comment">{sponsor.wish}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}