import { useEffect, useState } from "react";

export default function EventTime({ events, currPage }) {
    let [duration, setDuration] = useState(0.5);
    useEffect(() => {
        if (!events) {
            return '';
        }
        setDuration(duration = 0);
        if (events) {
            setDuration(duration = 0);
            events.map(event => {
                const eventStart = new Date(event.eventStartTime).getTime();
                const eventEnd = new Date(event.eventEndTime).getTime();
                const eventDuration = eventEnd - eventStart;
                let seconds = (eventDuration / 1000);
                let minutes = (seconds / 60);
                let hours = (minutes / 60);
                let newtime = parseFloat(hours.toFixed(2));
                setDuration(duration += newtime);
            })
        }
    }, [events]);
    return duration;
}