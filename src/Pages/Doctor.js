import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Doctor = () => {
    const [pets, setPets] = useState([]);
    const [showAliveOnly, setShowAliveOnly] = useState(false); // Step 1
    const history = useNavigate();
  
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      axios.get('http://localhost:4000/pets', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => {
          const filteredPets = response.data.filter(pet => !showAliveOnly || pet.status === 'alive'); // Step 2
          setPets(filteredPets);
        })
        .catch((error) => console.error(error));
    }, [showAliveOnly]); // Step 4

    const handleViewDetails = (petId) => {
      history(`/pet`);
    };

    const handleCheckboxChange = () => {
      setShowAliveOnly(!showAliveOnly); // Step 3
    };
  
    return (
      <div>
        <h2>Doctor's Dashboard</h2>
        <label>
          Show Alive Only: 
          <input type="checkbox" checked={showAliveOnly} onChange={handleCheckboxChange} /> {/* Step 3 */}
        </label>
        <ul>
          {pets.map((pet) => (
            <li key={pet.id}>
              {pet.name} - {pet.petType} - {pet.dob} - {pet.status} {pet.lastVisit}{' '}
              <button onClick={() => handleViewDetails(pet.id)}>View Details</button>
            </li> 
          ))}
        </ul>
      </div>
    );
};

export default Doctor;
