// updated aug 2025
function getAugust2025Activities() {
    const activities = [];
    const august2025 = new Date(2025, 7, 1); // Start with August 1, 2025
    
    while (august2025.getMonth() === 7) { // While still in August
        const dayOfWeek = august2025.getDay();
        // If Thursday (4) or Saturday (6)
        if (dayOfWeek === 4 || dayOfWeek === 6) {
            activities.push({
                id: august2025.getTime(),
                title: "20 Min Footwork",
                date: new Date(august2025),
                description: "Dribble through cones, alternate feet, use inside, outside, and bottom of feet. Juggle for 1 minute. Repeat 5 times.",
                completed: false,
                notes: ""
            });
        }
        // Move to next day
        august2025.setDate(august2025.getDate() + 1);
    }
    return activities;
}

// Clear any old data
localStorage.clear();

let activities = getAugust2025Activities();

function displayActivities() {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    
    // Get current date
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    
    // If not Thursday or Saturday, display "No Footwork Training Today"
    if (currentDayOfWeek !== 4 && currentDayOfWeek !== 6) {
        const noTrainingMessage = document.createElement('div');
        noTrainingMessage.className = 'activity-card';
        noTrainingMessage.innerHTML = '<h3>No Footwork Training Today</h3>';
        activityList.appendChild(noTrainingMessage);
        return;
    }

    activities.forEach(activity => {
        const card = document.createElement('div');
        card.className = `activity-card ${activity.completed ? 'completed' : ''}`;
        
        const date = new Date(activity.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        card.innerHTML = `
            <h3>${activity.title}</h3>
            <p class="date">${formattedDate}</p>
            <div class="description">
                <strong>Instructions:</strong><br>
                ${activity.description}
            </div>
            <div class="completion-section">
                <button onclick="markComplete(${activity.id})" 
                        ${activity.completed ? 'style="display:none"' : ''}>
                    Complete
                </button>
                ${activity.completed ? '<p class="completion-message">Good Job!</p>' : ''}
            </div>
            <textarea class="notes" 
                      placeholder="Add session notes here..."
                      onchange="updateNotes(${activity.id}, this.value)"
            >${activity.notes}</textarea>
        `;
        
        activityList.appendChild(card);
    });
}

function markComplete(id) {
    const activity = activities.find(a => a.id === id);
    if (activity) {
        activity.completed = true;
        localStorage.setItem('activities', JSON.stringify(activities));
        displayActivities();
    }
}

function updateNotes(id, notes) {
    const activity = activities.find(a => a.id === id);
    if (activity) {
        activity.notes = notes;
        localStorage.setItem('activities', JSON.stringify(activities));
    }
}

// Initialize the display
displayActivities();
