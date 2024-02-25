import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Owner = () => {
    const [pets, setPets] = useState([]);
    const [visits, setVisits] = useState([]);
    const [detailsVisible, setDetailsVisible] = useState({}); // Track visibility of details for each pet
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [petType, setPetType] = useState('');
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

    const handleMoreDetails = (petId) => {
        const userType = 'owner'; // Set the userType as owner
        navigate(`/pet/${petId}`, { state: { userType } }); // Pass userType as state variable
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            
            // Fetch the current maximum pet ID
            const petResponse = await axios.get('http://localhost:4000/pets/maxId', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
    
            const maxPetId = petResponse.data.maxId;
            const newPetId = maxPetId + 1;
    
            // Add the new pet with the next available ID
            const addPetResponse = await axios.post('http://localhost:4000/pets', {
                id: newPetId,
                name,
                dob,
                petType
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
    
            // Redirect to the PetDetails page for the newly added pet
            navigate(`/pet/${newPetId}`);
        } catch (error) {
            console.error('Error adding pet:', error);
            // Handle error here
        }
    };

    return (
        <div>
            <h2>Owner's Dashboard</h2>
            
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
                            <button onClick={() => handleMoreDetails(pet.id)}>More Details</button> {/* Use handleMoreDetails function */}
                            {detailsVisible[pet.id] && (
                                <ul>
                                    <li>Species: {pet.petType}</li>
                                    <li>DoB: {pet.dob}</li>
                                    <li>Status: {pet.status}</li>
                                    <li>Last Visit: {lastVisitDate}</li>
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
            <h3>Add a New Pet</h3>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Pet Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                </label>
                <label>
                    Pet Type:
                    <input type="text" value={petType} onChange={(e) => setPetType(e.target.value)} required />
                </label>
                <button type="submit">Add Pet</button>
            </form>
        </div>
    );
};

export default Owner;
