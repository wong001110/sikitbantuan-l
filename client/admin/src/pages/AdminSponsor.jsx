import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Pagination } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import PostPagination from "../../../src/components/PostPagination";


export default function AdminSponsor() {
    const baseApi = "http://localhost:4000/";
    const [sponsors, setSponsors] = useState([]);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    useEffect(() => {
        axios.get('/api/sponsor').then(response => {
            const { data } = response;
            setSponsors(data.reverse());
        })
    }, [])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = sponsors.slice(firstPostIndex, lastPostIndex);
    return (
        <Row className="g-3 py-4 px-5 w-100">
            <Col lg="12">
                <h2 className="text-dark">Sponsor</h2>
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
                    {(sponsors && currentPosts.length > 0) && currentPosts.map(sponsor => (
                        <Row className="bg-light p-3 justify-content-center align-items-center rounded-3 shadow mb-3 g-0">
                            <Col sm="3">
                                <p className="m-0">Ref No: {new Date(sponsor.sponsor_time).getTime()}</p>
                            </Col>
                            <Col sm="1">
                                <img src={baseApi + "uploads/avatar/" + sponsor.user.user_avatar} className="comment-icon"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = "/defaulticon.jpg";
                                    }} />
                            </Col>
                            <Col sm="2">
                                <h5 className="m-0">{sponsor.user.user_name}</h5>
                                <p className="m-0">RM {sponsor.sponsorAmount}</p>
                            </Col>
                            <Col sm="2">
                                <p className="m-0">{sponsor.user.user_email}</p>
                            </Col>
                            <Col sm="2">
                                <p className="m-0">{format(new Date(sponsor.sponsor_time), 'd MMM yyyy')}</p>
                            </Col>
                            <Col sm="2">
                                <p className="m-0">Reference</p>
                            </Col>
                        </Row>
                    ))}
                </div>
                <PostPagination
                    totalPosts={sponsors.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </Col>

        </Row>
    );
}