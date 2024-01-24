
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';


function MainNavigation(){
    return (
        <header className={classes.header}>
            <div className={classes.logo}>PET Clinic</div>
            <nav>
            <ul>
                    <li>
                        <Link to='/'>Login page</Link>
                    </li>
                    <li>
                        <Link to='/'>Visits</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default MainNavigation;