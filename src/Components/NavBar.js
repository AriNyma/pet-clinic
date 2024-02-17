import { useNavigate } from 'react-router-dom';
import classes from './NavBar.module.css';

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Clear access token
        navigate('/'); // Navigate back to front page
    };

    const handleBookings = () => {
        navigate('/visits'); // Navigate to the 'visits' page
    };

    return (
        <header className={classes.header}>
            <div className={classes.logo}>PET Clinic</div>
            <nav>
                <ul>
                    <li>
                        <button onClick={handleLogout}>Home/Logout</button>
                    </li>
                    <li>
                        <button onClick={handleBookings}>Bookings</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;

