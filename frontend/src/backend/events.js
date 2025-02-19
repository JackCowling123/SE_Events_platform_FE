import { useState, useEffect } from "react";
import React from 'react';

export function useEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("https://se-events-platform-be.onrender.com/api/events/local");
                const data = await response.json();

                if (response.ok) {
                    setEvents(data);
                } else {
                    setError("Failed to fetch events");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);


    return { events, loading, error };
}
