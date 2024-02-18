import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Doctor = () => {
    const [pets, setPets] = useState([]);
    const [visits, setVisits] = useState([]);
    const [showAliveOnly, setShowAliveOnly] = useState(false);
    const [detailsVisible, setDetailsVisible] = useState({}); // Track visibility of details for each pet

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get('http://localhost:4000/pets', {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
            const filteredPets = response.data.filter(pet => !showAliveOnly || pet.status === 'alive');
            setPets(filteredPets);
            
            const initialDetailsVisibility = {};
            filteredPets.forEach((pet) => {
                initialDetailsVisibility[pet.id] = false;
            });
            setDetailsVisible(initialDetailsVisibility);
        })
        .catch((error) => console.error(error));

        axios.get('http://localhost:4000/visits', {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
            setVisits(response.data);
        })
        .catch((error) => console.error(error));
    }, [showAliveOnly]);

    const handleViewDetails = (petId) => {
        setDetailsVisible(prevState => ({
            ...prevState,
            [petId]: !prevState[petId],
        }));
    };

    const handleCheckboxChange = () => {
        setShowAliveOnly(!showAliveOnly);
    };

    return (
        <div>
            <h2>Doctor's Dashboard</h2>
            <label>
                Show Alive Only:
                <input type="checkbox" checked={showAliveOnly} onChange={handleCheckboxChange} />
            </label>
            <ul>
                {pets.map((pet) => {
                    const petVisits = visits.filter(visit => visit.petId === pet.id);
                    const lastVisitDate = petVisits.length > 0 ? petVisits[petVisits.length - 1].date : 'No visits';
                    return (
                        <li key={pet.id}>
                            <strong>{pet.name}</strong>
                            <button onClick={() => handleViewDetails(pet.id)}>
                                {detailsVisible[pet.id] ? 'Hide Details' : 'View Details'}
                            </button>
                            <Link to={`/pet/${pet.id}`}><button>More Details</button></Link>
                            {detailsVisible[pet.id] && (
                                <ul>
                                    <li>Speies: {pet.petType}</li>
                                    <li>DoB: {pet.dob}</li>
                                    <li>Status: {pet.status}</li>
                                    <li>Last Visit: {lastVisitDate}</li>
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Doctor;
