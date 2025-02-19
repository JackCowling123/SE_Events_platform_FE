# Events Platform

## Project Overview
This is a web-based platform that allows community members to view, sign up for, and manage events. Users can add events to their Google Calendar, and staff members have additional permissions to create and manage events.

## Features
- Browse a list of events
- Sign up for an event
- Add events to Google Calendar
- Staff member sign-in for event management

## Tech Stack
- **Frontend**: JavaScript / TypeScript, React / React Native
- **Build Tool**: Vite
- **Authentication**: User authentication implemented
- **Calendar Integration**: Google Calendar API

## Installation & Setup
### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn installed

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/JackCowling123/SE_Events_platform_BE
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

