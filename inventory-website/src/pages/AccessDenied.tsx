import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * AccessDenied.tsx
 *
 * Shows an access denied message and a link back to the user's home page.
 */
const AccessDenied: React.FC = () => {
    const { currentUser } = useAuth();

    return (
        <div style={{ padding: "2em", color: "red" }}>
            <h2>Access Denied</h2>
            <p>You do not have permission to view this page.</p>
            {currentUser && (
                <Link
                    to="/profile"
                    style={{
                        padding: "0.5em 1em",
                        background: "#1976d2",
                        color: "#fff",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        marginTop: "1em",
                        display: "inline-block"
                    }}
                >
                    Go to your profile
                </Link>
            )}
        </div>
    );
};

export default AccessDenied;
