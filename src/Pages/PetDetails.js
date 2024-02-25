import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const PetDetails = () => {
  const { petId } = useParams();
  const location = useLocation();
  const [pet, setPet] = useState(null);
  const [newVisitDate, setNewVisitDate] = useState('');
  const [visits, setVisits] = useState([]);
  const [newVisitComment, setNewVisitComment] = useState('');
  const [doctorComment, setDoctorComment] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [petVisits, setPetVisits] = useState([]);
  const [owner, setOwner] = useState('');

  const fetchPetDetails = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');
  
      const petResponse = await axios.get(`http://localhost:4000/pets/${petId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
      console.log('Pet Response:', petResponse.data);
      const petData = petResponse.data;
      setPet(petData);
  
      const allVisitsResponse = await axios.get('http://localhost:4000/visits', { headers: { Authorization: `Bearer ${accessToken}` } });
      console.log('Visits Response:', allVisitsResponse.data);
      const allVisits = allVisitsResponse.data;
      setVisits(allVisits);
  
      const petVisits = allVisits.filter(visit => visit.petId.toString() === petId);
      setPetVisits(petVisits.sort((a, b) => new Date(b.date) - new Date(a.date)));
  
      const userType = location.state ? location.state.userType : '';
      setIsDoctor(userType === 'doctor' || userType === ''); // If userType is not available, assume the user is not a doctor
  
      // Fetch user information only if the user is a doctor
      if (userType === 'doctor') {
        const usersResponse = await axios.get(`http://localhost:4000/users`, { headers: { Authorization: `Bearer ${accessToken}` } });
        console.log('Users Response:', usersResponse.data);
        const usersData = usersResponse.data;
        const owner = usersData.find(user => user.id === petData.ownerId);
        console.log('Owner:', owner);
        setOwner(owner.name);
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pet details:', error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPetDetails();
  }, [petId, location.state]);

  const handleAddVisit = async () => {
    try {
      // Add visit handling logic
    } catch (error) {
      console.error('Error adding visit:', error.message);
    }
  };

  const handleDoctorCommentEdit = async () => {
    try {
      // Add doctor comment edit logic
    } catch (error) {
      console.error('Error editing doctor comment:', error);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      // Add status change logic
    } catch (error) {
      console.error('Error changing pet status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
      {isDoctor && (
      <p>Owner: {owner}</p>
      )}
      <h3>Visits</h3>
      <ul>
        {petVisits.map(visit => (
          <li key={visit.id}>
            <p>Date: {visit.date}</p>
            <p>Comment: {visit.comment}</p>
          </li>
        ))}
      </ul>
      {isDoctor && (
        <div>
          <h3>Doctor's Comment</h3>
          <textarea value={doctorComment} onChange={(e) => setDoctorComment(e.target.value)} /><br></br>
          <button onClick={handleDoctorCommentEdit}>Save Doctor's Comment</button>
        </div>
      )}
      <h3>Add New Visit</h3>
      <label>
        Date:<br></br>
        <input type="date" value={newVisitDate} onChange={(e) => setNewVisitDate(e.target.value)} />
      </label><br></br>
      <label>
        Comment:<br></br>
        <textarea value={newVisitComment} onChange={(e) => setNewVisitComment(e.target.value)} /><br></br>
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
