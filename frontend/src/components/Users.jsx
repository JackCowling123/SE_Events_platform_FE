import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Button, Alert, Checkbox } from "antd";

const { TabPane } = Tabs;
const API_URL = "https://se-events-platform-be.onrender.com/api/auth";

const Users = ({ loginUser, setIsLoggedIn, setUserEmail }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [activeTab, setActiveTab] = useState("login");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("userEmail");

        if (token) {
            setIsLoggedIn(true);
            setUserEmail(email);
        } else {
            setIsLoggedIn(false);
            setUserEmail(null);
        }
    }, []);

    const handleLogin = async (credentials) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Login failed");

            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", credentials.email);
            setIsLoggedIn(true);
            setUserEmail(credentials.email);
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (userData) => {
        console.log("🔍 Role Being Sent:", userData.isAdmin ? "admin" : "user");
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    role: userData.isAdmin ? "admin" : "user",
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                if (data.message && data.message.toLowerCase().includes("email already taken")) {
                    throw new Error("Email already taken");
                }
                throw new Error(data.message || "Signup failed");
            }

            setSuccess("Signup successful! Logging in...");

            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", userData.email);
            localStorage.setItem("role", data.role);

            setIsLoggedIn(true);
            setUserEmail(userData.email);

            setActiveTab("login");
        } catch (err) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };



    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setUserEmail(null);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
            <div style={{ width: "340px", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
                <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
                    <TabPane tab="Login" key="login">
                        <h2 style={{ textAlign: "center" }}>Login</h2>
                        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "15px" }} />}
                        <Form layout="vertical" onFinish={handleLogin}>
                            <Form.Item name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Login
                            </Button>
                        </Form>
                    </TabPane>
                    <TabPane tab="Register" key="register">
                        <h2 style={{ textAlign: "center" }}>Register</h2>
                        {success && <Alert message={success} type="success" showIcon style={{ marginBottom: "15px" }} />}
                        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "15px" }} />}

                        <Form layout="vertical" onFinish={handleSignup}>
                            <Form.Item name="name" rules={[{ required: true, message: "Please enter your name!" }]}>
                                <Input placeholder="Full Name" />
                            </Form.Item>
                            <Form.Item name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                dependencies={["password"]}
                                rules={[
                                    { required: true, message: "Please confirm your password!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            return value && value === getFieldValue("password")
                                                ? Promise.resolve()
                                                : Promise.reject(new Error("Passwords do not match!"));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Confirm Password" />
                            </Form.Item>

                            {/* 🟢 Checkbox for Admin Signup */}
                            <Form.Item name="isAdmin" valuePropName="checked">
                                <Checkbox>Sign up as Admin</Checkbox>
                            </Form.Item>

                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Register
                            </Button>
                        </Form>
                    </TabPane>

                </Tabs>
            </div>
        </div>
    );
};

export default Users;
