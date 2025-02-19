import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Spin, Alert } from "antd";
import { useEvents } from "../backend/events";  // Assuming the useEvents hook is in the backend folder



function Events() {
    const { events, loading, error } = useEvents();  // Fetch events from the API
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, []);


    // loading spinner
    if (loading) return <Spin size="large" />;
    if (error) return <Alert message="Error loading events" type="error" />;

    // Checks if there are any events
    if (!events || events.length === 0) {
        return <Alert message="No events available" type="warning" />;
    }

    const handleViewDetails = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <div style={{ width: "100vw", padding: "20px", margin: "0 auto" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Upcoming Events</h1>

            {role === "admin" && (
                <Button
                    type="primary"
                    onClick={() => navigate("/create-event")}
                    style={{ marginBottom: "20px", display: "block", marginLeft: "auto", marginRight: "auto" }}
                >
                    Create Event
                </Button>
            )}

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "20px",
                maxWidth: "1400px",
                margin: "0 auto"
            }}>
                {events.map((event) => (
                    <Card
                        key={event._id}
                        title={event.name}
                        bordered={true}
                        cover={<img
                            alt={event.name}
                            src={event.image || "https://charityinyorkshire.wordpress.com/wp-content/uploads/2016/03/cb-1.jpg"}
                            style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover",
                                borderTopLeftRadius: "8px",
                                borderTopRightRadius: "8px"
                            }}
                        />}
                    >
                        <p><strong>Name:</strong> {event.title}</p>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Location:</strong> {event.location || "TBA"}</p>
                        <p>{event.description}</p>
                        <Button
                            onClick={() => {
                                console.log("Clicked Event ID:", event._id);  // Log the event ID when clicked
                                handleViewDetails(event._id);
                            }}
                            style={{ marginTop: "10px", width: "100%" }}
                        >
                            View Details
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Events;
