import { deleteContext, sendText } from './speech_recognition.js';


/* SETTINGS */
const userRequestDiv = document.getElementById('userRequest');


/* MAIN */
// sound toggler
// (chrome policy prevents audio playback without user action)
export let isSoundOn = 'off';
let soundSwitch = document.getElementById("soundSwitch");
soundSwitch.addEventListener("click", function () {
    if (isSoundOn === "off") {
        isSoundOn = "on";
    } else {
        isSoundOn = "off";
    }
});

// send transcribed voice to server
let sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", function () {
    sendText(userRequestDiv.value);
});

// delete context
let deleteContextBtn = document.getElementById("deleteContextBtn");
deleteContextBtn.addEventListener("click", deleteContext);
