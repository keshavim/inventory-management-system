# Inventory Management System

A full-stack web application for managing products and user inventories, built with **React** (frontend) and **Spring Boot** (backend).

## Features

- User registration and login (with session-based authentication)
- Browse all products
- Add/remove products to/from your personal inventory
- View your inventory
- Admin and user roles (with role-based access control)

## How It Works

- **Frontend:** React app (`/inventory-website`) interacts with the backend using RESTful APIs. Authenticated requests use cookies for session management.
- **Backend:** Spring Boot app (`/inventory-management-system`) exposes API endpoints for authentication, products, and user inventory. User credentials are securely stored and verified.
- **Authentication:** After logging in, a session cookie is set. All protected API requests require this cookie (handled automatically if you use `{ withCredentials: true }` in Axios).

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- Maven

### Backend Setup
cd backend
mvn spring-boot:run
(if this does not work, then run with an ide, i used intelij)

The backend will start on [http://localhost:8080](http://localhost:8080).

### Frontend Setup

cd frontend
npm install
npm start

The frontend will start on [http://localhost:5174](http://localhost:5174).

## Usage

1. Register a new user or log in with the test credentials (see below).
2. Browse products, add them to your inventory, and view your personal inventory.

### Test User

- **Username:** `testuser`
- **Password:** `testpassword`
