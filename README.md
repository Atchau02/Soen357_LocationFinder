# Productivity Workspace Finder App

This React-based application helps users find and review productive workspaces such as cafes, coworking spaces, and libraries. Users can view details about a location, explore reviews, and filter locations based on specific criteria like WiFi strength, noise levels, and amenities. The backend integrates basic review handling and location management.

---

## Features

### Frontend
- **Location Details**: View detailed information about a workspace, including pictures, reviews, and amenities.
- **Search Bar**: Quickly search for workspaces by name or address.
- **Filters**: Filter locations based on user-defined criteria like noise levels, WiFi ratings, and crowd size.
- **Add Reviews**: Submit reviews for a location, including WiFi rating, noise, and crowd size.
- **Gallery**: Browse images and reviews associated with a location.
- **Dynamic Maps**: View location maps using Google Maps API integration.

### Backend
- **Review Management**: Add new reviews, calculate average ratings, and update location data dynamically.
- **Data Storage**: Locations and reviews are stored in JSON format for simplicity and quick access.

---

## Technologies Used

### Frontend
- **React**: Component-based UI design.
- **Tailwind CSS**: For responsive and modern UI styling.
- **Google Maps API**: Interactive maps for location display.

### Backend
- **Node.js**: JavaScript runtime for backend logic.
- **Express**: Lightweight server framework.
- **File System (fs)**: For handling JSON file-based data storage.

---

## File Structure

### Frontend Components
- `AddReviewForm.jsx`: Handles the UI for adding new reviews.
- `Filters.jsx`: Allows users to filter workspace listings.
- `LocationDetails.jsx`: Displays detailed information about a workspace, including a map view.
- `LocationGallery.jsx`: Renders an image gallery for locations.
- `Navbar.jsx`: Provides navigation across the app.
- `ReviewsGallery.jsx`: Shows user-submitted reviews for a location.
- `SearchBar.jsx`: Enables search functionality.
- `LocationPage.jsx`: Renders a page for viewing all details about a specific location.
- `MainPage.jsx`: Entry point for the app, listing all available workspaces.

### Backend
- `reviews.js`: Handles API routes for adding reviews and updating location data.
- `location.js`: Handles API routes for getting specific location data.

---

## How to Run the App

### Prerequisites
1. **Node.js** and **npm/yarn** installed.
2. **Google Maps API Key** with access to the Maps JavaScript API.

### Steps
1. Clone the repository:
   git clone <repository_url>
   cd <repository_directory>

2. Install dependencies:
   cd frontend
   npm install

   cd backend
   npm install

3. Set up environment variables:
   create .env file in the project root:
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

4. Start server
   cd backend
   node app.js

5. start frontend
   cd frontend
   npm run dev
