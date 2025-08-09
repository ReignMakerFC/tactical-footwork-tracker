// Function to generate all Thursday and Saturday dates for August 2025
function getAugust2025Activities() {
    const activities = [];
    const august2025 = new Date(2025, 7); // Month is 0-based, so 7 = August
    
    // Get all dates in August 2025
    while (august2025.getMonth() === 7) {
        // Check if it's Thursday (4) or Saturday (6)
        if (august2025.getDay() === 4 || august2025.getDay() === 6) {
            activities.push({
                id: august2025.getTime(),
                title: "20 Min Footwork",
                date: new Date(august2025),
                time: "16:00", // Default time set to 4:00 PM
                description: "Dribble through cones, alternate feet, use inside, outside, and bottom of feet. Juggle for 1 minute. Repeat 5 times.",
                completed: false,
                notes: ""
            });
        }
        august2025.setDate(august2025.getDate() + 1);
    }
    return activities;
}

let activities = JSON.parse(localStorage.getItem('activities')) || getAugust2025Activities();

function displayActivities() {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    
    activities.sort((a, b) => new Date(a.date) - new Date(b.date));
    
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
            <p class="time">Time: ${activity.time}</p>
            <div class="description">
                <strong>Instructions:</strong><br>
                ${activity.description}
            </div>
            <div class="completion-section">
                <label class="completion-label">
                    <input type="checkbox" 
                           ${activity.completed ? 'checked' : ''} 
                           onchange="toggleCompletion(${activity.id})">
                    Mark as Completed
                </label>
            </div>
            <textarea class="notes" 
                      placeholder="Add session notes here..."
                      onchange="updateNotes(${activity.id}, this.value)"
            >${activity.notes}</textarea>
        `;
        
        activityList.appendChild(card);
    });
    
    saveActivities();
}
