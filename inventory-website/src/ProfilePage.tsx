import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get username from navigation state (fallback to 'admin')
    const username = (location.state as { username?: string })?.username || 'admin';

    React.useEffect(() => {
        if (!username) {
            navigate('/login');
        }
    }, [username, navigate]);

    return (
        <div>
            <h2>Welcome, {username}!</h2>
            <p>This is your admin profile page.</p>
        </div>
    );
};

export default ProfilePage;
