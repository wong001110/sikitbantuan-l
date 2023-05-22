import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../context/PublicContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

export default function ReviewCreate({ setRefresh }) {
    const [rating, setRating] = useState(0);
    const [check, setCheck] = useState(0.5);
    const [review, setReview] = useState('');
    const currPageId = useParams().id;
    const { user, ready } = useContext(UserContext);

    if (!ready) {
        return '';
    }
    async function createReview(ev) {
        if (user) {
            ev.preventDefault();
            const sponsorData = {
                user: user._id,
                event: currPageId,
                review, rating,
            }
            if (rating <= 0) {
                alert('Please rate the event before you leave the review');
            } else {
                await axios.post('/api/review', sponsorData).then(response => {
                    alert('Your review have been submitted');
                    setRating(0);
                    setCheck(0.5);
                    setReview('');
                    setRefresh(true);
                })
            }
        }
    }
    function addRate(ev) {
        ev.preventDefault();
        setRating(rating + 0.5)
        setCheck(rating + 0.5)
    }
    function decreaseRate(ev) {
        ev.preventDefault();
        setRating(rating - 0.5)
        setCheck(rating - 0.5)
    }
    return (
        <div>
            {user ?
                <Form className='row' onSubmit={createReview}>
                    <Form.Group className="mb-3 col-12">
                        <Form.Label>Your Wish</Form.Label>
                        <Form.Control as="textarea" rows="5" placeholder="Leave your wish here for our event!" maxLength="1000"
                            value={review}
                            onChange={ev => setReview(ev.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-3 d-flex align-items-center gap-3">
                        <Button className="bg-transparent text-primary" onClick={decreaseRate} disabled={rating <= 0}><FontAwesomeIcon icon={faCaretLeft} size="xl" /></Button>
                        <Button className="bg-transparent text-primary" onClick={addRate} disabled={rating >= 5}><FontAwesomeIcon icon={faCaretRight} size="xl" /></Button>
                    </Form.Group>
                    <Form.Group className="mb-3 col-3 d-flex align-items-center gap-3">
                        <div className="d-flex gap-2 justify-content-start">
                            {rating > 0 && [...Array(Math.ceil(rating))].map((e, i) => (
                                <FontAwesomeIcon key={i} icon={rating >= i + 1 ? faStar : rating >= check ? faStarHalfStroke : ''} size="xl" className=" text-warning" />
                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3 col-6">
                        <div className='text-end'>
                            <Button variant="primary" type="submit" className='py-1 px-5 text-white'>
                                Submit
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
                :
                <div className="d-flex justify-content-center align-items-center my-5">
                    <h6 style={{ color: "grey" }}>You have to login first before leave a review on this event!</h6>
                </div>

            }

        </div>
    )
}