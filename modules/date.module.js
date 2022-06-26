Date.prototype.timeBetween = function (date1) {
    let remaining = date1.getTime() - this.getTime();
    let days = Math.abs(Math.floor(remaining / (1000 * 60 * 60 * 24)));
    let hours = Math.abs(Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = Math.abs(Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = Math.abs(Math.floor((remaining % (1000 * 60)) / 1000));
    let milisecond = Math.abs(Math.floor((remaining % (1000 * 60))));

    return {
        days,
        hours,
        minutes,
        seconds,
        milisecond
    }
}

Date.prototype.getMonthName = function () {
    let months = ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    return months[this.getMonth()]
}

Date.prototype.getDayName = function () {
    let day = ["Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thrusday",
        "Friday",
        "Saturday"
    ]

    return day[this.getDay()]
}