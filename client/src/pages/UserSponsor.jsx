import { Col, Container, Pagination, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ProfileTop from "../components/ProfileTop";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import PostPagination from "../components/PostPagination";

export default function UserSponsor() {
    const baseUrl = "http://localhost:5173/";
    const currPageId = useParams().id;
    const [sponsors, setSponsors] = useState([]);
    const [total, setTotal] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    useEffect(() => {
        axios.get('/api/sponsor').then(response => {
            const { data } = response;
            const filteredData = data.filter(res => res.user._id == currPageId)
            setSponsors(filteredData);
            setTotal(0);
            filteredData.map(giving => {
                setTotal(prevState => (prevState + giving.sponsorAmount))
            })
        })
    }, [])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = sponsors.slice(firstPostIndex, lastPostIndex);

    return (
        <div>
            <ProfileTop />
            <Container className='py-5 overflow-hidden' id="involved">
                <div className="d-flex justify-content-between">
                    <div className="user-profile-list mb-4">
                        <Link to="/" className="active">Sponsor History</Link>
                    </div>
                    <h3 className="text-dark">Total Sponsor : RM {total}</h3>
                </div>

                <Row>
                    {currentPosts.length > 0 && currentPosts.map((sponsor, index) => (
                        <Col lg="12" key={index}>
                            <div>
                                <Row className="bg-light p-4 justify-content-center align-items-center rounded-3 shadow mb-3 g-0">
                                    <Col sm="2">
                                        <p className="m-0">Ref No: {new Date(sponsor.sponsor_time).getTime()}</p>
                                    </Col>
                                    <Col sm="2">
                                        <h5 className="m-0">{sponsor.user.user_name}</h5>
                                        <p className="m-0">RM {sponsor.sponsorAmount}</p>
                                    </Col>
                                    <Col sm="7">
                                        <p className="m-0">{sponsor.wish}</p>
                                    </Col>
                                    <Col sm="1" className="text-end">
                                        <p className="m-0">{format(new Date(sponsor.sponsor_time), 'd MMM yyyy')}</p>
                                        <Link to={baseUrl + "event/" + sponsor.event} className="m-0 text-decoration-none text-primary">Sponsor for &raquo;</Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ))}

                </Row>
                <PostPagination
                    totalPosts={sponsors.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </Container>
        </div >
    )
}