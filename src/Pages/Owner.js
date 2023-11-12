import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Owner = () => {
  const [pets, setPets] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Fetch pets for the specific owner from the backend using the owner's token
    const accessToken = localStorage.getItem('accessToken');
    axios.get('/pets', { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((response) => setPets(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleViewDetails = (petId) => {
    // Navigate to the detailed info page for the selected pet
    history.push(`/owner/pet/${petId}`);
  };

  return (
    <div>
      <h2>Owner's Dashboard</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} - {pet.type} - Last Visit: {pet.lastVisit}{' '}
            <button onClick={() => handleViewDetails(pet.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Owner;