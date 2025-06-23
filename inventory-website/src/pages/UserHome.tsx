import React from "react";
import { useAuth } from "../auth/AuthContext";
import {Link} from "react-router-dom";

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
            <Link
                to="/items"
                style={{
                    padding: "0.5em 1em",
                    background: "#ff9900",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    marginTop: "2em",
                    display: "inline-block"
                }}
            >
                View Products
            </Link>
        </div>
    );
};

export default UserHome;
