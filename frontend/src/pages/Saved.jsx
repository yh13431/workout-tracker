import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SavedRoutinesPage = () => {
  const [savedRoutines, setSavedRoutines] = useState([]);

  const fetchSavedRoutines = async () => {
    try {
      const response = await axios.get('/saved/');
      setSavedRoutines(response.data);
    } catch (error) {
      console.error('Error fetching saved routines:', error);
    }
  };

  useEffect(() => {
    fetchSavedRoutines();
  }, []);

  const handleUnsave = async (routineId) => {
    try {
      await axios.delete(`/saved/${routineId}`);
      fetchSavedRoutines();
    } catch (error) {
      console.error('Error unsaving routine:', error);
    }
  };

  return (
    <div className="saved">
      <h1>My Routines</h1>
      <table className="routine-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Unsave</th>
          </tr>
        </thead>
        <tbody>
          {savedRoutines.map((routine) => (
            <tr key={routine.id}>
              <td>
                <Link to={`/routine/${routine.rid}`}>{routine.title}</Link>
              </td>
              <td>
                <button onClick={() => handleUnsave(routine.rid)}>Unsave</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SavedRoutinesPage;