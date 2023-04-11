import { finishRecordBeep } from './_audio.js';


/* SETTINGS */
const serverResponseDiv = document.getElementById('serverResponse');
const serverUrl = 'http://127.0.0.1:8080/api/v1/translate-text/';


/* MAIN */
export function sendText(fullTextFromUser) {
    // сообщение пользователя
    serverResponseDiv.innerHTML += 'YOU: ' + fullTextFromUser + '<br>';

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
                // ответ сервера
                serverResponseDiv.innerHTML += 'YAR: ' + message + '<br>';
            } else {
                console.error(data.detail);
            }
        })
        .catch(error => console.error(error));
}
