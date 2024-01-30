import React from 'react';
import workoutDescription from '../images/workoutDescription.jpg';

const Description = () => {
    return (
      <div className="description">
          <div className="text">
            <h1>Welcome!</h1>
            <p>
                Create personalized workout routines tailored to your goals while engaging with a vibrant community. Unlock the potential of customized fitness and connect with others on a shared path to wellness.
            </p>
            <h2>View our users' routines below!</h2>
          </div>
          <div className="image">
            <img src={workoutDescription} alt="Workout Description" />
          </div>
        </div>
    );
  };

export default Description;