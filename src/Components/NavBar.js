
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';


function NavBar(){
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Clear access token
        history('/'); // Navigate back to front page
      };

    return (
        <header className={classes.header}>
            <div className={classes.logo}>PET Clinic</div>
            <nav>
            <ul>
                    <li>
                        <Link onClick={handleLogout}>Logout</Link>
                    </li>
                    <li>
                        <Link to='/visits'>Bookings</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default NavBar;