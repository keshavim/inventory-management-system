import React from "react";
import { useAuth } from "../auth/AuthContext";

/**
 * UserHome.tsx
 *
 * Simple user home page that greets the logged-in user by name.
 */
const UserHome: React.FC = () => {
    const { currentUser } = useAuth();

    return (
        <div style={{ padding: "2em" }}>
    <h2>Welcome, {currentUser?.username}!</h2>
    <p>This is your user home page.</p>
    </div>
);
};

export default UserHome;
