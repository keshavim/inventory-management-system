
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => (
    <div>
        <h1>Home Page</h1>
        <p>Welcome to the Inventory Management System!</p>
        <nav>
            <Link to="/login">Admin Login</Link> | <Link to="/profile">Profile</Link>
        </nav>
    </div>
);

export default HomePage