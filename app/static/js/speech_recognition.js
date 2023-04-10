import { startRecordBeep } from './_audio.js';
import { sendText } from './_send_to_server.js';


/* SETTINGS */
const userRequestDiv = document.getElementById('userRequest');
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
        startRecordBeep();
    } else if (anySendCommand && fullTextFromUser) {
        // отправляем весть текст пользователя на сервер
        sendText(userRequestDiv.value);
        // очищаем переменную для всего текста полльзователя, чтобы не записывать следующие фразы
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
