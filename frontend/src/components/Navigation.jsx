import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

function Navigation({ isLoggedIn, userEmail, logout }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Header
                style={{
                    backgroundColor: "#a4161a",
                    padding: "0 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "nowrap", // prevent wrapping on desktop
                    height: "auto",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Link to="/">
                        <img
                            src={`${import.meta.env.BASE_URL}logo.png`}
                            alt="MCR Events Logo"
                            style={{
                                height: "64px",
                                objectFit: "contain",
                                filter: "brightness(0) invert(1)",
                            }}
                        />
                    </Link>
                </div>

                <div className="desktop-nav" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}>
                    <Link to="/" style={{ color: "#fff", fontWeight: "bold" }}>Home</Link>
                    <Link to="/events" style={{ color: "#fff", fontWeight: "bold" }}>Events</Link>

                    {isLoggedIn ? (
                        <>
                            <span style={{ color: "#fff" }}>Hi, {userEmail}</span>
                            <Button onClick={logout} style={{ color: "#fff", borderColor: "#fff" }}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button>
                            <Link to="/users">Login / Register</Link>
                        </Button>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className="mobile-nav">
                    <Button
                        icon={<MenuOutlined />}
                        type="text"
                        onClick={() => setDrawerOpen(true)}
                        style={{ color: "#fff", fontSize: "20px" }}
                    />
                </div>
            </Header>

            <Drawer
                title="MCR Events"
                placement="right"
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
            >
                <p><Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link></p>
                <p><Link to="/events" onClick={() => setDrawerOpen(false)}>Events</Link></p>
                {isLoggedIn ? (
                    <>
                        <p>Hi, {userEmail}</p>
                        <Button
                            onClick={() => {
                                logout();
                                setDrawerOpen(false);
                            }}
                            type="primary"
                            danger
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button type="primary" onClick={() => setDrawerOpen(false)}>
                        <Link to="/users">Login / Register</Link>
                    </Button>
                )}
            </Drawer>

            {/* Responsive Toggle */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
        </>
    );
}

export default Navigation;
