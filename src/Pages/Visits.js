import React, { useEffect, useState } from 'react';

function Visits() {
  const [visitHistory, setVisitHistory] = useState([]);

  useEffect(() => {
    // Fetch visit history from an API or database
    const visitHistoryFromServer = fetchVisitHistoryFromServer();
    setVisitHistory(visitHistoryFromServer);
  }, []);

  return (
    <div>
      <h1>Visit History</h1>
      <ul>
        {visitHistory.map((visit) => (
          <li key={visit.id}>
            <strong>{visit.date}</strong> - {visit.location}
          </li>
        ))}
      </ul>
      <BookVisitForm />
    </div>
  );
}

function fetchVisitHistoryFromServer() {
  // Replace this with an actual API call to fetch visit history
  return [
    { id: 1, date: '01/01/2022', location: 'Location A' },
    { id: 2, date: '02/01/2022', location: 'Location B' },
    { id: 3, date: '03/01/2022', location: 'Location C' },
  ];
}

function BookVisitForm() {
  // Implement a form for booking a new visit
  return (
    <div>
      <h2>Book a New Visit</h2>
      <form>
        <label>
          Location:
          <input type="text" name="location" />
        </label>
        <button type="submit">Book Visit</button>
      </form>
    </div>
  );
}

export default Visits;