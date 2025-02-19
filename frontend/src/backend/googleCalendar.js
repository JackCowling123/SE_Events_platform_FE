import { useState } from "react"; // React for managing state

const URL = "https://se-events-platform-be.onrender.com";

// Function for Google Calendar integration
export function useCalendar() {
    const [loading, setLoading] = useState(false); // Tracks loading state
    const [error, setError] = useState(null); // Stores errors if API call fails

    // Function to retrieve Google Calendar event link
    const getCalendarLink = (eventId) => {
        setLoading(true); // Sets loading whilst promises are going down
        return fetch(`${URL}/event/${eventId}/calendar-link`) // Makes GET request to backend
            .then((response) => response.json()) // Parses JSON response
            .then((data) => {
                setLoading(false); // Since we've got a response, loading is false
                return data; // Return the result to the component that called it
            })
            .catch((err) => {
                setError(err); // Stores error if request fails
                setLoading(false); // Stops loading since request is complete
            });
    };

    // Return the function & state variables for use in other components
    return { getCalendarLink, loading, error };
}