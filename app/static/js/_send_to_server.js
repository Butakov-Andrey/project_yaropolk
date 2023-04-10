import { finishRecordBeep } from './_audio.js';


/* SETTINGS */
const serverResponseDiv = document.getElementById('serverResponse');
const serverUrl = 'http://127.0.0.1:8080/api/v1/translate-text/';


/* MAIN */
export function sendText(fullTextFromUser) {
    const requestBodyJson = JSON.stringify({ message: fullTextFromUser });
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBodyJson
    })
        // разбираем ответ сервера
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                const message = data.message;
                finishRecordBeep();
                serverResponseDiv.innerHTML += message + '<br>';
            } else {
                console.error(data.detail);
            }
        })
        .catch(error => console.error(error));
}
