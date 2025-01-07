/* User stats portion, could be adapted to display more user stats*/
import { useAuth } from "../context/AuthContext";

function StatCard({ title, children }) {
    return (
        <div className="card stat-card">
            <h4>{title}</h4>
            {children}
        </div>
    );
}

export default function Stats() {
    const { globalData } = useAuth();

    const recentHabits = Object.entries(globalData || {})
        .sort(([a], [b]) => b - a)
        .slice(0, 5);

    return (
        <div>
            <div className="section-header">
                <i className="fa-solid fa-chart-simple" />
                <h2>Your Habit Stats</h2>
            </div>

            <div className="stats-grid">
                <StatCard title="Recent Habits">
                    <ul>
                        {recentHabits.map(([timestamp, habit], index) => (
                            <li key={index}>
                                {habit.name} - {new Date(+timestamp).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </StatCard>
            </div>
        </div>
    );
}
