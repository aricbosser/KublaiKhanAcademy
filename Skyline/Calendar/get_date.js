const date = new Date();

// Get Month
const monthOptions = { month: 'long' };
const month = date.toLocaleString('en-US', monthOptions);

// Get Weekday
const weekdayOptions = { weekday: 'long' };
const weekday = date.toLocaleString('en-US', weekdayOptions);

// Get Day of the Month
const dayOfMonth = date.getDate();

// Display Data
document.getElementById('month').innerText = month; // Append month name
document.getElementById('weekday').innerText = weekday; // Append weekday name
document.getElementById('date_of_month').innerText = dayOfMonth; // Append day of the month