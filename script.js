// History management functions
function getTrainingHistory() {
    return JSON.parse(localStorage.getItem('trainingHistory')) || {};
}

function saveTrainingHistory(history) {
    localStorage.setItem('trainingHistory', JSON.stringify(history));
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

function getNextTrainingDate() {
    const today = new Date();
    const nextDate = new Date(today);
    
    // Keep adding days until we hit a Friday or Sunday
    while (true) {
        nextDate.setDate(nextDate.getDate() + 1);
        if (nextDate.getDay() === 5 || nextDate.getDay() === 0) { // 5 is Friday, 0 is Sunday
            break;
        }
    }
    
    return nextDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

function displayHistory() {
    const history = getTrainingHistory();
    const historyDiv = document.createElement('div');
    historyDiv.className = 'training-history';
    historyDiv.innerHTML = '<h3>Training History</h3>';

    // Get all training dates from the past 30 days
    const dates = [];
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    for (let d = new Date(thirtyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
        if (d.getDay() === 5 || d.getDay() === 0) { // Friday or Sunday
            dates.push(new Date(d));
        }
    }

    // Sort dates in reverse chronological order
    dates.sort((a, b) => b - a);

    // Create the history list
    const historyList = document.createElement('div');
    historyList.className = 'history-list';

    dates.forEach(date => {
        const dateStr = formatDate(date);
        const wasCompleted = history[dateStr];
        const dateDiv = document.createElement('div');
        dateDiv.className = 'history-item';
        dateDiv.innerHTML = `
            <span class="history-date">${dateStr}</span>
            <span class="history-status ${wasCompleted ? 'completed' : 'missed'}">
                ${wasCompleted ? '✓' : '✗'}
            </span>
        `;
        historyList.appendChild(dateDiv);
    });

    historyDiv.appendChild(historyList);
    return historyDiv;
}

function updateHistoryDisplay() {
    const oldHistory = document.querySelector('.training-history');
    if (oldHistory) {
        oldHistory.remove();
    }
    document.querySelector('.container').appendChild(displayHistory());
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
    
    // Get current day of week
    const dayOfWeek = today.getDay();
    
    // Get header and date elements
    const trainingHeader = document.getElementById('trainingHeader');
    const currentDate = document.getElementById('currentDate');
    const activityList = document.getElementById('activity-list');
    
    // If not training day, hide header and date, show next training date
    if (dayOfWeek !== 5 && dayOfWeek !== 0) {
        trainingHeader.style.display = 'none';
        currentDate.style.display = 'none';
        const nextTrainingDate = getNextTrainingDate();
        activityList.innerHTML = `
            <div class="activity-card">
                <h3>No Footwork Training Today</h3>
                <p>Next training session is ${nextTrainingDate}</p>
            </div>`;
    } else {
        // If it is a training day, show header, date and activity
        trainingHeader.style.display = 'block';
        currentDate.style.display = 'block';
        currentDate.textContent = formattedDate;
        
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

    // Add history section
    updateHistoryDisplay();
}

function markComplete() {
    const today = new Date();
    const dateStr = formatDate(today);
    
    // Save completion status
    const history = getTrainingHistory();
    history[dateStr] = true;
    saveTrainingHistory(history);

    // Update display
    document.getElementById('completeButton').style.display = 'none';
    document.getElementById('completionMessage').style.display = 'block';
    
    // Refresh history display
    updateHistoryDisplay();
}

function saveNotes(notes) {
    localStorage.setItem('sessionNotes', notes);
}

// Initialize the display
displayActivity();
