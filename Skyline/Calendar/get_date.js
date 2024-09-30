// const today = new Date();
const today = new Date(2024, 8, 18)

// Get Month
const monthOptions = { month: 'long' };
const month_string = today.toLocaleString('en-US', monthOptions);

// Get Weekday
const weekdayOptions = { weekday: 'long' };
const weekday_string = today.toLocaleString('en-US', weekdayOptions);

// Get Day of the Month
const date_string = today.getDate();

// Calendar is a 5x7 grid, with 0,0 representing the first day of the calendar grid and 
// 4,4 representing the final day of the calendar. 

// First step is to find where in the grid the first of the month goes.
// Once the first x,y coord is found, the rest of the calendar can be populated

// the "y" coord is weekday
// 0 - Sun | 7 - Sat

function get_first_date_of_current_month(today) {
    todays_month = today.getMonth()
    todays_year = today.getFullYear()
    return new Date(todays_year, todays_month, 1)
}

function get_first_day_of_current_month_coords(first_of_month) {
    weekday = first_of_month.getDay()
    return [weekday, 0]
}

function get_last_date_of_current_month(today) {
    let next_month = new get_following_month(today)
    let last_date = new Date(next_month - 1)
    return last_date.getDate()
}

function get_last_date_of_current_month_coords(calendar_grid, last_date, first_day_coordinates) {
    // Will Always Be in the Last Row
    let y_coord = calendar_grid.at(-1)[1]

    let x_coord = null
    let first_day_x_coord = first_day_coordinates[0]
    switch (last_date) {
        case 28:
            x_coord = first_day_x_coord - 1
        case 29:
            x_coord = first_day_x_coord
        case 30:
            x_coord = first_day_x_coord + 1
        case 31:
            x_coord = first_day_x_coord + 2
    }

    switch (x_coord) {
        case -1:
            x_coord = 6
        case 7:
            x_coord = 0
        case 8:
            x_coord = 1
    }

    return new Array(x_coord, y_coord)
}

function get_following_month(today) {
    let todays_month = today.getMonth()
    let todays_year = today.getFullYear()
    let next_month = new Date(todays_year, todays_month + 1, 1);
    return next_month
}

function set_calendar_grid_array() {
    let calendar_grid = new Array()
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 7; x++) {
            calendar_grid.push([x,y])
        }
    }

    return calendar_grid
}

function get_calendar_date(first_date, last_date, grid_index, first_day_coordinates, last_day_coordinates, x_coord, y_coord) {
    let date = 1
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 7; x++) {       
            if ((x === x_coord) && (y === y_coord)) {
                
                if ((x < first_day_coordinates[0]) && (y === 0)) {
                    let number_of_days_ago = first_day_coordinates[0] - x
                    let temp_today = new Date()
                    let temp_previous_date = new Date(temp_today.getFullYear(), temp_today.getMonth(), 1)
                    temp_previous_date.setDate(temp_previous_date.getDate() - number_of_days_ago)
                    date = temp_previous_date.getDate()
                } else if ((x > last_day_coordinates[0]) && (y === 4)) {
                    let number_of_days_ahead = x - last_day_coordinates[0]
                    let temp_today = new Date()
                    let temp_next_day = new Date(temp_today.getFullYear(), temp_today.getMonth() + 1, number_of_days_ahead)
                    date = temp_next_day.getDate()
                } else {
                    date = date - first_day_coordinates[0]
                }

                return date
            } else {
                date += 1
            }
        }
    }

    return null
}

function get_calendar_date_div(x_coord, y_coord, xy_date, is_previous, is_following) {
    let new_div = document.createElement('div');
    new_div.setAttribute('class', `date-box-[${x_coord}-${y_coord}]`);

    let new_paragraph = document.createElement('p');
    if (is_previous) {

    } else if (is_following) {

    }

    new_paragraph.textContent = xy_date;
    new_div.appendChild(new_paragraph);
    
    return new_div
}

function set_all_calendar_date_divs(today) {
    // set current calendar day div classes
    let calendar_grid = set_calendar_grid_array()
    let first_date = get_first_date_of_current_month(today)
    let last_date = get_last_date_of_current_month(today)
    let first_day_coordinates = get_first_day_of_current_month_coords(first_date)
    let last_day_coordinates = get_last_date_of_current_month_coords(calendar_grid, last_date, first_day_coordinates)
    console.log("first day coordinates", first_day_coordinates)
    console.log("Last day coords", last_day_coordinates)
    console.log("last day", last_date)

    for (let i = 0; i < calendar_grid.length; i++) {
        x_coord = calendar_grid[i][0]
        y_coord = calendar_grid[i][1]

        let is_previous = is_previous_calendar_grid_loc(first_day_coordinates[0], x_coord, y_coord)
        let is_following = is_following_calendar_grid_loc(calendar_grid, last_day_coordinates[0], x_coord, y_coord)

        let week_row_div = document.querySelector(`.week-row-${y_coord}`)
        let xy_date = get_calendar_date(first_date, last_date, i, first_day_coordinates, last_day_coordinates, x_coord, y_coord)
        let calendar_date_div = new get_calendar_date_div(x_coord, y_coord, xy_date, is_previous, is_following)

        if (is_previous) {
            week_row_div.appendChild(calendar_date_div)
        } else if (is_following) {
            week_row_div.appendChild(calendar_date_div)
        } else {
            week_row_div.appendChild(calendar_date_div)
        }
    }
}

function is_previous_calendar_grid_loc(first_day_x_coord, x_coord, y_coord) {
    if (y_coord > 0) {
        return false
    }

    if ((x_coord - first_day_x_coord) < 0) {
        return true
    } else {
        return false
    }
}

function is_following_calendar_grid_loc(calendar_grid, last_day_x_coord, x_coord, y_coord) {
    last_row = calendar_grid.at(-1)[1]

    if (y_coord < last_row) {
        return false
    }

    if ((last_day_x_coord - x_coord) < 0) {
        return true
    } else {
        return false
    }
}

console.log(today)
set_all_calendar_date_divs(today)

// Display Data
document.getElementById('month').innerText = month_string; // Append month name
document.getElementById('weekday').innerText = weekday_string; // Append weekday name
document.getElementById('date_of_month').innerText = date_string; // Append day of the month