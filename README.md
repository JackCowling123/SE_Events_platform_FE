# Events Platform

## Project Overview
The Events Platform is a web-based application designed to help communities easily organize, manage, and participate in events. Originally envisioned as a Manchester-specific application, it was created to foster a community-driven approach in an ever-expanding city. This platform allows users to browse upcoming events, sign up for them, and integrate them with Google Calendar. Additionally, staff members have special privileges to create and manage events, ensuring smooth event coordination.

The **backend** of the platform was built using **Express.js** and is hosted on **Render** at [SE Events Backend](https://se-events-platform-be.onrender.com/). This ensures a reliable API for handling authentication, event management, and user interactions.

The **frontend** was developed using **React**, allowing for dynamic rendering and efficient re-renders without requiring users to refresh or close the browser. This enhances the user experience by providing smooth, real-time updates to the event listings and user interactions.

## Live Demo
You can access the hosted application here:
👉 **[Live Demo](https://jackcowling123.github.io/SE_Events_platform_FE/)**
---

### 👤 Test Admin Login

To test admin functionality (e.g., adding events), use the following credentials:

- **Email:** `BigAdmin@gmail.com`  
- **Password:** `BigAdmin123`

Once logged in, you'll see the **"Create Event"** button appear on the Events page.

---

## Features
- Browse a list of events
- Sign up for an event
- Add events to Google Calendar
- Staff member sign-in for event management
- Secure user authentication

## Tech Stack
- **Frontend**: JavaScript, React / React Native
- **Build Tool**: Vite
- **Authentication**: User authentication implemented
- **Calendar Integration**: Google Calendar API
- **Backend**: Express.js, hosted on Render

## Installation & Setup
### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn installed

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/JackCowling123/SE_Events_platform_FE
   cd SE_Events_platform_FE/frontend
   ```
2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```
3. **Run the development server**
   ```sh
   npm run dev  # or yarn dev
   ```
   This will start the server, and you can access the application at `http://localhost:5173` (default Vite port).

## Usage
1. Open the application in your browser.
2. Register as a user by clicking on the top right-hand corner and selecting "Register." Fill in the required details.
3. Registering as an admin is optional. Only admins can add events.
4. Sign in with your credentials.
5. To sign up for an event, go to the Events page and click "More details" on the event you are interested in.
6. You can mark yourself as "Going" and add the event to your Google Calendar with one click.
7. You **must be logged in** to sign up for an event.
8. To add an event, ensure you are registered and signed in as an admin. Navigate to the Events page and add an event with the required details. This will be added to the database and displayed on the Events page.

For further details, refer to the project documentation.

