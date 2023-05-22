import { Col, Container, Row } from "react-bootstrap";
import ProfileTop from "../components/ProfileTop";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/PublicContext";
import ProfileReview from "../components/ProfileReview";

export default function UserProfile() {
    const currPageId = useParams().id;
    const [events, setEvents] = useState("");
    const [visitor, setVisitor] = useState("");

    const { ready } = useContext(UserContext);
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/places').then(response => {
                const { data } = response;
                setEvents([]);
                const filteredData = data.reverse().filter(res => res.eventStatus !== ("Pending") && res.eventStatus !== ("Cancelled")
                    && res.user._id == currPageId);
                filteredData.map(event => {
                    setEvents(events => [...events, event._id])
                })
            })
            await axios.get('/api/user/' + currPageId).then(response => {
                const { data } = response;
                setVisitor(data);
            });
        }
        fetchData();
    }, [currPageId]);
    if (!ready) {
        return 'loading...';
    }
    if (ready) {
    }
    return (
        <div>
            <ProfileTop />
            <Container className='py-5 overflow-hidden'>
                <Row className='g-5'>
                    <Col lg="4">
                        <div className="bg-white rounded-3 p-3">
                            <p className="fw-bold">About Us</p>
                            <p>{visitor.about}</p>
                            {visitor.website && (<p className="fw-bold">Website:</p>)}
                            <p>{visitor.website}</p>
                            {visitor.contact && (<p className="fw-bold">Contact No:</p>)}
                            <p>{visitor.contact}</p>
                            {visitor.social && (<p className="fw-bold">Social Media</p>)}
                            <p>{visitor.social}</p>
                        </div>
                    </Col>
                    <Col lg="8">
                        <ProfileReview events={events} />
                    </Col>
                </Row>
            </Container>
        </div >
    )
}