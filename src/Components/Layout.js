import classes from './Layout.module.css';
import NavBar from './NavBar';
import { Route, Routes } from 'react-router-dom';
import Doctor from '../Pages/Doctor';
import Owner from '../Pages/Owner';
import Login from '../Pages/Login';
import Visits from  '../Pages/Visits';
import PetDetails from '../Pages/PetDetails';

function Layout(props){
    return ( 
    <div>
        <NavBar />
        <Routes className={classes.main}>
            <Route path="/" element={<Login />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/owner" element={<Owner />} />
            <Route path="/visits" element={<Visits />} />
            <Route path="/pet/:petId" element={<PetDetails />} />
        </Routes>
    </div>
    )
}
export default Layout;