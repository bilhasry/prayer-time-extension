"use strict";

let date = new Date();
let hour = date.getHours();
let minute = date.getMinutes();
let second = date.getSeconds();
let clock = document.querySelector('.time-info');


let monthFormat = (format, intMonth) => {
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][intMonth];

    return ('full' === format) ? month : month.substring(0,3);
}


setInterval( () => {
    if (second == 59) {
        second = 0;
        if (minute == 59) {
            minute = 0;
            if (hour == 24) {
                hour = 0;
            } else {
                hour += 1;
            }
        } else {
            minute += 1;
        }
    } else {
        second += 1;
    }
    let time = `${String(hour).padStart(2, '0')} : ${String(minute).padStart(2, '0')} : ${String(second).padStart(2, '0')}`;
    clock.innerHTML = time;
}, 1000)
