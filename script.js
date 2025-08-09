// script.js
let activities = JSON.parse(localStorage.getItem('activities')) || [
    {
        id: 1,
        title: "Morning Exercise",
        time: "08:00",
        days: ["Monday", "Wednesday", "Friday"],
        completed: false,
        notes: ""
    }
];

function displayActivities() {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const card = document.createElement('div');
        card.className = `activity-card ${activity.completed ? 'completed' : ''}`;
        
        card.innerHTML = `
            <h3>${activity.title}</h3>
            <p>Time: ${activity.time}</p>
            <p>Days: ${activity.days.join(', ')}</p>
            <label>
                <input type="checkbox" 
                       ${activity.completed ? 'checked' : ''} 
                       onchange="toggleCompletion(${activity.id})">
                Completed
            </label>
            <textarea class="notes" 
                      placeholder="Add notes..."
                      onchange="updateNotes(${activity.id}, this.value)"
            >${activity.notes}</textarea>
            <button onclick="deleteActivity(${activity.id})">Delete</button>
        `;
        
        activityList.appendChild(card);
    });
    
    saveActivities();
}

function addActivity() {
    const title = prompt("Enter activity title:");
    if (!title) return;
    
    const time = prompt("Enter time (HH:MM):");
    if (!time) return;
    
    const daysInput = prompt("Enter days (comma-separated):");
    if (!daysInput) return;
    
    const days = daysInput.split(',').map(day => day.trim());
    
    const newActivity = {
        id: Date.now(),
        title,
        time,
        days,
        completed: false,
        notes: ""
    };
    
    activities.push(newActivity);
    displayActivities();
}

function toggleCompletion(id) {
    const activity = activities.find(a => a.id === id);
    if (activity) {
        activity.completed = !activity.completed;
        displayActivities();
    }
}

function updateNotes(id, noteotes) {
    const activity = activities.find(a => a.id === id);
    if (activity) {
        activity.notes = notes;
        saveActivities();
    }
}

function deleteActivtivity(id) {
    if (confirm("Are you sure you want to delete this activity?")) {
        activities = activities.filter(a => a.id !== id);
        displayActivities();
    }
}

function saveActivities() {
    localStorage.setItem('activities', JSON.stringify(activities));
}

// Initialize the display
displayActivities();

// Set up notifications (basic browser notifications)
if ("Notification" in window) {
    Notification.requestPermission();
}

// Check for activities every minute
setInterval(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const currentDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
    
    activities.forEach(activity => {
        if (activity.time === currentTime && activity.days.includes(currentDay)) {
            if (Notification.permission === "granted") {
                new Notification(`Time for ${activity.title}!`);
            }
        }
    });
}, 60000);
