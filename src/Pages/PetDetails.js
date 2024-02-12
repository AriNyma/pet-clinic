import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PetDetails = () => {
  const { petId } = useParams();
  const [petDetails, setPetDetails] = useState(null);
  const [newVisitDate, setNewVisitDate] = useState('');
  const [newVisitComment, setNewVisitComment] = useState('');

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:4000/pets/${petId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setPetDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPetDetails();
  }, [petId]);

  const handleAddVisit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(`http://localhost:4000/pets/${petId}/visits`, {
        date: newVisitDate,
        comment: newVisitComment,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // After successfully adding the visit, refresh the pet details to show the updated list of visits
      setNewVisitDate('');
      setNewVisitComment('');
      fetchPetDetails();
    } catch (error) {
      console.error(error);
    }
  };

  if (!petDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Pet Details</h2>
      <h3>Pet Information</h3>
      <p>Name: {petDetails.name}</p>
      <p>Type: {petDetails.petType}</p>
      <p>Date of Birth: {petDetails.dob}</p>
      <h3>Owner Information</h3>
      <p>Name: {petDetails.owner.name}</p>
      <p>Email: {petDetails.owner.email}</p>
      <h3>Visits</h3>
      <ul>
        {petDetails.visits.map((visit) => (
          <li key={visit.id}>
            Date: {visit.date} - Comment: {visit.comment}
          </li>
        ))}
      </ul>
      <h3>Add New Visit</h3>
      <label>Date:</label>
      <input type="date" value={newVisitDate} onChange={(e) => setNewVisitDate(e.target.value)} />
      <br />
      <label>Comment:</label>
      <input type="text" value={newVisitComment} onChange={(e) => setNewVisitComment(e.target.value)} />
      <br />
      <button onClick={handleAddVisit}>Add Visit</button>
      {/*
        Here you can add a section for "doctor's only" comment input if needed
      */}
    </div>
  );
};

export default PetDetails;
