/**
 * Things to learn:
 *  let, const, Document Object Model
 */


// ==============================================
// Clock Update Function
// ==============================================
function updateClock() {
    const clockElements = document.querySelectorAll('.clock'); // Select all elements with the class 'clock'
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const isAM = hours < 12;

    // Convert to 12-hour format
    hours = hours % 12 || 12;  // Convert hour 0 to 12
    const ampm = isAM ? 'AM' : 'PM';

    // Format time with leading zeros
    const formattedTime = [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
    ].join(':') + ' ' + ampm;

    // Update all clock elements
    clockElements.forEach(clockElement => {
        clockElement.textContent = formattedTime;
    });
}

// Call updateClock every second
setInterval(updateClock, 1000);

// ==============================================
// Cycle Background Image Function
// ==============================================
let currentIndex = 0;

function cycleBackground() {
    const images = [
        'room.gif',
        'dueling_peaks.gif',
        'majoras_mask.gif',
        'korok_forest.jpg',
        'skyward_sword.jpg',
        'ocarina-of-time.gif',
        'twilight_princess.gif'
    ];

    // Increment the index and reset if it goes beyond the array length
    currentIndex = (currentIndex + 1) % images.length;

    // Get the next image in the array
    const nextImage = images[currentIndex];

    const div = document.getElementById('wallpaper-image');
    div.style.backgroundImage = `url('./recources/wallpapers/${nextImage}')`; // Ensure this path is correct
}

// ==============================================
// Initialize Page Elements
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    // Set the initial background to 'room.gif'
    const div = document.getElementById('wallpaper-image');
    div.style.backgroundImage = `url('./recources/wallpapers/room.gif')`;

    // Update the date immediately on page load
    document.getElementById('date').textContent = formatDate();

    // Add event listener to the button for cycling the wallpaper
    document.getElementById('change-wallpaper').addEventListener('click', cycleBackground);
});

// ==============================================
// Start Clock Update Interval
// ==============================================
setInterval(updateClock, 1000);

// Run clock update once at start to avoid delay
updateClock();

// ==============================================
// Format Date Function
// ==============================================
function formatDate() {
    const today = new Date();

    // Define arrays for day and month names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Extract day, month, and year
    const dayOfWeek = days[today.getDay()];
    const dayOfMonth = String(today.getDate()).padStart(2, '0');
    const month = months[today.getMonth()];

    // Format and return the date string without the year
    return `${dayOfWeek} • ${dayOfMonth} • ${month}`;
}

// ==============================================
// Timer Functions
// ==============================================
const POMODORO_DURATION = 25 * 60 * 1000; // 25 minutes
const SHORT_BREAK = 5 * 60 * 1000; // 5 minutes
const LONG_BREAK = 20 * 60 * 1000; // 20 minutes
const FULL_HOUR = 60 * 60 * 1000; // 60 minutes
const TEN_MIN = 10 * 60 * 1000; // 10 minutes

let timerDurations = [POMODORO_DURATION, SHORT_BREAK, FULL_HOUR, LONG_BREAK, TEN_MIN]; // Updated with 10 mins
let currentTimerIndex = 0; // Start with 25 mins
let timerDuration = timerDurations[currentTimerIndex];
let remainingTime = timerDuration;
let isPaused = true;
let interval;

// Function to update the timer display
function updateTimer() {
    if (remainingTime <= 0) {
        document.getElementById('timer').textContent = '00:00';
        clearInterval(interval);
        return;
    }

    let minutes = Math.floor(remainingTime / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

// Function to start or pause the timer
function startTimer() {
    if (isPaused) {
        endTime = Date.now() + remainingTime;
        interval = setInterval(() => {
            remainingTime = endTime - Date.now();
            updateTimer();
        }, 1000);
        isPaused = false;
        document.getElementById('startPause').textContent = 'Pause';
    } else {
        clearInterval(interval);
        remainingTime = endTime - Date.now();
        isPaused = true;
        document.getElementById('startPause').textContent = 'Start';
    }
}

// Function to reset the timer
function resetTimer() {
    clearInterval(interval);
    remainingTime = timerDuration;
    updateTimer();
    isPaused = true;
    document.getElementById('startPause').textContent = 'Start';
}

// Function to toggle between different timer durations
function toggleDuration() {
    currentTimerIndex = (currentTimerIndex + 1) % timerDurations.length;
    timerDuration = timerDurations[currentTimerIndex];
    remainingTime = timerDuration;
    resetTimer();
    if (!isPaused) startTimer(); // Restart timer if it's running
    document.getElementById('toggleDuration').textContent = 'Timer'; // Always show 'timer'
}

document.getElementById('startPause').addEventListener('click', startTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('toggleDuration').addEventListener('click', toggleDuration);

// Initialize the timer display
updateTimer();

// ==============================================
// Save Checkboxes State
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.checkbox-wrapper').forEach((wrapper, index) => {
        const checkbox = wrapper.querySelector('input[type="checkbox"]');
        const textInput = wrapper.querySelector('.checkbox-text');

        // Restore checkbox state
        checkbox.checked = localStorage.getItem(`checkbox-${index}`) === 'true';

        // Restore text content
        textInput.value = localStorage.getItem(`text-${index}`) || '';

        // Add event listeners
        checkbox.addEventListener('change', () => {
            // Update text based on checkbox state
            textInput.classList.toggle('checked', checkbox.checked);
            localStorage.setItem(`checkbox-${index}`, checkbox.checked);
        });

        // Handle text content changes
        textInput.addEventListener('input', () => {
            localStorage.setItem(`text-${index}`, textInput.value);
        });

        // Initial check to apply 'checked' class
        if (checkbox.checked) {
            textInput.classList.add('checked');
        }
    });

    // Set the initial background to 'room.gif'
    const div = document.getElementById('wallpaper-image');
    if (div) {
        div.style.backgroundImage = `url('./recources/wallpapers/room.gif')`;
    }

    // Update the date immediately on page load
    const dateElement = document.getElementById('date');
    if (dateElement) {
        dateElement.textContent = formatDate();
    }

    // Add event listener to the button for cycling the wallpaper
    const changeWallpaperButton = document.getElementById('change-wallpaper');
    if (changeWallpaperButton) {
        changeWallpaperButton.addEventListener('click', cycleBackground);
    }
});


// ==============================================
// Background Sounds
// ==============================================

const toggleRainButton = document.getElementById('toggle-rain');
const rainSound = document.getElementById('rain-sound');
const toggleCampfireButton = document.getElementById('toggle-campfire');
const campfireSound = document.getElementById('campfire-sound');

// Set initial volume to 25% for both sounds
rainSound.volume = 0.25;
campfireSound.volume = 0.5;

let isRainPlaying = false;
let isCampfirePlaying = false;

// Toggle rain sound
toggleRainButton.addEventListener('click', () => {
  if (isRainPlaying) {
    rainSound.pause();
    toggleRainButton.classList.remove('button-on'); // Remove dark class when paused
  } else {
    rainSound.play();
    toggleRainButton.classList.add('button-on'); // Add dark class when playing
  }
  isRainPlaying = !isRainPlaying; // Toggle the state
});

// Toggle campfire sound
toggleCampfireButton.addEventListener('click', () => {
  if (isCampfirePlaying) {
    campfireSound.pause();
    toggleCampfireButton.classList.remove('button-on'); // Remove dark class when paused
  } else {
    campfireSound.play();
    toggleCampfireButton.classList.add('button-on'); // Add dark class when playing
  }
  isCampfirePlaying = !isCampfirePlaying; // Toggle the state
});

// ==============================================
// Page Brightness
// ==============================================

const opacitySlider = document.getElementById('brightness-slider');
const contentDiv = document.getElementById('brightness');
const focusedElements = document.querySelectorAll('.focused');

// Set initial opacity of the brightness div
contentDiv.style.opacity = opacitySlider.value;

// Function to adjust opacity and check slider value
opacitySlider.addEventListener('input', () => {
  const opacityValue = opacitySlider.value;
  contentDiv.style.opacity = opacityValue;
  
  // Check if the slider is at 0.9
  if (opacityValue == 0.9) {
    // Add the 'centered' class to all focused elements
    focusedElements.forEach(element => {
      element.classList.add('centered');
    });
  } else {
    // Remove the 'centered' class if the value is not 0.9
    focusedElements.forEach(element => {
      element.classList.remove('centered');
    });
  }
});

// ==============================================
// Clock Mini
// ==============================================

// Function to update the clock-mini visibility based on slider value
function updateClockMiniVisibility() {
    const slider = document.getElementById('brightness-slider');
    const clockMini = document.getElementById('clock-mini');
    const sliderValue = parseFloat(slider.value);

    if (sliderValue >= 0.9) {
        clockMini.classList.add('visible');
    } else {
        clockMini.classList.remove('visible');
    }
}

// Attach the function to the slider input event
document.getElementById('brightness-slider').addEventListener('input', updateClockMiniVisibility);

// Initial check in case the page loads with a slider value >= 0.9
updateClockMiniVisibility();

// ==============================================
// If-Mobile-True
// ==============================================

// Function to check if the user is on a mobile device
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Function to hide elements with a specific class on mobile devices
function hideElementsOnMobile() {
    if (isMobileDevice()) {
        const elements = document.getElementsByClassName('mobile-hide'); // Replace with your class name
        for (let element of elements) {
            element.style.display = 'none'; // Hides each element
        }
    }
}

// Call the function when the page loads
window.onload = hideElementsOnMobile;