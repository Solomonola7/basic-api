import React, { useState } from 'react';

const Availability = () => {
  const [slots, setSlots] = useState('');

  const handleSave = () => {
    alert('Availability saved!');
  };

  return (
    <div>
      <h2>Availability</h2>
      <textarea
        placeholder="Enter your available time slots..."
        value={slots}
        onChange={(e) => setSlots(e.target.value)}
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Availability;