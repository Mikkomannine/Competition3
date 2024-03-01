import React, { useState } from 'react';

const GoalForm = () => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGoal = { text, dueDate, priority };
    
    const response = await fetch('http://localhost:3001/api/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoal),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      setText('');
      setDueDate('');
      setPriority('');
      setError(null);
    }
  }
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Goal</h3>

      <label>Text:</label>
      <input type="text" className="" value={text} onChange={(e) => setText(e.target.value)} />
      <label>Due Date:</label>
      <input type="date" className="" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <label>Priority:</label>
      <input type="text" className="" value={priority} onChange={(e) => setPriority(e.target.value)} />
      <button>Add Goal</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default GoalForm;
  
 