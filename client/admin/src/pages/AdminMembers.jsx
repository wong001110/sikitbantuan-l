import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Row, Form, Pagination, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../../context/PublicContext";
import PostPagination from "../../../src/components/PostPagination";

export default function AdminMembers() {
    const baseApi = "http://localhost:4000/";
    const [users, setUsers] = useState([])
    const [events, setEvents] = useState();
    const { ready } = useContext(AdminContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = users.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/users').then(response => {
                const { data } = response;
                setUsers(data);
                console.log(users);
            })
            await axios.get('/api/usersEvent').then(response => {
                const { data } = response;
                setEvents(data);
            })
        }
        fetchData();
    }, []);
    if (!ready) {
        return '';
    }
    return (
        <Row className="g-3 py-4 px-5 w-100">
            <Col lg="12">
                <h2 className="text-dark">Members</h2>
            </Col>
            <Col lg="12">
                <Form id="sponsorform" className="d-flex justify-content-between">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 w-auto text-dark"
                        aria-label="Search"
                    />
                    <div className="d-flex w-25">
                        <ButtonGroup aria-label="Basic example" className="w-100">
                            <Button variant="dark" className="w-100">Volunteers</Button>
                            <Button variant="light" className="w-100">NGO</Button>
                        </ButtonGroup>
                    </div>
                </Form>
            </Col>
            <Col lg="12" id="adminSponsor">
                <div>
                    <Row className="d-flex g-4">
                        {(users && events && currentPosts.length > 0) && currentPosts.map(user => (
                            <Col sm="3">
                                <div className="bg-light rounded-3 shadow text-center position-relative p-4">
                                    <div>
                                        <img src={baseApi + "uploads/avatar/" + user.user_avatar} className="participant-icon rounded-circle"
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = "/defaulticon.jpg";
                                            }} />
                                    </div>
                                    <p className="my-3">{user.user_name}</p>
                                    <div className="d-flex justify-content-between px-4">
                                        <div>
                                            <p className="m-0">{events.filter(res => res.user == (user._id)).length}</p>
                                            <p className="m-0">Events</p>
                                        </div>
                                        <div>
                                            <p className="m-0">{user.follower.length}</p>
                                            <p className="m-0">Followers</p>
                                        </div>
                                    </div>
                                    <div className="position-absolute top-0 end-0 text-end p-2">
                                        <Link to="./volunteer" className="text-dark"><FontAwesomeIcon icon={faEllipsisVertical} size="1x" /></Link>
                                    </div>
                                </div>
                            </Col>
                        ))}

                    </Row>
                </div>
                <PostPagination
                    totalPosts={users.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </Col>
        </Row>
    );
}