/*Habit history, currently used for the circle visualization.  Can be adapted for futher use*/

import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function History() {
    const { globalUser, setGlobalData, globalData } = useAuth();

    // State for storing circles
    const [circles, setCircles] = useState([]);
    const canvasRef = useRef(null); // Reference to the canvas element

    // Circle class to handle circle properties and methods
    class Circle {
        constructor() {
            this.x = Math.random() * 500; // Random position
            this.y = Math.random() * 500;
            this.radius = 5; // Radius of the circle
            this.dx = (Math.random() - 0.5) * 4; // Random horizontal velocity
            this.dy = (Math.random() - 0.5) * 4; // Random vertical velocity
            this.color = 'rgba(0, 150, 255, 0.7)'; // Circle color
        }

        update() {
            // Update position based on velocity
            this.x += this.dx;
            this.y += this.dy;

            // Collision with walls (bouncing logic)
            if (this.x + this.radius > 500 || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > 500 || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
        }

        draw(context) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = this.color;
            context.fill();
            context.closePath();
        }
    }

    // Animation function
    const animate = () => {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, 500, 500); // Clear canvas

        circles.forEach((circle) => {
            circle.update();
            circle.draw(context);
        });

        requestAnimationFrame(animate); // Keep animating
    };

    // Real-time Firestore listener for globalData
    const [loading, setLoading] = useState(true);

useEffect(() => {
    if (globalUser) {
        const userRef = doc(db, "users", globalUser.uid);

        const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const completedHabits = docSnapshot.data().completedHabits || {};
                setGlobalData(completedHabits);
            } else {
                setGlobalData({});
            }
            setLoading(false); // Set loading to false after data is fetched
        });

        return () => unsubscribe();
    } else {
        setLoading(false); // No user, no need to load
    }
}, [globalUser, setGlobalData]);

    

    // Update circles when globalData changes
    useEffect(() => {
        const newCircles = Object.keys(globalData).map(() => new Circle());
        setCircles(newCircles);
    }, [globalData]);

    // Start animation loop
    useEffect(() => {
        animate();
    }, [circles]);

    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-timeline" />
                <h2>History</h2>
            </div>
            <p><i>See your Progress</i></p>
            <canvas
                ref={canvasRef}
                width="500"
                height="500"
                style={{ border: "2px solid black", marginTop: "20px" }}
            />
        </>
    );
}
