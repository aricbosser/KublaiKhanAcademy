var today = new Date()

// Get Month
const monthOptions = { month: 'long' };
const month_string = today.toLocaleString('en-US', monthOptions);

// Get Weekday
const weekdayOptions = { weekday: 'long' };
const weekday_string = today.toLocaleString('en-US', weekdayOptions);

// Get Day of the Month
const date_string = today.getDate();

// Display Data
document.getElementById('month').innerText = `${date_string} ${month_string} ${weekday_string}`; // Append month name