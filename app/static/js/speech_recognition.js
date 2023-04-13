import { finishRecordBeep, startRecordBeep } from './_audio.js';
import { isSoundOn } from './home.js';


/* SETTINGS */
const userRequestDiv = document.getElementById('userRequest');
const serverResponseTable = document.getElementById('serverResponse');
const serverUrl = 'http://127.0.0.1:8080/api/v1/translate-text/';
const userRole = `YOU`;
const botRole = `YAR`;
const listenMessage = "Слушаю...";
// голосовые команды
const start_commands = ["ярополк", "ярик"]
const send_commands = ["с богом", "аминь"]
const delete_commands = ["убери", "удали"]
// запись и расшифровка текста, настройки расшифровки
const recognition = new webkitSpeechRecognition();
recognition.lang = 'ru-RU';
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;


/* MAIN */
let fullTextFromUser = '';
let fullTextFromUserKeyBoard = '';

recognition.onresult = (event) => {
    // преобразовываем голос пользователя в текст
    // расшифровываем все фразы, но не записываем текст
    const textFromUser = event.results[0][0].transcript.toLowerCase();

    const anyStartCommand = start_commands.some(value => textFromUser.includes(value));
    const anySendCommand = send_commands.some(value => textFromUser.includes(value));
    const anyDeleteCommand = delete_commands.some(value => textFromUser.includes(value));

    // обновляем текст пользователя, если пользователь ввел новый текст с клавиатуры
    userRequestDiv.addEventListener('keyup', function () {
        const updatedFromKeyboardText = userRequestDiv.value;
        fullTextFromUserKeyBoard = updatedFromKeyboardText;
    });

    if (anyStartCommand) {
        // добавляем пробел в переменную, означает, что запись началась
        fullTextFromUser = ' ';
        // очищаем элемент для запроса пользователя
        userRequestDiv.value = `${fullTextFromUser}`;
        if (isSoundOn === "on") {
            startRecordBeep();
        } else {
            // показываем сообщение, что звук записывается
            document.getElementById("listenDiv").innerHTML = listenMessage;
        }
    } else if (anySendCommand && fullTextFromUser) {
        // отправляем весть текст пользователя на сервер
        sendText(userRequestDiv.value);
        // убираем сообщение, что звук записвается
        document.getElementById("listenDiv").innerHTML = '';
        // очищаем переменную для всего текста пользователя, чтобы не записывать следующие фразы
        fullTextFromUser = '';
        fullTextFromUserKeyBoard = '';
    } else if (anyDeleteCommand && fullTextFromUser) {
        // очищаем переменную для всего текста полльзователя, чтобы не записывать следующие фразы
        fullTextFromUser = '';
        fullTextFromUserKeyBoard = '';
        userRequestDiv.value = `${fullTextFromUser}`;
    } else {
        // если нет команд, то мы записываем, все что говорит пользователь
        if (fullTextFromUser) {
            // fullTextFromUser += `${textFromUser}. `;
            userRequestDiv.value += `${textFromUser}. `;
        } else if (fullTextFromUserKeyBoard) {
            userRequestDiv.value = `${fullTextFromUserKeyBoard}`;
        }
    }
};
// постоянно слушаем пользователя
recognition.onend = () => {
    recognition.start();
};
recognition.start();

// отправляем сообщение на сервер
export function sendText(fullMessage) {
    // очищаем блок с инструкциями для пользователей
    if (document.getElementById("instructDiv")) {
        document.getElementById("instructDiv").outerHTML = "";
    }
    // сообщение пользователя
    serverResponseTable.innerHTML += `<tr><td class="role">${userRole}: </td><td class="message">${fullMessage}</td></tr>`;
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
    const requestBodyJson = JSON.stringify({ message: fullMessage });
    // убираем текст пользователя после отправки и завершаем запись голоса
    // fullTextFromUser = '';
    fullTextFromUserKeyBoard = '';
    userRequestDiv.value = `${fullTextFromUser}`;
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
                if (isSoundOn === "on") {
                    finishRecordBeep();
                }
                // ответ сервера
                serverResponseTable.innerHTML += `<tr class="row-response"><td class="role">${botRole}: </td><td class="message">${message}</td></tr>`;
                document.documentElement.scrollTop = document.documentElement.scrollHeight;
            } else {
                console.error(data.detail);
            }
        })
        .catch(error => console.error(error));
}
