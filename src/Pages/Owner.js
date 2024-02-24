import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Owner = () => {
    const [pets, setPets] = useState([]);
    const [visits, setVisits] = useState([]);
    const [detailsVisible, setDetailsVisible] = useState({}); // Track visibility of details for each pet
    const [showAddPetForm, setShowAddPetForm] = useState(false);
    const [newPetName, setNewPetName] = useState('');
    const [newPetDob, setNewPetDob] = useState('');
    const [newPetType, setNewPetType] = useState('');
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get('http://localhost:4000/pets', {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
            setPets(response.data);
            
            const initialDetailsVisibility = {};
            response.data.forEach((pet) => {
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
    }, []);

    const handleViewDetails = (petId) => {
        setDetailsVisible(prevState => ({
            ...prevState,
            [petId]: !prevState[petId],
        }));
    };

    const handleAddPet = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post('http://localhost:4000/pets', {
                name: newPetName,
                dob: newPetDob,
                petType: newPetType,
            }, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setNewPetName('');
            setNewPetDob('');
            setNewPetType('');
            setShowAddPetForm(false);
            const newPetId = response.data.id;
            navigate(`/pet/${newPetId}`, { state: { userType: 'owner' } }); // Pass userType as state variable
        } catch (error) {
            console.error('Error adding pet:', error);
        }
    };

    return (
        <div>
            <h2>Owner's Dashboard</h2>
            <button onClick={() => setShowAddPetForm(true)}>Add New Pet</button>
            {showAddPetForm && (
                <form onSubmit={handleAddPet}>
                    <label>Name:</label>
                    <input type="text" value={newPetName} onChange={(e) => setNewPetName(e.target.value)} required />
                    <label>Date of Birth:</label>
                    <input type="date" value={newPetDob} onChange={(e) => setNewPetDob(e.target.value)} required />
                    <label>Type:</label>
                    <input type="text" value={newPetType} onChange={(e) => setNewPetType(e.target.value)} required />
                    <button type="submit">Add Pet</button>
                </form>
            )}
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
                                    <li>{pet.petType}</li>
                                    <li>{pet.dob}</li>
                                    <li>{pet.status}</li>
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

export default Owner;
