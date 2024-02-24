import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Owner = () => {
  const [pets, setPets] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios.get('http://localhost:4000/pets', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => setPets(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleViewDetails = (petId) => {
    history(`/pet`);
  };

  return (
    <div>
      <h2>Owner's Dashboard</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} - {pet.type}
            <button onClick={() => handleViewDetails(pet.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Owner;