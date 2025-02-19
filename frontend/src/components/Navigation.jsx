import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";

const { Header } = Layout;

function Navigation({ isLoggedIn, userEmail, logout }) { // Receive props from App.jsx
    return (
        <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ flex: 1 }}>
                <Menu.Item key="1">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/events">Events</Link>
                </Menu.Item>
            </Menu>

            <div style={{ color: "white", marginRight: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
                {isLoggedIn ? (
                    <>
                        <span>Welcome, {userEmail}</span>
                        <Button type="primary" onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <Button type="default">
                        <Link to="/users">Login / Register</Link>
                    </Button>
                )}
            </div>
        </Header>
    );
}

export default Navigation;
