import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PetDetails = () => {
  const { petId } = useParams(); // Get the pet ID from URL parameters
  const [pet, setPet] = useState(null);
  const [newVisitDate, setNewVisitDate] = useState('');
  const [newVisitComment, setNewVisitComment] = useState('');
  const [doctorComment, setDoctorComment] = useState('');

  const fetchPetDetails = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken'); // Obtain authentication token from local storage
      const response = await axios.get(`http://localhost:4000/pets/${petId}`, {
        headers: { Authorization: `Bearer ${accessToken}` } // Include token in request headers
      });
      setPet(response.data);
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };

  useEffect(() => {
    fetchPetDetails(); // Call fetchPetDetails when the component mounts or when petId changes
  }, [petId]);

  const handleAddVisit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken'); // Obtain authentication token from local storage
      await axios.post(`http://localhost:4000/visits`, {
        petId,
        date: newVisitDate,
        comment: newVisitComment,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` } // Include token in request headers
      });
      fetchPetDetails(); // Refresh pet details after adding a visit
    } catch (error) {
      console.error('Error adding visit:', error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const accessToken = localStorage.getItem('accessToken'); // Obtain authentication token from local storage
      await axios.put(`http://localhost:4000/pets/${petId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${accessToken}` } // Include token in request headers
      });
      fetchPetDetails(); // Refresh pet details after changing status
    } catch (error) {
      console.error('Error changing pet status:', error);
    }
  };

  const handleDoctorCommentEdit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken'); // Obtain authentication token from local storage
      await axios.put(`http://localhost:4000/pets/${petId}`, { doctorComment }, {
        headers: { Authorization: `Bearer ${accessToken}` } // Include token in request headers
      });
      fetchPetDetails(); // Refresh pet details after editing doctor's comment
    } catch (error) {
      console.error('Error editing doctor comment:', error);
    }
  };

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Pet Details</h2>
      <p>Name: {pet.name}</p>
      <p>Type: {pet.type}</p>
      <p>Status: {pet.status}</p>
      {/* Display owner information if applicable */}
      {pet.owner && (
        <div>
          <h3>Owner Details</h3>
          <p>Name: {pet.owner.name}</p>
          <p>Email: {pet.owner.email}</p>
          {/* Display more owner information as needed */}
        </div>
      )}
      <h3>Visits</h3>
      <ul>
        {pet.visits && pet.visits.map((visit) => (
          <li key={visit.id}>
            <p>Date: {visit.date}</p>
            <p>Comment: {visit.comment}</p>
          </li>
        ))}
      </ul>
      {/* Display doctor's only comment */}
      <h3>Doctor's Comment</h3>
      <textarea value={doctorComment} onChange={(e) => setDoctorComment(e.target.value)} />
      <button onClick={handleDoctorCommentEdit}>Save Doctor's Comment</button>
      {/* Form to add a new visit */}
      <h3>Add New Visit</h3>
      <label>
        Date:
        <input type="date" value={newVisitDate} onChange={(e) => setNewVisitDate(e.target.value)} />
      </label>
      <label>
        Comment:
        <textarea value={newVisitComment} onChange={(e) => setNewVisitComment(e.target.value)} />
      </label>
      <button onClick={handleAddVisit}>Add Visit</button>
      {/* Button to change pet status */}
      <h3>Change Status</h3>
      <button onClick={() => handleStatusChange('alive')}>Alive</button>
      <button onClick={() => handleStatusChange('deceased')}>Deceased</button>
      <button onClick={() => handleStatusChange('missing')}>Missing</button>
      <button onClick={() => handleStatusChange('other')}>Other</button>
    </div>
  );
};

export default PetDetails;
