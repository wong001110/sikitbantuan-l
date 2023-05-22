import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Pagination, Modal } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns'
import PostPagination from "../../../src/components/PostPagination";

export default function AdminEvents() {
    const [events, setEvents] = useState([]);
    const [statusChange, setStatusChanges] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = events.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        axios.get('/api/places').then(response => {
            const { data } = response;
            const sortedData = data.reverse();
            setEvents(data);
        })
        setStatusChanges(false);
    }, [statusChange])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
        if (status === "Pending") {
            return ("bg-info");
        }
        if (status === "Canceled") {
            return ("bg-danger");
        }
    }
    async function approvedEvent(event) {
        if (event) {
            const eventStatus = {
                status: "Approved",
                event: event._id,
            }
            await axios.put('/api/event', eventStatus);
            setStatusChanges(true);
        }

    }
    function liveUpdate() {
        if (events) {
            events.map(async event => {
                if (event && event.eventStatus != "Cancelled") {
                    let eventStart = new Date(event.eventStartTime).getTime();
                    let eventEnd = new Date(event.eventEndTime).getTime();
                    let currTime = new Date().getTime();
                    if (eventStart < currTime && event.eventStatus === "Approved") {
                        console.log('1');
                        const eventStatus = {
                            status: "Ongoing",
                            event: event._id,
                        }
                        await axios.put('/api/event', eventStatus);
                    }
                    if ((eventEnd + 86400000) < currTime && event.eventStatus === "Ongoing") {
                        console.log('2');
                        const eventStatus = {
                            status: "End",
                            event: event._id,
                        }
                        await axios.put('/api/event', eventStatus);
                    }

                }
            })
        } else {
            return '';
        }
    }
    function endEvent(id) {
        console.log(id);
        // <Navigate to={'./' + id} />
    }
    liveUpdate();
    return (
        <Row className="g-3 py-4 px-5 w-100">
            <Col lg="12">
                <h2 className="text-dark">Events</h2>
            </Col>
            <Col lg="12">
                <Form id="sponsorform" className="d-flex justify-content-between">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 w-auto text-dark"
                        aria-label="Search"
                    />
                    <div className="d-flex">
                        <Form.Select aria-label="Default select example" className="w-auto me-3">
                            <option>Lastest</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Button variant="primary" type="submit" className="px-4 text-white">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Col>
            <Col lg="12" id="adminSponsor">
                <div>
                    {currentPosts.length > 0 && currentPosts.map(event => (
                        <Row key={event._id} className="bg-light p-3 justify-content-between align-items-center rounded-3 shadow mb-3 g-0 position-relative h-100">
                            <Col sm="1" className="text-center py-2 px-3 text-white">
                                <div className="p-2 bg-primary rounded-3">
                                    <p className="m-0 fw-bold">{new Date(event.eventStartTime).getDay()} <br />{format(new Date(event.eventEndTime), 'MMM')}</p>
                                </div>
                            </Col>
                            <Col sm="3">
                                <h5 className="m-0">{event.eventTitle}</h5>
                            </Col>
                            <Col sm="1">
                                <p className={eventCurrStatus(event.eventStatus) + " w-100 text-white rounded-5 text-center m-0"}>{event.eventStatus}</p>
                            </Col>
                            <Col sm="2">
                                <p className="m-0 text-center">{format(new Date(event.eventStartTime), 'd MMM y h:mm')}<br /> {format(new Date(event.eventEndTime), 'd MMM y h:mm')}</p>
                            </Col>
                            <Col sm="2">
                                <p className="m-0">By {event.user.user_name}</p>
                            </Col>
                            <Col sm="3">
                                {event.eventStatus === "Pending" && (
                                    <div className="d-flex flex-row gap-3 pe-4">
                                        <Button onClick={ev => approvedEvent(event)} type="button" className="w-100 text-white bg-success border-0">
                                            Approve
                                        </Button>
                                        <Button type="button" className="w-100 text-white bg-danger border-0">
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                                {event.eventStatus === "Ongoing" && (
                                    <div className="d-flex flex-row gap-3 pe-4">
                                        <Button onClick={ev => endEvent(event.user)} type="button" className="w-100 text-white bg-warning border-0">
                                            End
                                        </Button>
                                        <Button type="button" className="w-100 text-white bg-danger border-0">
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                                {event.eventStatus === "End" && (
                                    <div className="d-flex flex-row gap-3 pe-4 justify-content-end">
                                        <Button type="button" className="w-50 text-white bg-primary border-0">
                                            Check
                                        </Button>
                                    </div>
                                )}
                                {event.eventStatus === "Approved" && (
                                    <div className="d-flex flex-row gap-3 pe-4 justify-content-end">
                                        <Button type="button" className="w-50 text-white bg-danger border-0">
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                                {event.eventStatus === "Cancelled" && (
                                    <div className="d-flex flex-row gap-3 pe-4">
                                    </div>
                                )}
                            </Col>
                            <div className="position-absolute top-0 end-0 text-end p-2">
                                <Link className="text-dark" onClick={handleShow}><FontAwesomeIcon icon={faEllipsisVertical} size="1x" /></Link>
                            </div>
                        </Row>
                    ))}
                </div>
                <PostPagination
                    totalPosts={events.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </Col>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>
    );
}