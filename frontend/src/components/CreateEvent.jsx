import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker, message } from "antd";

const CreateEvent = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (!token || role !== "admin") {
            message.error("Access Denied: Admins Only");
            navigate("/");  // Redirects anybody not an admin away from the page
        }
    }, [navigate, token, role]);

    if (!token || role !== "admin") {
        return null;  //
    }

    const handleCreateEvent = async (values) => {
        try {
            const response = await fetch("https://se-events-platform-be.onrender.com/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    skiddleId: Math.floor(100000 + Math.random() * 900000).toString(),
                    title: values.title,
                    date: values.date.format("YYYY-MM-DD"),
                    venue: values.venue,
                    description: values.description,
                    image: values.image,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create event.");
            }

            message.success("Event created successfully");
            navigate("/events");
        } catch (error) {
            message.error(`Error creating event: ${error.message}`);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
            <h2 style={{ textAlign: "center" }}>Create a New Event</h2>
            <Form layout="vertical" onFinish={handleCreateEvent}>
                <Form.Item label="Event Title" name="title" rules={[{ required: true, message: "Please enter event title" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Event Date" name="date" rules={[{ required: true, message: "Please select a date" }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item label="Venue" name="venue" rules={[{ required: true, message: "Please enter venue" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter event description" }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Image URL" name="image">
                    <Input placeholder="Enter an image URL (optional)" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Create Event
                    </Button>
                </Form.Item>
            </Form>
            <Button onClick={() => navigate("/events")} style={{ width: "100%", marginTop: "10px" }}>
                Cancel
            </Button>
        </div>
    );
};

export default CreateEvent;
