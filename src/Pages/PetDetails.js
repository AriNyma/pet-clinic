import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PetDetails = () => {
  const { petId } = useParams(); // Get the pet ID from URL parameters
  const [pet, setPet] = useState(null);
  const [newVisitDate, setNewVisitDate] = useState('');
  const [newVisitComment, setNewVisitComment] = useState('');
  const [doctorComment, setDoctorComment] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);

  const fetchPetDetails = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:4000/pets/${petId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setPet(response.data);
      //Check if this can be done another way
      setIsDoctor(accessToken === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTUxNjIzOTAyMn0.0_MKcjJoHX-Vsjb4vVlWZLZMY-45nMQ22MTXUCAQgng");
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };

  useEffect(() => {
    fetchPetDetails();
  }, [petId]);

  const upcomingVisits = pet && pet.visits ? pet.visits.filter(visit => new Date(visit.date) > new Date()) : [];

  const handleAddVisit = async () => {
    try {
      if (!newVisitDate || !newVisitComment) {
        console.error('Please provide both visit date and comment.');
        return;
      }
      const visitDate = new Date(newVisitDate);
      const today = new Date();
      if (visitDate <= today) {
        console.error('Visit date must be in the future.');
        return;
      }
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(`http://localhost:4000/visits`, {
        petId,
        date: newVisitDate,
        comment: newVisitComment,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      fetchPetDetails();
      setNewVisitDate('');
      setNewVisitComment('');
    } catch (error) {
      console.error('Error adding visit:', error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:4000/pets/${petId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      fetchPetDetails();
    } catch (error) {
      console.error('Error changing pet status:', error);
    }
  };

  const handleDoctorCommentEdit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:4000/pets/${petId}`, { doctorComment }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      fetchPetDetails();
    } catch (error) {
      console.error('Error editing doctor comment:', error);
    }
  };

  if (!pet) {
    return <div>Pet not found...</div>;
  }

  return (
    <div>
      <h2>Pet Details</h2>
      <p>Name: {pet.name}</p>
      <p>Type: {pet.type}</p>
      <p>Status: {pet.status}</p>
      <h3>Upcoming Visits</h3>
      <ul>
        {upcomingVisits.map((visit) => (
          <li key={visit.id}>
            <p>Date: {visit.date}</p>
            <p>Comment: {visit.comment}</p>
          </li>
        ))}
      </ul>
      {isDoctor && (
        <div>
          <h3>Doctor's Comment</h3>
          <textarea value={doctorComment} onChange={(e) => setDoctorComment(e.target.value)} />
          <button onClick={handleDoctorCommentEdit}>Save Doctor's Comment</button>
        </div>
      )}
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
      <h3>Change Status</h3>
      <button onClick={() => handleStatusChange('alive')}>Alive</button>
      <button onClick={() => handleStatusChange('deceased')}>Deceased</button>
      <button onClick={() => handleStatusChange('missing')}>Missing</button>
      <button onClick={() => handleStatusChange('other')}>Other</button>
    </div>
  );
};

export default PetDetails;