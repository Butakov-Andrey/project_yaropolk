import { sendText } from './speech_recognition.js';


/* SETTINGS */
const userRequestDiv = document.getElementById('userRequest');


/* MAIN */
// кнопка для включения звука
// (политика chrome не позволяет воспроизводить аудио без пользовательских действий)
export let isSoundOn = 'off';
let soundSwitch = document.getElementById("soundSwitch");
soundSwitch.addEventListener("click", function () {
    if (isSoundOn === "off") {
        isSoundOn = "on";
    } else {
        isSoundOn = "off";
    }
});

// отправка текста на сервер по нажатию кнопки
let sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", function () {
    sendText(userRequestDiv.value);
    document.getElementById("listenDiv").innerHTML = '';
});
