import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../context/PublicContext";
import axios from "axios";
import EventCreate from "./EventCreate";
import EventTime from "./EventTime";

export default function ProfileTop() {
    const baseUrl = "http://localhost:5173/";
    const apiurl = "http://localhost:4000/"
    const currPage = useLocation().pathname;
    const currPageId = useParams().id;
    const [visitor, setVisitor] = useState("");
    const [events, setEvents] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const { user, ready } = useContext(UserContext);
    useEffect(() => {
        if (user) {
            axios.get('/api/user/' + currPageId).then(response => {
                const { data } = response;
                setVisitor(data);
            });
        } else {
            if (currPageId) {
                axios.get('/api/user/' + currPageId).then(response => {
                    const { data } = response;
                    setVisitor(data);
                })
            }
        }
        axios.get('/api/places/' + currPageId).then(response => {
            const { data } = response;
            setEvents(data);
        })
        setRedirect(false);
    }, [currPage, redirect, user]);
    if (!ready) {
        return 'Loading...';
    }

    async function followUser(ev) {
        ev.preventDefault();
        if (user._id != currPageId) {
            await axios.put('/api/user/' + currPageId, { uid: user._id }).then(response => {
                setRedirect(true);
            })
        }

    }
    if (!visitor) {
        return 'loading...';
    }
    return (
        <Container fluid className='p-0 '>
            {/* banner */}
            <div className="position-relative">
                <img src={apiurl + 'uploads/cover/' + (visitor && visitor.user_cover)} className='banner'
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/defaultimg.jpg";
                    }} />
                <div className="overlay d-flex justify-content-center align-items-center flex-column text-white p-5" >
                    <h1 className='m-0 text-center' style={{ maxWidth: 800 }}>{visitor.user_desc}</h1>
                </div>
                {(user && user._id == currPageId) && (
                    <div className="w-100 position-absolute bottom-0 start-0 d-flex justify-content-end">
                        <Link to={baseUrl + 'user/' + currPageId + '/edit'}><Button className="text-white px-5">Edit Profile</Button></Link>
                    </div>
                )}
            </div>
            <div className="bg-light">
                <Container className="position-relative h-100">
                    <div className="d-flex user-profile w-100">
                        <div>
                            <img src={apiurl + 'uploads/avatar/' + (visitor && visitor.user_avatar)} className="img-thumbnail rounded-circle"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = "/defaulticon.jpg";
                                }} />
                        </div>
                        <div className="d-flex flex-column justify-content-between w-75 py-3 ps-3">
                            <h2 className="text-white">{(user && user._id == currPageId) ? user.user_name : visitor.user_name}</h2>
                            <div className="d-flex justify-content-between w-100">
                                <h4 className="fw-normal">{events.length} Event |
                                    {visitor.follower.length} Followers | <EventTime events={events} currPage={currPage} /> Event Hours</h4>
                                {(user && user._id == currPageId) && (
                                    <EventCreate setRedirect={setRedirect} />
                                )}
                                {(visitor && (!user || user._id !== currPageId)) && (
                                    <Button className="text-white px-5" onClick={followUser} disabled={!user || visitor.follower.includes(user._id)}>Follow</Button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="user-profile-list">
                        <Link to={baseUrl + './user/' + currPageId} className={currPage === ('/user/' + currPageId) && ("active")}>Profile</Link>
                        <Link to={baseUrl + './user/' + currPageId + '/events'} className={currPage === ('/user/' + currPageId + '/events') && ("active")}>Events</Link>
                        <Link to={baseUrl + './user/' + currPageId + '/sponsor'} className={currPage === ('/user/' + currPageId + '/sponsor') && ("active")}>Sponsor</Link>
                    </div>
                </Container>
            </div>
        </Container>

    )
}