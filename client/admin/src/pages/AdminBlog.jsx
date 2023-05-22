import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Pagination, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns'
import PostPagination from "../../../src/components/PostPagination";

export default function AdminBlog() {
    const baseApi = "http://localhost:4000/";
    const [blogs, setBlogs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = blogs.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        axios.get('/api/blog').then(response => {
            const { data } = response;
            setBlogs(data.reverse());
        })

    }, [])
    if (!blogs) {
        return "Loading...";
    }
    console.log(blogs);

    return (
        <Row className="g-3 py-4 px-5 w-100">
            <Col lg="12">
                <h2 className="text-dark">Blog</h2>
            </Col>
            <Col lg="12">
                <div className="w-100 d-flex">
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
                                Search
                            </Button>
                        </div>
                    </Form>
                    <div className="w-100 text-end">
                        <Button variant="primary" type="submit" className="px-4 text-white">
                            Add Post
                        </Button>
                    </div>
                </div>

            </Col>
            <Col lg="12" id="adminSponsor">
                <div>
                    {currentPosts.length > 0 && currentPosts.map(blog => (
                        <Row className="bg-light p-3 justify-content-between rounded-3 shadow mb-3 g-0 h-100">
                            <Col sm="2">
                                <img src={baseApi + "uploads/cover/" + blog.event.eventCover} className="adminblog-img pe-3"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = "/defaultimg.jpg";
                                    }} />
                            </Col>
                            <Col sm="8" className="px-3 h-auto">
                                <div className="h-100 d-flex flex-column justify-content-between">
                                    <h5 className="m-0">{blog.postTitle}</h5>
                                    <p className="m-0">Published {format(new Date(blog.post_time), 'd MMM y')}</p>
                                </div>
                            </Col>
                            <Col sm="2" className="d-flex flex-column align-items-end justify-content-between">
                                <div className="d-flex gap-2 align-items-center">
                                    <div>volunteer</div>
                                    <img src={baseApi + "uploads/avatar/" + blog.user.user_avatar} className="involved-avatar"
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = "/defaulticon.jpg";
                                        }} />
                                </div>
                                <div className="d-flex gap-3">
                                    <Link to="./view" className="text-decoration-none text-dark">View</Link>
                                    <Link to="./edit" className="text-decoration-none text-dark">Edit</Link>
                                </div>
                            </Col>
                        </Row>
                    ))}
                </div>
                <PostPagination
                    totalPosts={blogs.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </Col>
        </Row>
    );
}