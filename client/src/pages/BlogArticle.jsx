import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DummyText from "../components/DummyText";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns'

export default function BlogArticle() {
    const baseApi = "http://localhost:4000/";
    const [post, setPost] = useState(null);
    const currPageId = useParams().id;
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (!currPageId) {
            return 'Loading...';
        }
        const fetchData = async () => {
            await axios.get('/api/blog/' + currPageId).then(response => {
                const { data } = response;
                setPost(data);
            })

            await axios.get('/api/blog').then(response => {
                const { data } = response;
                setBlogs(data.reverse());
            })
        }
        fetchData();
    }, [currPageId]);
    if (!post) {
        return 'Loading...';
    }
    const recommendPost = blogs.slice(0, 3);
    console.log(post);
    return (
        <div>
            <Container fluid className='p-0 position-relative'>
                {/* banner */}
                <img src={baseApi + "uploads/cover/" + post.postCover} className='banner' />
                <div className="overlay d-flex justify-content-center align-items-center flex-column text-white">
                    <h1 className='m-0 text-center'>{post.postTitle}</h1>
                </div>
            </Container>
            <Container className='py-5' id="involved">
                <Row className='gx-5 gy-5'>
                    <Col lg="8">
                        <div className="bg-white p-4">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <Link to={"../user/" + post.user._id}>
                                        <img src={baseApi + "uploads/avatar/" + post.user.user_avatar} className="participant-icon rounded-circle"
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = "/defaulticon.jpg";
                                            }} />
                                    </Link>

                                    <div className="d-flex flex-column justify-content-end ms-3">
                                        <h5>{post.user.user_name}</h5>
                                        <p className="m-0">{format(new Date(post.post_time), 'd MMM y')}</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    {post.postCategory.length > 0 && post.postCategory.map(category =>
                                        <img src={"/category/" + category + ".jpg"} className="participant-icon border-0" style={{ outline: "none" }} />
                                    )}
                                </div>
                            </div>
                            <div className="text-justify mt-3" id="article-content" dangerouslySetInnerHTML={{ __html: post.postContent }} />
                        </div>
                    </Col>
                    <Col lg="4">
                        <h2>Recommend</h2>
                        <div className="d-flex flex-column gap-3">
                            {recommendPost.length > 0 && recommendPost.map((recommend, index) => (
                                <Link key={index} to={"../blog/" + recommend._id} className="text-decoration-none text-dark">
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