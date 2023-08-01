
export default function renderDate (utcDate) {
    let dayInterval;
    // 2023-07-22T01:44:04.771Z
    // Fri Jul 21 2023 19:44:00 GMT-0600 (Mountain Daylight Time)
    const uTCPrimitive = utcDate;

    function returnMonthIndexForDateUTC (sliced) {
        if (sliced[0] === "0") {
            return Number(sliced[1]) - 1;
        } else {
            return Number(sliced) - 1;
        }
    }

    const orderDate = new Date(Date.UTC(Number(uTCPrimitive.slice(0, 4)), returnMonthIndexForDateUTC(uTCPrimitive.slice(5, 7)), Number(uTCPrimitive.slice(8, 10)), Number(uTCPrimitive.slice(11, 13)), Number(uTCPrimitive.slice(14, 16))));

    function toAbbrevEnglishMonth (month) {
        switch (month) {
            case 1:
                return "Jan.";
            case 2:
                return "Feb.";
            case 3:
                return "Mar.";
            case 4:
                return "Apr.";
            case 5:
                return "May";
            case 6:
                return "Jun.";
            case 7:
                return "Jul.";
            case 8:
                return "Aug.";
            case 9:
                return "Sep.";
            case 10:
                return "Oct.";
            case 11:
                return "Nov.";
            case 12:
                return "Dec.";
        }
    }

    function toEnglishDay (weekIndex) {
        switch (weekIndex) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        }
    }

    function toCorrectDaySuffix (day) {
        if (day === 1 || day === 21 || day === 31) {
            return "st";
        } else if (day === 2 || day === 22) {
            return "nd"
        } else if (day === 3 || day === 23) {
            return "rd";
        } else {
            return "th";
        }
    }

    function findTimeZone (primitiveSymbol) {
        const timeZoneStartIndex = primitiveSymbol.split('').findIndex(letter => letter === "(");
        return primitiveSymbol.split('').slice(timeZoneStartIndex).join('');
    }

    function militaryToRegular (hour) {
        if (hour <= 12) {
            if (hour === 12) {
                dayInterval = "PM";
            } else {
                dayInterval = "AM";
                if (hour === 0) {
                    return 12;
                }
            }
            return hour;
        } else {
            dayInterval = "PM";
            return hour - 12;
        }
    }

    function minutesToDesiredForm (minutes) {
        if (minutes < 10) {
            return "0" + minutes;
        } else {
            return minutes;
        }
    }

    const fullDate = `${toEnglishDay(orderDate.getDay())}, ${toAbbrevEnglishMonth(orderDate.getMonth() + 1)} ${orderDate.getDate()}${toCorrectDaySuffix(orderDate.getDate())} ${orderDate.getFullYear()} at ${militaryToRegular(orderDate.getHours())}:${minutesToDesiredForm(orderDate.getMinutes())} ${dayInterval} ${findTimeZone(orderDate[Symbol.toPrimitive]('string'))}`;
    const shortenedDate = `${toEnglishDay(orderDate.getDay())}, ${toAbbrevEnglishMonth(orderDate.getMonth() + 1)} ${orderDate.getDate()}${toCorrectDaySuffix(orderDate.getDate())} ${orderDate.getFullYear()}`

    return [fullDate, shortenedDate];
}
