import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/PublicContext";


export default function SponsorCreate({ setRefresh }) {
    const [sponsorAmount, setSponsorAmount] = useState(0);
    const [wish, setWish] = useState('');
    const [show, setShow] = useState(false);
    const currPageId = useParams().id;
    const { user, ready } = useContext(UserContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!ready) {
        return '';
    }
    async function createSponsor(ev) {
        if (user) {
            ev.preventDefault();
            const sponsorData = {
                user: user._id,
                event: currPageId,
                wish, sponsorAmount,
            }
            await axios.post('/api/sponsor', sponsorData).then(response => {
                alert('Thank for your sponsor!');
                setRefresh(true);
                setShow(false);
            });
        }
    }
    function noticeUser(ev) {
        ev.preventDefault();
        alert('please login before sponsor us!');
    }
    return (
        <div>
            <Button onClick={user ? handleShow : noticeUser} className="mb-3 text-white px-4">Sponsor</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sponsor Us Now!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='row px-5' onSubmit={createSponsor}>
                        <Form.Group className="mb-3 col-12">
                            <Form.Label>Sponsor Amount</Form.Label>
                            <Form.Control type="number" placeholder="type in your event title"
                                value={sponsorAmount}
                                onChange={ev => setSponsorAmount(ev.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 col-12">
                            <Form.Label>Your Wish</Form.Label>
                            <Form.Control type="text" placeholder="Leave your wish here for our event!" maxlength="100"
                                value={wish}
                                onChange={ev => setWish(ev.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 col-12">
                            <div className='text-end my-3'>
                                <Button variant="primary" type="submit" className='py-1 px-5 text-white'>
                                    Sponsor
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}