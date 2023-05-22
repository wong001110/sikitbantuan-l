import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import BundledEditor from "../components/BundleEditor";
import axios from "axios";
import { UserContext } from "../../context/PublicContext";

export default function ArticleEdit() {
    const baseLocation = "http://localhost:5173/";
    const baseApi = "http://localhost:4000/";
    const [postTitle, setPostTitle] = useState("type in your event title");
    const [event, setEvent] = useState(null);
    const editorRef = useRef(null);
    const currPageId = useParams();
    const [redirect, setRedirect] = useState(false);
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!currPageId) {
            return '';
        }
        const fetchData = async () => {
            await axios.get('/api/event/' + currPageId.id).then(response => {
                const { data } = response;
                setEvent(data);
            })
        }
        fetchData();
    }, [currPageId]);

    function uploadFile(ev) {
        const data = new FormData();
        data.append('blog-img', ev.blob());
        return axios.post('/api/upload-blog-img', data)
    }
    async function updateArticle(ev) {
        ev.preventDefault();
        if (editorRef) {
            const postData = {
                event: currPageId.id,
                user: event.user._id,
                postTitle,
                postCategory: event.eventCategory,
                postContent: editorRef.current.getContent(),
                postCover: event.eventCover,
            }
            await axios.post('/api/blog', postData).then(response => {
                alert("report updated");
                setRedirect(true);
            })

        }
    }
    if (!event) {
        return 'loading...';
    }
    if (redirect) {
        return <Navigate to={'../blog'} />
    }
    if (user._id != event.user._id) {
        setRedirect(true);
    }
    return (
        <Form>
            <Container fluid className='p-0 position-relative'>
                {/* banner */}
                <img src={baseApi + "uploads/cover/" + event.eventCover} className='banner' />
                <div className="overlay d-flex justify-content-center align-items-center flex-column text-white">
                    <Form.Control type="text"
                        className=" bg-transparent text-white fs-1 w-75"
                        value={postTitle}
                        onChange={ev => setPostTitle(ev.target.value)} />
                </div>
            </Container>
            <Container className='py-5' id="involved">
                <Row className='gx-5 gy-5'>
                    <Col lg="8">
                        <div className="bg-white p-4">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <img src={baseApi + "uploads/avatar/" + event.user.user_avatar} className="participant-icon rounded-circle" />
                                    <div className="d-flex flex-column justify-content-end ms-3">
                                        <h5>{event.user.user_name}</h5>
                                        <p className="m-0">Post created time</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    {event.eventCategory.length > 0 && event.eventCategory.map((category, index) =>
                                        <img key={index} src={"/category/" + category + ".jpg"} className="participant-icon border-0" style={{ outline: "none" }} />
                                    )}
                                </div>
                            </div>
                            <div className="text-justify mt-3">
                                <BundledEditor
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={"Finished your report now"}
                                    init={{
                                        statusbar: false,
                                        promotion: false,
                                        min_height: 750,
                                        plugins: [
                                            'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
                                            'searchreplace', 'table', 'wordcount'
                                        ],
                                        file_picker_types: "file image media",
                                        images_upload_handler: function (
                                            blobInfo,
                                            success,
                                            failure,
                                        ) {
                                            return new Promise((resolve, reject) => {
                                                uploadFile(blobInfo)
                                                    .then(data => {
                                                        const url = data.config.baseURL + "/uploads/blog/" + data.data[0];
                                                        resolve(url);
                                                    })
                                                    .catch(e => {
                                                        showToast({
                                                            type: 'error',
                                                            message: ERROR_UPLOADING_IMAGE,
                                                        });
                                                        reject(e);
                                                    });
                                            });
                                        },
                                        content_style: "img{object-fit:cover}",
                                    }}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col lg="4">
                        <Button onClick={updateArticle} className="mb-3 text-white px-4">Report Update</Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}