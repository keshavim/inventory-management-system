import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { useAuth } from "../auth/AuthContext";

/**
 * Login.tsx
 *
 * Logs in the user and redirects to /admin if ADMIN, or /user-home if USER.
 */
const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await login(username, password); // {id, username, role}
            setCurrentUser(user);
            if (user.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/profile");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2em auto" }}>
            <h2>Login</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
