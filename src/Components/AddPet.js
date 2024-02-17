import React, { useState } from 'react';

function AddPetForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new pet to the system (unless some error occurred)
  };

  return (
    <div>
      <h2>Add a New Pet</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Type:
          <input type="text" name="type" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="date" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}

export default AddPetForm;