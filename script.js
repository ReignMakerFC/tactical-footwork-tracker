function displayActivity() {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    
    // Get current day of week
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    // If not Thursday (4) or Saturday (6), show "No Footwork Training Today"
    if (dayOfWeek !== 4 && dayOfWeek !== 6) {
        activityList.innerHTML = '<div class="activity-card"><h3>No Footwork Training Today</h3></div>';
        return;
    }

    // If it is a training day (Thursday or Saturday), show the activity
    activityList.innerHTML = `
        <div class="activity-card">
            <h3>20 Min Footwork</h3>
            <div class="description">
                <strong>Instructions:</strong><br>
                Dribble through cones, alternate feet, use inside, outside, and bottom of feet. Juggle for 1 minute. Repeat 5 times.
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
