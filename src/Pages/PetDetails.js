import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom'; // Import useLocation hook

const PetDetails = () => {
  const { petId } = useParams(); // Get the pet ID from URL parameters
  const location = useLocation(); // Get the location object
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
      // Check if user is a doctor based on access token or userType from location state
      const userType = location.state ? location.state.userType : '';
      setIsDoctor(userType === 'doctor');
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };

  useEffect(() => {
    fetchPetDetails();
  }, [petId]);

  const parseDate = (dateString) => {
    // Assume dateString is in the format "YYYY-MM-DD"
    const [year, month, day] = dateString.split('-').map(Number);
    // Months are zero-based in JavaScript Date objects, so we subtract 1
    return new Date(year, month - 1, day);
  };

  const upcomingVisits = pet && pet.visits ? pet.visits.filter(visit => visit.date && parseDate(visit.date) > new Date()) : [];

  // Sort visits by date in ascending order
  upcomingVisits.sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

  const handleAddVisit = async () => {
    try {
        if (!newVisitDate || !newVisitComment) {
            console.error('Please provide both visit date and comment.');
            return;
        }
        
        const visitDate = parseDate(newVisitDate);
        const today = new Date();

        if (visitDate <= today) {
            console.error('Visit date must be in the future.');
            return;
        }

        // Check if there is already a visit scheduled for the chosen date
        const isVisitScheduled = pet.visits.some(visit => visit.date && parseDate(visit.date).toDateString() === visitDate.toDateString());

        if (isVisitScheduled) {
            console.error('A visit is already scheduled for the chosen date.');
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
      <p>Type: {pet.petType}</p>
      <p>Status: {pet.status}</p>
      <p>DoB: {pet.dob}</p>
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
