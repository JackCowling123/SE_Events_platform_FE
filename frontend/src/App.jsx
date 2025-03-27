import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Events from "./components/Events";
import Users from "./components/Users";
import EventDetails from "./components/EventDetails";
import CreateEvent from "./components/CreateEvent";


const { Content, Footer } = Layout;

const API_URL = "https://se-events-platform-be.onrender.com/api/auth";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("userEmail");

        if (token) {
            setIsLoggedIn(true);
            setUserEmail(email);
        }
    }, []); // RUNS when app loads

    const loginUser = async (credentials) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid email or password.");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", credentials.email);

            setIsLoggedIn(true);
            setUserEmail(credentials.email);
        } catch (error) {
            console.error("Login error:", error.message);
            throw error; //
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setUserEmail(null);
    };

    return (
        <Router>
            <Layout>
                <Navigation isLoggedIn={isLoggedIn} userEmail={userEmail} logout={logout} />

                <Content
                    style={{
                        width: "100%",
                        maxWidth: "1000px",
                        margin: "0 auto",
                        padding: "20px 10px",
                        minHeight: "80vh",
                        boxSizing: "border-box",
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/events/:eventId" element={<EventDetails />} />
                        <Route path="/users" element={<Users loginUser={loginUser} setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />} />
                        <Route path="/create-event" element={<CreateEvent />} />
                    </Routes>

                </Content>

                <Footer style={{ textAlign: "center" }}>© 2025 MCR Events</Footer>
            </Layout>
        </Router>
    );
}

export default App;
