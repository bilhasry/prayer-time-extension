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

async function getPrayerTime() {
    const response = await fetch("https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=WLY01");
    return await response.json();
}

function formatHijriDate(date) {
    let hijri = date.split('-');
    return `${hijri[2]} ${HIJRI_MONTHS[parseInt(hijri[1])-1]} ${hijri[0]}`; 
}

function formatGregorianDate(date) {
    let gregorian = new Date(date);
    return `${gregorian.getDate()} ${GREGORIAN_MONTHS[gregorian.getMonth()]} ${gregorian.getFullYear()} `; 
}

function isStorageExist()
{
    return localStorage.getItem('prayer_times') ?? false;
}

function isToday(prayerDate)
{
    let todayDate = new Date();
    let storageDate = new Date(prayerDate);
    
    return todayDate.toDateString() === storageDate.toDateString();
}

function getPrayerFromStorage()
{
    return JSON.parse(localStorage.getItem('prayer_times'));
}

window.onload = function() {
    let callApi = true;
    let prayerStorage = {};
    if (isStorageExist()) {
        prayerStorage = getPrayerFromStorage();
        if (isToday(prayerStorage.serverTime)) {
            callApi = false;
        }
    }
    
    if (callApi) {
        console.log(callApi);
        let prayers = getPrayerTime();
        prayers.then(data => {
            localStorage.setItem('prayer_times', JSON.stringify(data));
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
        });
    } else {
        let prayers = prayerStorage;

        let prayerTime = prayers.prayerTime[0];
            
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
    }
}
