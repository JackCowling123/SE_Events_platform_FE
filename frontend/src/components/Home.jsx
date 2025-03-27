import React, { useEffect, useState } from "react";
import { Button, Card, Typography, Spin } from "antd";
import { Link } from "react-router-dom";
import { useEvents } from "../backend/events";

const { Title, Paragraph } = Typography;

function Home() {
    const { events, loading } = useEvents();
    const [upcoming, setUpcoming] = useState([]);

    useEffect(() => {
        if (events && events.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const futureEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                return eventDate >= today;
            });

            const sorted = futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

            setUpcoming(sorted.slice(0, 3));
        }
    }, [events]);

    return (
        <div style={{ textAlign: "center", marginTop: "3rem", padding: "0 2rem" }}>
            <Title>MCR Events</Title>

            <Paragraph style={{ fontSize: "18px", maxWidth: "700px", margin: "0 auto 2rem" }}>
                Discover, share and attend the best events happening across Manchester – from underground gigs to
                massive city festivals. MCR Events is your go-to platform to stay in the loop.
            </Paragraph>

            <Link to="/events">
                <Button
                    type="primary"
                    size="large"
                    style={{ backgroundColor: "#a30000", borderColor: "#a30000", marginBottom: "3rem" }}
                >
                    Browse Events
                </Button>
            </Link>

            <Title level={3}>Upcoming Highlights</Title>

            {loading ? (
                <Spin />
            ) : upcoming.length > 0 ? (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                    marginTop: "1rem"
                }}>
                    {upcoming.map((event) => (
                        <Card
                            key={event._id}
                            title={event.title}
                            bordered={false}
                            style={{ width: 300, textAlign: "left" }}
                        >
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p>{event.description}</p>
                        </Card>
                    ))}
                </div>
            ) : (
                <Paragraph>No upcoming events at the moment. Check back soon!</Paragraph>
            )}

            <Paragraph style={{ marginTop: "3rem", fontSize: "16px" }}>
                Want to host your own event or save your favourites?{" "}
                <Link to="/users">Login or register</Link> to get started!
            </Paragraph>
        </div>
    );
}

export default Home;