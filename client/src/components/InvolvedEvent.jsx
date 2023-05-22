import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/PublicContext";


export default function InvolvedEvent({ setRefresh, maxParticipants, participantId }) {
    const currPageId = useParams().id;
    const { user, ready } = useContext(UserContext);

    if (!ready) {
        return '';
    }
    async function getInvolved(ev) {
        if (user) {
            ev.preventDefault();
            const involvedData = {
                participants: user._id,
                event: currPageId,
            }
            await axios.put('/api/participant', involvedData).then(response => {
                alert('Thank for Joining Us!');
                setRefresh(true);
            });
        }
    }
    function noticeUser(ev) {
        ev.preventDefault();
        alert('please login before involved with us!');
    }
    return (
        <Button onClick={user ? getInvolved : noticeUser} className="mb-3 text-white px-4" disabled={participantId.length >= maxParticipants || (user && participantId.includes(user._id))}>Involved</Button>
    )
}