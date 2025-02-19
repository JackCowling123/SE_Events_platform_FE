import { useState, useEffect } from "react";
import React from 'react';


const API_URL = "https://se-events-platform-be.onrender.com/api/auth";

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

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
    }, []); // ✅ Runs only when the component mounts

    const loginUser = async (credentials) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", credentials.email);

            setIsLoggedIn(true);
            setUserEmail(credentials.email);

            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const signupUser = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            return data;
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setUserEmail(null);
    };

    return { isLoggedIn, userEmail, loginUser, logout };
}
