"use strict";

import { GREGORIAN_MONTHS, HIJRI_MONTHS } from "../../include/js/const/date.js";
const PRAYER_TIMES = [
    'syuruk',
    'dhuhr',
    'asr',
    'maghrib',
    'isha',
    'fajr',
];

const PRAYER_TIMES_TRANSLATE = {
    'dhuhr' : 'Dzuhur',
    'asr': 'Asar',
    'maghrib': 'Maghrib',
    'isha': 'Isya',
    'fajr': 'Shubuh',
    'syuruk': 'Syuruk'
};

let prayerCardClass = 'flex gap-5 px-5 py-2 mt-2 w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-100';

let prayerCardTemplate = (prayer, time) => { return `<div class="${prayerCardClass}">
            <div class="flex gap-5">
            <div class="my-auto">${prayer}</div>
            </div>
            <div class="flex gap-5 justify-between my-auto">
            <div class="my-auto">${time}</div>
            </div>
        </div>`;
    };

async function getPrayerTime() {
    const response = await fetch("https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=WLY01");
    return await response.json();
}

function formatHijriDate(date) {
    let hijri = date.split('-');
    console.log(date);
    return `${hijri[2]} ${HIJRI_MONTHS[parseInt(hijri[1])-1]} ${hijri[0]}`; 
}

function formatGregorianDate(date) {
    let gregorian = new Date(date);
    return `${gregorian.getDate()} ${GREGORIAN_MONTHS[gregorian.getMonth()]} ${gregorian.getFullYear()} `; 
}
window.onload = function() {
    let prayers = getPrayerTime();
    prayers.then(data => {
        let prayerTime = data.prayerTime[0];
        
        for (const [key, value] of Object.entries(prayerTime)) {
            if (PRAYER_TIMES.includes(key)) {
                document.querySelector(`.${key} > h3`).innerHTML = PRAYER_TIMES_TRANSLATE[key];
                document.querySelector(`.${key} > div`).innerHTML = value.substring(0,5);
            }
            if (key === 'date') {
                document.querySelector('.gregorian').innerHTML = formatGregorianDate(value);
            }
            if (key === 'hijri') {
                document.querySelector('.hijri').innerHTML = formatHijriDate(value);
            }
        }
    })
    
}


