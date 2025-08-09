function getNextTrainingDate() {
    const today = new Date();
    const nextDate = new Date(today);
    
    // Keep adding days until we hit a Thursday or Saturday
    while (true) {
        nextDate.setDate(nextDate.getDate() + 1);
        if (nextDate.getDay() === 5 || nextDate.getDay() === 0) { // 4 is Thursday, 6 is Saturday
            break;
        }
    
    return nextDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

function displayActivity() {
    // Set today's date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    
    // Display the date
    document.getElementById('currentDate').textContent = formattedDate;

    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    
    // Get current day of week
    const dayOfWeek = today.getDay();
    
    // If not training day, show next training date
    if (dayOfWeek !== 5 && dayOfWeek !== 0) {
        const nextTrainingDate = getNextTrainingDate();
        activityList.innerHTML = `
            <div class="activity-card">
                <h3>No Footwork Training Today</h3>
                <p>Next training session is ${nextTrainingDate}</p>
            </div>`;
        return;
    }

    // If it is a training day, show the activity
    activityList.innerHTML = `
        <div class="activity-card">
            <h3>20 Min Footwork</h3>
            <div class="description">
                <strong>Instructions:</strong><br>
                Dribble through cones, alternate feet. Down & back using inside of feet, down & back using outside of feet, down & back using bottom of feet. Juggle for 1 minute. Repeat 5 times.
            </div>
            <textarea class="notes" 
                      placeholder="Add session notes here..."
                      onchange="saveNotes(this.value)"
            >${localStorage.getItem('sessionNotes') || ''}</textarea>
            <div class="completion-section">
                <button onclick="markComplete()" id="completeButton">
                    Complete
                </button>
                <p id="completionMessage" style="display: none;" class="completion-message">Good Job!</p>
            </div>
        </div>
    `;
}

function markComplete() {
    document.getElementById('completeButton').style.display = 'none';
    document.getElementById('completionMessage').style.display = 'block';
}

function saveNotes(notes) {
    localStorage.setItem('sessionNotes', notes);
}

// Initialize the display
displayActivity();
