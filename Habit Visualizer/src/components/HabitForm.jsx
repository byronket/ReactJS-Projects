/* Habit form used for user input*/

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import Authentication from "./Authentication";

export default function HabitForm({ isAuthenticated }) {
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [newHabit, setNewHabit] = useState("");
    const [habits, setHabits] = useState([]);
    const { globalUser, globalData, setGlobalData } = useAuth();
    const [errorMessage, setErrorMessage] = useState(""); // Add state for error message
    const [showModal, setShowModal] = useState(false);


    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Fetch habits from Firebase when the component loads
    useEffect(() => {
        if (globalUser) {
            const fetchHabits = async () => {
                const userRef = doc(db, "users", globalUser.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists() && userDoc.data().habits) {
                    setHabits(userDoc.data().habits);
                } else {
                    setHabits([]);
                }
            };

            fetchHabits();
        }
    }, [globalUser]);

    // Add a new habit
    const handleAddHabit = async () => {
        if (!isAuthenticated) {
            setShowModal(true); // Trigger signup modal
            return;
        }
    
        if (!newHabit.trim()) return;
    
        try {
            const updatedHabits = [...habits, { name: newHabit }];
            setHabits(updatedHabits);
    
            if (globalUser) {
                const userRef = doc(db, "users", globalUser.uid);
                await setDoc(userRef, { habits: updatedHabits }, { merge: true });
            }
    
            setNewHabit("");
        } catch (err) {
            console.error("Error adding habit:", err.message);
        }
    };

    // Delete a habit
    const handleDeleteHabit = async (habitName) => {
        if (!habitName) return;
    
        try {
            const updatedHabits = habits.filter((habit) => habit.name !== habitName);
            setHabits(updatedHabits);
    
            if (globalUser) {
                const userRef = doc(db, "users", globalUser.uid);
                await updateDoc(userRef, { habits: updatedHabits });
            }
    
            setSelectedHabit(null); // Clear the selected habit after deletion
        } catch (err) {
            console.error("Error deleting habit:", err.message);
        }
    };
    

    // Submit a habit (log as completed)
    const handleSubmitHabit = async () => {
        if (!isAuthenticated) {
            setShowModal(true); // Trigger signup modal
            return;
        }
    
        if (!selectedHabit) {
            setErrorMessage("No habit selected. Please select a habit to submit.");
            setTimeout(() => setErrorMessage(""), 3000);
            console.warn("No habit selected to submit.");
            return;
        }
    
        try {
            const timestamp = Date.now();
            const completedHabit = { name: selectedHabit, timestamp };
    
            if (globalUser) {
                const userRef = doc(db, "users", globalUser.uid);
                
                // Update Firestore
                await updateDoc(userRef, {
                    [`completedHabits.${timestamp}`]: completedHabit,
                });
    
                // Immediately update globalData in local state
                setGlobalData((prevData) => ({
                    ...prevData,
                    [timestamp]: completedHabit,
                }));
            }
    
            setSelectedHabit(null); // Clear the selected habit
        } catch (error) {
            console.error("Error submitting habit:", error.message);
        }
    };
    
    

    return (
        <div>
            <div className="section-header">
                <i className="fa-solid fa-pencil" />
                <h2>Track Your Habits</h2>
            </div>

            <h4>Your Habits</h4>
            <div className="habit-grid">
    {habits.map((habit, index) => (
        <button
            key={index}
            className={`button-card ${
                selectedHabit === habit.name ? "habit-button-selected" : ""
            }`}
            onClick={() => setSelectedHabit(habit.name)}
        >
            <h4>{habit.name}</h4>
        </button>
    ))}
    <div>
        <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Enter new habit"
        />
        <button onClick={handleAddHabit}>Add Habit</button>
    

            <button onClick={handleSubmitHabit}>Visulize Habit</button>
                {errorMessage && (
                    <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
                )}
            {selectedHabit && (
                <button
                    className="delete-button"
                    onClick={() => handleDeleteHabit(selectedHabit)}
                >
                    Delete Selected Habit
                </button>
            )}
            </div>
        </div>
        {/* Modal for Signup/Login */}
        {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
    </div>
    );
}
