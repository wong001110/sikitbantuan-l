import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useState } from "react";


export default function EventCreate({ setRedirect }) {
    const [validated, setValidated] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventCover, setEventCover] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventPhotos, setEventPhotos] = useState([]);
    const [eventLocation, setEventLocation] = useState('');
    const [eventSponsored, setEventSponsored] = useState(false);
    const [eventParticipants, setEventParticipants] = useState(10);
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');


    const [show, setShow] = useState(false);
    const categorys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function categorySelected(ev) {
        const { checked, name } = ev.target;
        if (checked) {
            setEventCategory([...eventCategory, name].sort())
        } else {
            setEventCategory([...eventCategory.filter(selectedName => selectedName !== name)])
        }
    }
    function isSponsored(ev) {
        const { checked } = ev.target;
        if (checked) {
            setEventSponsored(true)
        } else {
            setEventSponsored(false)
        }
    }
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/api/upload-photos', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            setEventPhotos(prev => {
                return [...prev, ...filenames];
            });
        })
    }
    function removePhoto(ev, filename) {
        ev.preventDefault();
        setEventPhotos([...eventPhotos.filter(photo => photo !== filename)]);
    }

    function uploadCover(ev) {
        const file = ev.target.files;
        const data = new FormData();
        data.append('cover', file[0]);
        axios.post('/api/upload-cover', data).then((response) => {
            setEventCover(response.data[0]);
        }).catch((error) => {
            console.log(error);
        });
    }
    async function createEvent(ev) {
        const form = ev.currentTarget;
        console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        setValidated(true);
        const eventData = {
            eventTitle, eventLocation, eventDesc, eventCategory,
            eventPhotos, eventCover, eventSponsored,
            eventParticipants, eventStartTime, eventEndTime,
        }
        if (form.checkValidity() !== false) {
            await axios.post('/api/event', eventData);
            setRedirect(true);
            setShow(false);
            //initial
            setEventTitle('')
            setEventLocation('')
            setEventDesc('')
            setEventCategory('')
            setEventPhotos([])
            setEventCover('')
            setEventSponsored(false)
            setEventParticipants(10)
            setEventStartTime('')
            setEventEndTime('')
        }
    }
    console.log(eventCategory);
    return (
        <div>
            <Button onClick={handleShow} className="text-white px-5">Create an Event</Button>
            <Modal show={show} onHide={handleClose} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Create An Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='row px-5' noValidate validated={validated} onSubmit={createEvent}>
                        <Form.Group className="mb-3 col-6">
                            <Form.Label>Event Title</Form.Label>
                            <Form.Control type="text" placeholder="type in your event title"
                                required
                                value={eventTitle}
                                onChange={ev => setEventTitle(ev.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 col-6">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="your event address"
                                required
                                value={eventLocation}
                                onChange={ev => setEventLocation(ev.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3 col-12">
                            <Form.Label>Event Description</Form.Label>
                            <Form.Control as="textarea" rows="5"
                                required
                                value={eventDesc}
                                onChange={ev => setEventDesc(ev.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 col-12">
                            <Form.Label>Event Goal ({eventCategory.length == 0 && (
                                <span className="text-danger">Please select at least one category</span>
                            )})</Form.Label>
                            <InputGroup hasValidation>
                                <div className="w-100 border border-1 overflow-scroll rounded-3 p-1">
                                    <div className="w-auto d-flex">
                                        <Form.Check>
                                            {categorys.map((category) => (
                                                <label className="position-relative" key={category}>
                                                    <img src={`../../category/${category}.jpg`} className="category-icon p-2" />
                                                    <Form.Check.Input className="position-absolute top-0 start-0" type="checkbox"
                                                        name={category}
                                                        checked={eventCategory.includes(category)} onChange={categorySelected} />
                                                </label>
                                            ))}
                                        </Form.Check>
                                    </div>
                                </div>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3 col-8">
                            <Form.Label>Event Photos</Form.Label>
                            <div className="border border-1 d-flex rounded-3 p-2 gap-2 overflow-scroll">
                                {eventPhotos.length > 0 && eventPhotos.map(link =>
                                    <div className="position-relative">
                                        <img src={"http://localhost:4000/uploads/photos/" + link} style={{ width: 200, height: 200 }} className="object-fit-cover rounded-3" />
                                        <Button onClick={ev => removePhoto(ev, link)} className="position-absolute top-0 start-0 py-1 px-2 text-white bg-primary"><FontAwesomeIcon icon={faTrash} /></Button>
                                    </div>

                                )}
                                {eventPhotos.length < 3 && (
                                    <label className="position-relative">
                                        <Form.Control type="file" className="position-absolute w-100 h-100" hidden onChange={uploadPhoto} />
                                        <div style={{ width: 200, height: 200 }} className="bg-info border border-1 d-flex justify-content-center align-items-center rounded-3">
                                            <FontAwesomeIcon icon={faCloudArrowUp} className="text-primary w-50 h-50" />
                                        </div>
                                    </label>
                                )}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3 col-4">
                            <Form.Label>Event Cover {!eventCover && (<span className="text-danger">Select your cover before create event</span>)}</Form.Label>
                            <div className="border border-1 d-flex rounded-3 p-2 justify-content-center">
                                <label className="position-relative">
                                    <Form.Control type="file" className="position-absolute w-100 h-100" hidden onChange={uploadCover} required />
                                    {eventCover ? (
                                        <img src={"http://localhost:4000/uploads/cover/" + eventCover} style={{ width: 200, height: 200 }} className="object-fit-cover rounded-3" />
                                    ) : (
                                        <div style={{ width: 200, height: 200 }} className="bg-info border border-1 d-flex justify-content-center align-items-center rounded-3">
                                            <FontAwesomeIcon icon={faCloudArrowUp} className="text-primary w-50 h-50" />
                                        </div>
                                    )}

                                </label>
                            </div>

                        </Form.Group>
                        <Form.Group className="mb-3 col-3">
                            <Form.Label>Event Sponsored</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Sponsored"
                                onChange={isSponsored}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3 col-3">
                            <Form.Label>Max of Participants:</Form.Label>
                            <Form.Control type="number"
                                value={eventParticipants}
                                onChange={ev => setEventParticipants(ev.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 col-4">

                            <div className="d-flex gap-4">
                                <div>
                                    <Form.Label>Event Start:</Form.Label>
                                    <Form.Control type="datetime-local"
                                        required
                                        value={eventStartTime}
                                        onChange={ev => setEventStartTime(ev.target.value)} />
                                </div>
                                <div>
                                    <Form.Label>Event End:</Form.Label>
                                    <Form.Control type="datetime-local"
                                        required
                                        value={eventEndTime}
                                        onChange={ev => setEventEndTime(ev.target.value)} />
                                </div>

                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3 col-2">
                            <div className='text-end my-3'>
                                <Button variant="primary" type="submit" className='py-1 px-5 text-white'>
                                    Create
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    )
}