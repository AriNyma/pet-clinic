import { useNavigate } from 'react-router-dom';
import classes from './NavBar.module.css';

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Clear access token
        navigate('/'); // Navigate back to front page
    };

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <header className={classes.header}>
            <div className={classes.logo}>PET Clinic</div>
            <nav>
                <ul>
                    <li>
                        <button onClick={handleGoBack}>Back</button>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Logout</button> 
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;

