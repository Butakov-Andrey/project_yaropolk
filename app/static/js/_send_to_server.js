import { finishRecordBeep } from './_audio.js';


/* SETTINGS */
const serverResponseDiv = document.getElementById('serverResponse');
const serverUrl = 'http://127.0.0.1:8080/api/v1/translate-text/';

const userRole = `YOU`;
const botRole = `YAR`;

/* MAIN */
export function sendText(fullTextFromUser) {
    // сообщение пользователя
    serverResponseDiv.innerHTML += `<tr><td class="role">${userRole}: </td><td class="message">${fullTextFromUser}</td></tr>`;
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
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
                serverResponseDiv.innerHTML += `<tr class="row-response"><td class="role">${botRole}: </td><td class="message">${message}</td></tr>`;
                document.documentElement.scrollTop = document.documentElement.scrollHeight;
            } else {
                console.error(data.detail);
            }
        })
        .catch(error => console.error(error));
}
