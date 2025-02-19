import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spin, Alert, message } from "antd";

function EventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [isGoing, setIsGoing] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [calendarLink, setCalendarLink] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(eventId, "this is my eventID");

        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Convert to boolean: true if token exists, false otherwise

        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`https://se-events-platform-be.onrender.com/api/events/${eventId}`);
                const data = await response.json();
                console.log("Fetched Event Data:", data);
                setEvent(data);
            } catch (err) {
                console.error("Failed to fetch event details:", err);
            }
        };

        const fetchCalendarLink = async () => {
            if (!token) return; // Only fetch if user is logged in

            try {
                const response = await fetch(`https://se-events-platform-be.onrender.com/api/event/${eventId}/calendar-link`);
                const data = await response.json();

                if (data.calendarLink) {
                    setCalendarLink(data.calendarLink);
                }
            } catch (error) {
            }
        };

        fetchEventDetails();
        fetchCalendarLink();
    }, [eventId]);

    const handleGoingClick = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            message.error("You are not logged in. Please log in to mark as going.");
            return;
        }

        const updatedGoingStatus = !isGoing;
        setIsGoing(updatedGoingStatus);

        try {
            const response = await fetch("https://se-events-platform-be.onrender.com/api/response", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    eventId: eventId,
                    response: updatedGoingStatus ? "going" : "not going",
                }),
            });

            const data = await response.json();
            console.log("✅ Backend Response:", data);

            if (!response.ok) throw new Error(data.message || "Failed to update response");

            message.success(updatedGoingStatus ? "Marked as going!" : "Marked as not going!");
        } catch (error) {
            console.error("❌ Error updating going status:", error);
            message.error("Failed to update response.");
        }
    };

    if (!event) {
        return <Spin size="large" />;
    }

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>

            {!isLoggedIn && (
                <Alert
                    message="You are not logged in. Please log in to mark yourself as going."
                    type="warning"
                    showIcon
                    style={{ marginBottom: "15px" }}
                />
            )}

            <img
                src={event.image || "https://charityinyorkshire.wordpress.com/wp-content/uploads/2016/03/cb-1.jpg"}
                alt={event.title}
                style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" }}
            />


            <h1 style={{ fontSize: "2em", fontWeight: "bold" }}>{event.title || "No Title Available"}</h1>

            <p><strong>Date:</strong> {event.date || "No Date Provided"}</p>
            <p><strong>Location:</strong> {event.venue || "No Venue Provided"}</p>
            <p><strong>Description:</strong> {event.description || "No Description Available"}</p>

            <Button
                onClick={handleGoingClick}
                type="primary"
                disabled={!isLoggedIn} // Disable button if user is not logged in
                style={{
                    backgroundColor: isGoing ? "green" : "",
                    color: isGoing ? "white" : "",
                    marginTop: "20px",
                }}
            >
                {isGoing ? "You're Going!" : "Mark as Going"}
            </Button>

            {calendarLink && (
                <Button
                    type="default"
                    onClick={() => window.open(calendarLink, "_blank")}
                    style={{ marginTop: "20px", marginLeft: "10px", backgroundColor: "#4285F4", color: "white" }}
                >
                    Add to Google Calendar
                </Button>
            )}

            <Button onClick={() => navigate("/events")} style={{ marginTop: "20px", marginLeft: "10px" }}>
                Back to Events
            </Button>
        </div>
    );
}

export default EventDetails;
