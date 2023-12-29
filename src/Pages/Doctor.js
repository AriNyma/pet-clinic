import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Doctor = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios.get('http://localhost:4000/pets', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => setPets(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Doctor's Dashboard</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} - {pet.type} - {pet.status} - Last Visit: {pet.lastVisit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctor;
