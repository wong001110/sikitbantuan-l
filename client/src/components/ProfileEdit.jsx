import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../context/PublicContext";
import axios from "axios";

export default function ProfileEdit() {
    const baseUrl = "http://localhost:5173/";
    const apiurl = "http://localhost:4000/"
    const currPage = useLocation().pathname;
    const currPageId = useParams().id;
    const [visitor, setVisitor] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [desc, setDesc] = useState('');
    const [cover, setCover] = useState('');
    const [avatar, setAvatar] = useState('');
    const [about, setAbout] = useState('');
    const [website, setWebsite] = useState('');
    const [contact, setContact] = useState('');
    const [social, setSocial] = useState('');

    const { user, ready, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            if (currPageId) {
                axios.get('/api/user/' + currPageId).then(response => {
                    const { data } = response;
                    setUsername(data.user_name);
                    setEmail(data.user_email);
                    setDesc(data.user_desc);
                    setAbout(data.about);
                    setWebsite(data.website);
                    setAvatar(data.user_avatar);
                    setContact(data.contact);
                    setSocial(data.social);
                    setCover(data.user_cover);
                })
            }
        }
        setRedirect(false);
    }, [currPage, user]);
    if (!ready) {
        return 'Loading...';
    }
    function uploadAvatar(ev) {
        const file = ev.target.files;
        const data = new FormData();
        data.append('avatar', file[0]);
        axios.post('/upload-avatar', data).then((response) => {
            setAvatar(response.data[0]);
        }).catch((error) => {
            console.log(error);
        });
    }
    function uploadCover(ev) {
        const file = ev.target.files;
        const data = new FormData();
        data.append('cover', file[0]);
        axios.post('/api/upload-cover', data).then((response) => {
            setCover(response.data[0]);
        }).catch((error) => {
            console.log(error);
        });
    }
    async function updateProfile(ev) {
        ev.preventDefault();
        const userData = {
            user_name: username,
            user_email: email,
            user_avatar: avatar, user_cover: cover,
            user_desc: desc,
            about, website, contact, social
        }
        await axios.put('/api/user', userData).then(response => {

        });
        const { data } = await axios.get('/api/user/' + user._id);
        setUser(data);
        setRedirect(true);
    }
    if (redirect) {
        return <Navigate to={'/user/' + user._id} />
    }
    return (
        <Container fluid className='p-0 '>
            {/* banner */}
            <Form onSubmit={updateProfile}>
                <div className="position-relative">
                    <img src={cover && (apiurl + 'uploads/cover/' + cover)} className='banner'
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/defaultimg.jpg";
                        }} />
                    <div className="overlay d-flex justify-content-center align-items-center flex-column text-white p-5" >
                        <h1 className='m-0 text-center' style={{ width: 800 }}>
                            <Form.Control className="w-100 fs-1 bg-transparent text-white"
                                placeholder="Leave some slogon for yourself !"
                                value={desc}
                                onChange={ev => setDesc(ev.target.value)}
                            />
                        </h1>
                    </div>
                    <div className="position-absolute bottom-0 end-0">
                        <label className="position-relative me-4">
                            <Form.Control type="file" className="position-absolute w-100 h-100" hidden onChange={uploadCover} />
                            <h4 className="text-white btn btn-primary px-4">Edit Cover</h4>
                        </label>
                    </div>
                </div>
                <div className="bg-light">
                    <Container className="position-relative h-100">
                        <div className="d-flex user-profile w-100">
                            <div>
                                <label className="position-relative">
                                    <Form.Control type="file" className="position-absolute w-100 h-100" hidden onChange={uploadAvatar} />
                                    {avatar ?
                                        <img src={apiurl + 'uploads/avatar/' + avatar} className="img-thumbnail rounded-circle" />
                                        :
                                        <img src={apiurl + 'uploads/avatar/' + (user && user.user_avatar) || (visitor && visitor.user_avatar)} className="img-thumbnail rounded-circle"
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = "/defaulticon.jpg";
                                            }} />
                                    }
                                </label>
                            </div>
                            <div className="d-flex flex-column justify-content-between w-75 py-3 ps-3">
                                <h2 className="text-white"><Form.Control type="text" className="text-white bg-transparent w-50 fs-2"
                                    value={username}
                                    onChange={ev => setUsername(ev.target.value)} /></h2>
                                <div className="d-flex justify-content-between w-100">
                                    {user && (
                                        <div className="w-100">
                                            <Button type="submit" className="text-white px-5 float-end" >Update</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row px-5 pb-5">
                            <Form.Group className="mb-3 col-6">
                                <Form.Label className="fw-bold">Email</Form.Label>
                                <Form.Control type="email" placeholder="Any website?"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-6">
                                <Form.Label className="fw-bold">About Us</Form.Label>
                                <Form.Control type="text" placeholder="Let's introduce yourself"
                                    value={about}
                                    onChange={ev => setAbout(ev.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-6">
                                <Form.Label className="fw-bold">Website</Form.Label>
                                <Form.Control type="text" placeholder="Any website?"
                                    value={website}
                                    onChange={ev => setWebsite(ev.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-6">
                                <Form.Label className="fw-bold">Contact No</Form.Label>
                                <Form.Control type="text" placeholder="Leave your contact no. here!"
                                    value={contact}
                                    onChange={ev => setContact(ev.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-6">
                                <Form.Label className="fw-bold">Social Media</Form.Label>
                                <Form.Control type="text" placeholder="where can we find you"
                                    value={social}
                                    onChange={ev => setSocial(ev.target.value)} />
                            </Form.Group>
                        </div>
                    </Container>
                </div>
            </Form>
        </Container>
    )
}