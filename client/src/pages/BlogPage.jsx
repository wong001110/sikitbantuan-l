import { useEffect, useState } from "react";
import { Col, Container, Pagination, Row, Form, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns'
import PostPagination from "../components/PostPagination";

export default function BlogPage() {
    const baseApi = "http://localhost:4000/";
    const [blogs, setBlogs] = useState([]);
    const currPage = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = blogs.slice(firstPostIndex, lastPostIndex);
    const recommendPost = blogs.slice(0, 3)
    useEffect(() => {
        axios.get('/api/blog').then(response => {
            const { data } = response;
            setBlogs(data.reverse());
        })

    }, [currPage])
    if (!blogs) {
        return 'Loading...';
    }
    function stripHTML(myString) {
        return myString.replace(/(<([^>]+)>)/ig, '');

    }
    console.log(recommendPost);
    return (
        <div>
            <Container fluid className='p-0 position-relative'>
                {/* banner */}
                <img src="/img/blogBanner.jpg" className='banner' />
                <div className="overlay d-flex justify-content-center align-items-center flex-column text-white">
                    <h1 className='m-0 text-center'>Blog<br />Traces of Volunteers</h1>
                </div>
            </Container>
            <Container className='py-5' id="involved">
                <Row className='gx-5 gy-5'>
                    <Col lg="8">
                        <div className="bg-white rounded mb-5">
                            <Form className="d-flex w-100 py-2" id="involvedform">
                                <Row className="w-100 m-0">
                                    <Col lg="12">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                    </Col>
                                    <Col lg="4" className="d-flex align-items-center">
                                        <Form.Select aria-label="Default select example">
                                            <option>Lastest</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                        <Form.Select aria-label="Default select example">
                                            <option>Tag</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Col>
                                    <Col lg="3">
                                        <Button variant="outline-primary">Search</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            {currentPosts.length > 0 && currentPosts.map((blog, index) => (
                                <Link key={index} to={"./" + blog._id} className="text-decoration-none text-dark">
                                    <Row className="gx-4 gy-3">
                                        <Col lg="4">
                                            <img src={baseApi + 'uploads/cover/' + blog.event.eventCover} className="img-thumbnail w-100" />
                                        </Col>
                                        <Col lg="8">
                                            <div>
                                                <p>{format(new Date(blog.post_time), 'd MMM y')}</p>
                                                <h4>{blog.postTitle}</h4>
                                                <p className="text-justify fs-6">{stripHTML(blog.postContent).slice(0, 200) + '...'}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Link>
                            ))}

                        </div>
                        <PostPagination
                            totalPosts={blogs.length}
                            postsPerPage={postsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </Col>
                    <Col lg="4">
                        <h2>Recommend</h2>
                        <div className="d-flex flex-column gap-3">
                            {recommendPost.length > 0 && recommendPost.map((recommend, index) => (
                                <Link key={index} to={"./" + recommend._id} className="text-decoration-none text-dark">
                                    <Row className="gx-4 gy-3">
                                        <Col lg="5">
                                            <img src={baseApi + 'uploads/cover/' + recommend.event.eventCover} className="img-thumbnail-small" />
                                        </Col>
                                        <Col lg="7">
                                            <div>
                                                <p>{format(new Date(recommend.post_time), 'd MMM y')}</p>
                                                <h6>{recommend.postTitle}</h6>
                                            </div>
                                        </Col>
                                    </Row>
                                </Link>
                            ))}
                        </div>


                    </Col>
                </Row>
            </Container>
        </div >
    )
}