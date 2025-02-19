import { useState } from "react";
import React from 'react';


const URL = "https://se-events-platform-be.onrender.com";

export function useUserResponses() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserResponseForEvent = async (eventId, token) => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/api/response/user/${eventId}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            });
            const data = await response.json();
            setLoading(false);
            return data; // This will contain the user's response (e.g., "going")
        } catch (err) {
            setError(err);
            setLoading(false);
            return null; // Error case
        }
    };

    // Update the user's response for an event (e.g., mark as "going")
    const setUserResponse = (eventId, userResponse, token) => {
        setLoading(true);
        return fetch(`${URL}/api/response`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                eventId,
                response: userResponse,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                return data; // Success response
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    };

    return { getUserResponseForEvent, setUserResponse, loading, error };
}


