import React, { useState } from 'react';
import { db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const [inputValue, setInputValue] = useState('');
    const [workoutType, setWorkoutType] = useState('pplOne'); // Default to pplOne

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            console.error("No user logged in");
            return;
        }

        const workoutRef = doc(db, "users", currentUser.uid, "workouts", workoutType);
        
        try {
            await setDoc(workoutRef, { userEmail: currentUser.email, [`${workoutType}SetOne`]: inputValue }, { merge: true });
            console.log(`${workoutType} data successfully written!`);
        } catch (error) {
            console.error(`Error writing ${workoutType} data: `, error);
        }
    };

    return (
        <>
            <div className='text-2xl font-bold pt-14'>Hello {currentUser?.displayName || currentUser?.email}, you are now logged in. Welcome to the Dashboard</div>
            <div>
                <label htmlFor="workoutType">Select Workout Plan:</label>
                <select id="workoutType" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                    <option value="pplOne">PPL One</option>
                    <option value="pplTwo">PPL Two</option>
                </select>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="exerciseInput">{workoutType} Exercise Set One:</label>
                <input
                    type="text"
                    id="exerciseInput"
                    placeholder={`Enter ${workoutType} exercise set one`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Dashboard;
