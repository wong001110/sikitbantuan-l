import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../../../context/PublicContext";
import axios from "axios";
import React, { PureComponent } from 'react';
import { format } from 'date-fns'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const baseApi = "http://localhost:4000/";
    const [users, setUsers] = useState("");
    const [events, setEvents] = useState(0);
    const [lastestEvents, setLastestEvents] = useState(0);
    const [eventsNum, setEventsNum] = useState(0);
    const [eventData, setEventData] = useState('');
    const [sponsors, setSponsors] = useState(0);
    const [redirect, setRedirect] = useState(null);
    const { ready } = useContext(AdminContext);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];


    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/places').then(response => {
                const { data } = response;
                const filteredData = data.filter(res => new Date(res.eventStartTime).getTime() >= start).sort(
                    (objA, objB) => Number(new Date(objB.eventStartTime).getTime()) - Number(new Date(objA.eventStartTime).getTime()),
                );
                const newListNames = [...monthNames];
                const newestMonth = monthNames[new Date(filteredData[0].eventStartTime).getMonth()];
                const list1 = newListNames.splice(0, newListNames.indexOf(newestMonth) + 1)
                const list2 = newListNames.splice(newListNames.indexOf(newestMonth) + 1)
                const currList = list2.concat(list1);

                setEvents(filteredData);
                setLastestEvents(filteredData.slice(0, 10));
                let newData = [];
                currList.map(res => {
                    newData.push({ name: res, events: 0 });
                })
                filteredData.map(res => {
                    const month = monthNames[new Date(res.eventStartTime).getMonth()];
                    let result = newData.filter(item => {
                        return item.name == month
                    })[0]
                    if (result) {
                        result.events += 1
                    }
                })
                setEventsNum(newData);
            })
            await axios.get('/api/users').then(response => {
                const { data } = response;
                setUsers(data);
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
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    let start = Date.now() - year;
    if (!ready) {
        return 'Loading...';
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    let popularUsers = "";
    if (users) {
        popularUsers = users.slice(0, 5);
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
        if (status === "Pending") {
            return ("bg-info");
        }
        if (status === "Canceled") {
            return ("bg-danger");
        }
    }

    console.log(lastestEvents);
    return (
        <Row className="g-3 py-4 px-5 w-100">
            <Col lg="12">
                <h2 className="text-dark">Dashboard</h2>
            </Col>
            <Col lg="4">
                <Card className="rounded-4 border-0 shadow">
                    <Card.Body className="p-5">
                        <Card.Title className="mb-3">Total Event</Card.Title>
                        <h1 className="mb-3 fw-bold">{events.length}</h1>
                        <h5 className="mb-4">+3 Yesterday</h5>
                        <Card.Text className="float-end">
                            updated everyday 00:00
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="4">
                <Card className="rounded-4 border-0 shadow">
                    <Card.Body className="p-5">
                        <Card.Title className="mb-3">Total Sponsor</Card.Title>
                        <h1 className="mb-3 fw-bold">RM {sponsors}</h1>
                        <h5 className="mb-4">+3 Yesterday</h5>
                        <Card.Text className="float-end">
                            updated everyday 00:00
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="4">
                <Card className="rounded-4 border-0 shadow">
                    <Card.Body className="p-5">
                        <Card.Title className="mb-3">Volunteers Monthly</Card.Title>
                        <h1 className="mb-3 fw-bold">{users.length}</h1>
                        <h5 className="mb-4">+3 Yesterday</h5>
                        <Card.Text className="float-end">
                            updated everyday 00:00
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="8">
                <Card className="rounded-4 border-0 shadow h-auto">
                    <Card.Body className="p-5 h-100">
                        <Card.Title className="mb-3">Event Trend</Card.Title>
                        <ResponsiveContainer width="100%" height="100%" minHeight="450px">
                            <AreaChart
                                data={eventsNum}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="events" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="4">
                <Card className="rounded-4 border-0 shadow h-100">
                    <Card.Body className="p-5">
                        <Card.Title className="mb-3">Top Volunteers</Card.Title>
                        {(popularUsers && popularUsers.length) > 0 && popularUsers.map((user, index) => (
                            <div key={index} className="d-flex m-2">
                                <img src={baseApi + "uploads/avatar/" + user.user_avatar} className="comment-icon me-2"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = "/defaulticon.jpg";
                                    }} />
                                <div className="d-flex flex-column w-100">
                                    <h5>{user.user_name}</h5>
                                    <div className="d-flex w-100">
                                        <div className="w-50">
                                            <p className="m-0">{events.filter(res => res.user._id == (user._id)).length}</p>
                                            <p className="m-0">Events</p>
                                        </div>
                                        <div className="w-50">
                                            <p className="m-0">{user.follower.length}</p>
                                            <p className="m-0">Follower</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Card.Body>
                </Card>
            </Col>
            <Col lg="12">
                <Card className="rounded-4 border-0 shadow">
                    <Card.Body className="p-5">
                        <Card.Title className="mb-3">Latest Event</Card.Title>

                        {lastestEvents.length > 0 && lastestEvents.map(event => (
                            <Row key={event._id} className="py-3 justify-content-between align-items-center g-0 position-relative h-100">
                                <Col sm="4">
                                    <h6 className="m-0">{event.eventTitle}</h6>
                                </Col>
                                <Col sm="1">
                                    <p className={eventCurrStatus(event.eventStatus) + " w-100 text-white rounded-5 text-center m-0"}>{event.eventStatus}</p>
                                </Col>
                                <Col sm="5">
                                    <p className="m-0 text-center">{format(new Date(event.eventStartTime), 'd MMM y h:mm')} ~ {format(new Date(event.eventEndTime), 'd MMM y h:mm')}</p>
                                </Col>
                                <Col sm="2">
                                    <p className="m-0">By {event.user.user_name}</p>
                                </Col>
                            </Row>
                        ))}

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}