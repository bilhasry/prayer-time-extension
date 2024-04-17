"use strict"

let API_URL = 'https://api.quran.com/api/v4/verses/random?fields=text_uthmani&translations=131';

async function getRandomAyat() {
    const response = await fetch(API_URL);
    return await response.json();
}

document.addEventListener('DOMContentLoaded', function() {
    let randomAyat = getRandomAyat();
    let ayat = document.querySelector('.ayat');
    let translation = document.querySelector('.translation');
    randomAyat.then(data => {
        let textAyat = data.verse.text_uthmani;
        let verseKey = data.verse.verse_key;
        let translationAyat = data.verse.translations[0].text;
        ayat.innerHTML = textAyat;
        translation.innerHTML = `${translationAyat} (QS ${verseKey})`;
    })
});
