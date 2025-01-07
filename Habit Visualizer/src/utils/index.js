// Habit progress levels (optional, you can customize further if needed)
export const statusLevels = {
    low: {
        color: "#047857",
        background: "#d1fae5",
        description: "You're just starting. Keep going!",
        maxLevel: 10,
    },
    moderate: {
        color: "#b45309",
        background: "#fef3c7",
        description: "Great progress! Stay consistent.",
        maxLevel: 20,
    },
    high: {
        color: "#e11d48",
        background: "#ffe4e6",
        description: "Amazing work! You're building strong habits.",
        maxLevel: 9999,
    },
};

// Initial habit options (default for new users)
export const habitOptions = [
    { name: "Study" },
    { name: "Exercise" },
    { name: "Wake up Early" },
    { name: "Call Family" },
    { name: "Meditation" },
];

// Utility function to calculate time since a habit was logged
export function timeSince(utcMilliseconds) {
    const now = Date.now();
    const diff = now - utcMilliseconds;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
}

// Utility function to calculate basic stats for habits
export function calculateHabitStats(habitHistory) {
    const totalHabitsLogged = Object.keys(habitHistory).length;

    // Get the most recent habits
    const recentHabits = Object.entries(habitHistory)
        .sort(([a], [b]) => b - a)
        .slice(0, 5)
        .map(([timestamp, habit]) => ({
            name: habit.name,
            time: new Date(parseInt(timestamp)).toLocaleString(),
        }));

    return {
        totalHabitsLogged,
        recentHabits,
    };
}

// Example habit history (for testing purposes, replace with Firebase data in production)
export const habitHistory = {
    "1727579064032": { name: "Study" },
    "1727629263026": { name: "Exercise" },
    "1727571485301": { name: "Meditation" },
    "1727585485245": { name: "Wake up Early" },
    "1727614392214": { name: "Call Family" },
};

// Example usage of calculateHabitStats
const stats = calculateHabitStats(habitHistory);
console.log("Habit Stats:", stats);
