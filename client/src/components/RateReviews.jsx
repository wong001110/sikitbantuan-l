import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

export default function RateReviews({ rating }) {
    const [check, setCheck] = useState(0.5);
    if (!rating) {
        return '';
    }
    return (
        <div>
            {(rating && rating > 0) && [...Array(Math.ceil(rating))].map((e, i) => (
                <FontAwesomeIcon key={i} icon={rating >= i + 1 ? faStar : rating >= check ? faStarHalfStroke : ''} size="xl" className=" text-warning" />
            ))}
        </div>
    )
}