function formatTime(createdAt) {
    
    const d = new Date(createdAt)
    let month = d.getMonth()
    let day = d.getDate()
    const year = d.getFullYear()
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let amPm = "am"

    switch (month) {
        case 0: month = "Jan"
            break;
        case 1: month = "Feb"
            break;
        case 2: month = "Mar"
            break;
        case 3: month = "Apr"
            break;
        case 4: month = "May"
            break;
        case 5: month = "Jun"
            break;
        case 6: month = "Jul"
            break;
        case 7: month = "Aug"
            break;
        case 8: month = "Sep"
            break;
        case 9: month = "Oct"
            break;
        case 10: month = "Nov"
            break;
        case 11: month = "Dec"
            break;
    }

    switch (day) {
        case 1: day = day + "st"
            break;
        case 2: day = day + "nd"
            break;
        case 3: day = day + "rd"
            break;
        default: day = day + "th"
            break;

    }

    if (hours > 12) {
        hours = hours - 12;
        amPm = "pm"
    }
    if (hours === 0) {
        hours = 12
    }

    return `${month} ${day}, ${year} at ${hours}:${minutes}${amPm}`
}

module.exports = formatTime