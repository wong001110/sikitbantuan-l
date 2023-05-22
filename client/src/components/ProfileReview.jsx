import { useEffect, useState } from "react";
import axios from "axios";
import RateReviews from "./RateReviews";
import { format } from "date-fns";

export default function ProfileReview({ events }) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/review/').then(response => {
                const { data } = response;
                setReviews([])
                data.map(res => {
                    if (events.includes(res.event._id)) {
                        setReviews(reviews => [...reviews, res]);
                    }
                })
            });
        }
        fetchData();
    }, [events]);
    function totalRating() {
        if (reviews) {
            let total = 0;
            reviews.map((review) => {
                total += review.rating
            })
            return (total / reviews.length);
        }
    }
    return (
        <div className="bg-white rounded-3 p-3 h-100">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="my-3">Reviews from events participants ({reviews.length})</h5>
                <RateReviews rating={totalRating()} />
            </div>
            <div className="comment-list p-1">
                {(reviews && reviews.length > 0) && reviews.map((review, index) => (
                    <div key={index} className="d-flex flex-column justify-content-between w-100 mb-3 pb-3 border-bottom border-dark">
                        <div className="d-flex">
                            <div>
                                <img src="/defaulticon.jpg" className="comment-icon me-2" />
                            </div>
                            <div>
                                <h6>{review.user.user_name}</h6>
                                <p className="m-0 fs-comment">{review.review}</p>
                                <div className="d-flex justify-content-between w-100 mt-2">
                                    <p className="m-0 fs-remarks"><span className="text-primary">On Event</span> {review.event.eventTitle} | {format(new Date(review.review_time), 'd MMM yyyy')}</p>
                                    <RateReviews rating={review.rating} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}