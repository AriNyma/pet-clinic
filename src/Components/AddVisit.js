import React, { useState } from 'react';

const AddVisit = ({ pet, onAddVisit }) => {
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddVisit({ petId: pet.id, date, comment });

    // Clear form fields
    setDate('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Visit</h2>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <button type="submit">Add Visit</button>
    </form>
  );
};

export default AddVisit;