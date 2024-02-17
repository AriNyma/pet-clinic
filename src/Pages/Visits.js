import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddVisit from '../Components/AddVisit';

const api = axios.create({
    baseURL: 'http://localhost:4000', // Replace with your backend server URL
  });
  
const fetchVisitHistory = async () => {
    try {
      const response = await api.get('/visits');
      return response.data;
    } catch (error) {
      console.error('Error fetching visit history:', error);
      throw error;
    }
  };

function Visits() {
  const [visitHistory, setVisitHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVisitHistory();
        setVisitHistory(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Visit History</h1>
      <ul>
        {visitHistory.map((visit) => (
          <li key={visit.id}>
            <strong>{visit.date}</strong> - {visit.comment}
          </li>
        ))}
      </ul>
      
      <AddVisit />

    </div>
  );
}

export default Visits;