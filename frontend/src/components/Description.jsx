import React, { useContext } from 'react';
import workoutDescription from '../images/workoutDescription.jpg';
import { AuthContext } from "../context/authContext";


const Description = () => {
  const { currentUser } = useContext(AuthContext)
  
    return (
      <div className="description">
          <div className="text">
            <h1>Welcome!</h1>
            <h3>
                Create personalized workout routines tailored to your goals while engaging with a vibrant community. Unlock the potential of customized fitness and connect with others on a shared path to wellness.
            </h3>
            {currentUser ? (
              <h2>View our users' routines below!</h2>
            ) : (
              <h2>Login or register to begin!</h2>
            )}
          </div>
          <div className="image">
            <img src={workoutDescription} alt="Workout Description" />
          </div>
        </div>
    );
  };

export default Description;