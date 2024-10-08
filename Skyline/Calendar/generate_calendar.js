// Calendar Functions

// Cycle through the calendar grid until the current position is found
// If the current calendar position is before the first of the month, determine the corresponding date from the previous month
// If the current calendar position is after the last of the month, determine the corresponding date from the next month
// Else return the date for the current calendar position
function get_calendar_date(first_date, last_date, first_day_coordinates, last_day_coordinates, x_coord, y_coord) {
    // Calculate the absolute index position in the calendar grid
    let index = y_coord * 7 + x_coord;

    // Calculate the first day index and the last day index in the calendar grid
    let first_day_index = first_day_coordinates[1] * 7 + first_day_coordinates[0];
    let last_day_index = last_day_coordinates[1] * 7 + last_day_coordinates[0];

    if (index < first_day_index) {
        // Previous month dates
        return new Date(first_date.getFullYear(), first_date.getMonth(), first_date.getDate() - (first_day_index - index)).getDate();
    } else if (index > last_day_index) {
        // Next month dates
        return new Date(last_date.getFullYear(), last_date.getMonth(), last_date.getDate() + (index - last_day_index)).getDate();
    } else {
        // Current month dates
        return first_date.getDate() + (index - first_day_index);
    }
}

// Build and return a calendar div for an x,y position in the grid
function get_calendar_date_div(today, x_coord, y_coord, xy_date, is_previous, is_following) {
    let new_div = document.createElement('div');
    new_div.setAttribute('class', `date-box-[${x_coord}-${y_coord}]`);

    let new_paragraph = document.createElement('p');
    if (is_previous) {
        new_div.classList.add('date-box-previous')
    } 
    
    if (is_following) {
        new_div.classList.add('date-box-following')
    }

    if (today.getDate() === xy_date) {
        new_div.classList.add('date-box-current')
    }

    new_paragraph.textContent = xy_date;
    new_div.appendChild(new_paragraph);
    
    return new_div
}

// Given the current date, returns a JS Date object for the first of the month
function get_first_date_of_current_month(today) {
    return new Date(today.getFullYear(), today.getMonth(), 1)
}

// Given the first of the month JS Date object, return the x,y coordinates of the first of the month
// getDay returns an integer 0-6 representing the week day
function get_first_day_of_current_month_coords(first_date) {
    return [first_date.getDay(), 0]
}

// Given a today's JS Date object, return a new JS Date object of the following month
function get_following_month(today) {
    return new Date(today.getFullYear(), today.getMonth() + 1, 1)
}

// Given the current date, return a JS Date object for the last date of the month
// JS interprets 0 as the last day of the current month
function get_last_date_of_current_month(today) {
    return new Date(today.getFullYear(), today.getMonth() + 1, 0);
}

// Given the last date of the current month, return the x, y coordinates of the last day of the month
function get_last_date_of_current_month_coords(calendar_grid, last_date) {
    const y_coord = calendar_grid.at(-1)[1];  // Always the last row
    let x_coord = last_date.getDay() % 7;  // Calculate the x coordinate directly
    return [x_coord, y_coord];
}

// Returns true if the current x,y grid location is the previous month
function is_previous_calendar_grid_loc(first_day_x_coord, x_coord, y_coord) {
    return y_coord === 0 && x_coord < first_day_x_coord;
}

// Returns true if the current x,y grid location is the next month
function is_following_calendar_grid_loc(calendar_grid, last_day_x_coord, x_coord, y_coord) {
    return y_coord === calendar_grid.at(-1)[1] && x_coord > last_day_x_coord;
}

// Return the calendar grid array; array of arrays
// [[0,0], [0,1] ... [x,y]]
function set_calendar_grid_array() {
    return Array.from({ length: 35 }, (_, i) => [i % 7, Math.floor(i / 7)]);
}

// Main function - build the html of the calendar grid
function generate_calendar(today) {
    // Set a blank grid
    let calendar_grid = set_calendar_grid_array()

    // Get the first / last day Date and Coordinates
    let first_date = get_first_date_of_current_month(today)
    let last_date = get_last_date_of_current_month(today)
    let first_day_coordinates = get_first_day_of_current_month_coords(first_date)
    let last_day_coordinates = get_last_date_of_current_month_coords(calendar_grid, last_date)

    for (let i = 0; i < calendar_grid.length; i++) {
        x_coord = calendar_grid[i][0]
        y_coord = calendar_grid[i][1]

        let is_previous = is_previous_calendar_grid_loc(first_day_coordinates[0], x_coord, y_coord)
        let is_following = is_following_calendar_grid_loc(calendar_grid, last_day_coordinates[0], x_coord, y_coord)

        let week_row_div = document.querySelector(`#calendar-container-dates`)
        let xy_date = get_calendar_date(first_date, last_date, first_day_coordinates, last_day_coordinates, x_coord, y_coord)
        let calendar_date_div = new get_calendar_date_div(today, x_coord, y_coord, xy_date, is_previous, is_following)

        if (is_previous) {
            week_row_div.appendChild(calendar_date_div)
        } else if (is_following) {
            week_row_div.appendChild(calendar_date_div)
        } else {
            week_row_div.appendChild(calendar_date_div)
        }
    }
}

var today = new Date()
generate_calendar(today)