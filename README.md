# Room Listing Platform

## Overview
The Room Listing Platform is a dynamic and responsive web application designed to help users list, browse, and manage rental properties. Built with modern web technologies, this platform allows users to create and manage accounts, submit property listings, and search/filter through available rooms or places for rent. The application utilizes **Node.js**, **Express.js**, **MongoDB**, **Bootstrap**, **HTML**, **CSS**, and **JavaScript** to provide a seamless and user-friendly experience.

## Key Features
- **User Registration & Authentication**: Users can securely register, log in, and manage their rental listings using session-based authentication.
- **Room Listings**: Users can create and display detailed rental listings with information like price, location, description, and amenities.
- **MVC Architecture**: The application follows the **Model-View-Controller (MVC)** pattern to structure the app efficiently, ensuring maintainable and scalable code.
- **MongoDB Integration**: **MongoDB** is used for backend data management to store user accounts, property listings, and other related data.
- **Responsive Design**: Built with **Bootstrap**, the platform ensures a mobile-first and fully responsive design to adapt to various screen sizes and devices.
- **Form Validation**: Both client-side and server-side validation are used to ensure data integrity and improve the user experience.
- **Search and Filter**: Users can search and filter listings based on criteria like price range, location, and amenities.
- **Admin Dashboard**: Admin users can manage and moderate the listings, including approving or rejecting properties submitted by users.
- **Real-Time Data Updates**: Changes to listings and user data are reflected in real-time for an interactive experience.

## Technologies Used
- **Frontend**:
  - **HTML**: Structuring web pages
  - **CSS**: Styling the user interface
  - **JavaScript**: Enhancing interactivity
  - **Bootstrap**: Ensuring responsive, mobile-first design
- **Backend**:
  - **Node.js**: Runtime environment for building the backend server
  - **Express.js**: Web framework for routing and server-side logic
- **Database**:
  - **MongoDB**: NoSQL database for storing user and listing data
- **Authentication**:
  - **Session-based authentication** for secure user login and data access
- **Architecture**:
  - **Model-View-Controller (MVC)** pattern for code organization

## Features for Users

### Manage Listings
- Users can view, add, edit, and delete rental listings. Listings display detailed information, including price, location, description, and amenities.
- Listings are dynamically rendered based on the current data stored in the **MongoDB** database.

### Search & Filter
- The search functionality allows users to filter listings based on various criteria such as price, location, and amenities. This helps users quickly find listings that meet their needs.

## Features for Admins

### Admin Dashboard
- The admin panel allows for managing user-submitted listings. Admins can approve or reject listings based on specific criteria, ensuring quality control.

## Data Persistence

### Local Storage Integration
The application ensures data persistence between sessions by storing user-generated content and interactions in **MongoDB**, making it reliable even after reloading or restarting the application.
