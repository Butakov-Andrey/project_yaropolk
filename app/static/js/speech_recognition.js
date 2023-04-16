import { finishRecordBeep, startRecordBeep } from './audio.js';
import { isSoundOn } from './home.js';


/* SETTINGS */
const userRequestDiv = document.getElementById('userRequest');
const serverResponseTable = document.getElementById('serverResponse');
const serverUrl = 'http://127.0.0.1:8080/api/v1/gpt/';
const userRole = `YOU`;
const botRole = `YAR`;
const listenMessage = "Слушаю...";
// voice commands
const start_commands = ["ярополк", "ярик"]
const send_commands = ["с богом", "аминь"]
const delete_commands = ["убери", "удали"]
// text recording and transcription, transcription settings
const recognition = new webkitSpeechRecognition();
recognition.lang = 'ru-RU';
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;


/* MAIN */
let fullTextFromUser = '';
let fullTextFromUserKeyBoard = '';

recognition.onresult = (event) => {
    // transcriber user voice in background
    const textFromUser = event.results[0][0].transcript.toLowerCase();

    const anyStartCommand = start_commands.some(value => textFromUser.includes(value));
    const anySendCommand = send_commands.some(value => textFromUser.includes(value));
    const anyDeleteCommand = delete_commands.some(value => textFromUser.includes(value));

    // update fullTextFromUser if new text from keyboard
    userRequestDiv.addEventListener('keyup', function () {
        const updatedFromKeyboardText = userRequestDiv.value;
        fullTextFromUserKeyBoard = updatedFromKeyboardText;
    });

    if (anyStartCommand) {
        // add space to fullTextFromUser, save transcribed voice
        fullTextFromUser = ' ';
        // clear textarea from inputform
        userRequestDiv.value = `${fullTextFromUser}`;
        if (isSoundOn === "on") {
            startRecordBeep();
        } else {
            // indicate, that saving transcribed voice is starting
            console.log(listenMessage);
        }
    } else if (anySendCommand && fullTextFromUser) {
        // send fullTextFromUser to server
        sendText(userRequestDiv.value);
        // clear inputform and variables so that following transcribed voice is not saved
        fullTextFromUser = '';
        fullTextFromUserKeyBoard = '';
    } else if (anyDeleteCommand && fullTextFromUser) {
        // clear inputform and variables so that following transcribed voice is not saved
        fullTextFromUser = '';
        fullTextFromUserKeyBoard = '';
        userRequestDiv.value = `${fullTextFromUser}`;
    } else {
        // if no commands, record user voice
        if (fullTextFromUser) {
            userRequestDiv.value += `${textFromUser}. `;
        } else if (fullTextFromUserKeyBoard) {
            userRequestDiv.value = `${fullTextFromUserKeyBoard}`;
        }
    }
};
// listen to user
recognition.onend = () => {
    recognition.start();
};
recognition.start();

// send message to server
export function sendText(fullMessage) {
    // clear instructions div
    if (document.getElementById("instructDiv")) {
        document.getElementById("instructDiv").outerHTML = "";
    }
    // message from user
    serverResponseTable.innerHTML += `<tr><td class="role">${userRole}: </td><td class="message">${fullMessage}</td></tr>`;
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
    const requestBodyJson = JSON.stringify({ message: fullMessage });
    // clear inputform and variables so that following transcribed voice is not saved
    fullTextFromUser = '';
    fullTextFromUserKeyBoard = '';
    userRequestDiv.value = `${fullTextFromUser}`;
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBodyJson
    })
        // handle response
        .then(processChunkedResponse)
        .catch(onChunkedResponseError);

    function processChunkedResponse(response) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        serverResponseTable.innerHTML += `<tr class="row-response"><td class="role">${botRole}: </td><td class="message"></td></tr>`;
        let rowCount = serverResponseTable.rows.length;
        var lastRow = serverResponseTable.rows[rowCount - 1];

        function read() {
            return reader.read().then(({ done, value }) => {
                if (done) {
                    if (isSoundOn === "on") {
                        finishRecordBeep();
                    }
                    // process the code in row
                    lastRow.lastElementChild.innerHTML = lastRow.lastElementChild.innerHTML.replace(/```(\w+)\n/g, "<br><b>$1</b>```\n");
                    lastRow.lastElementChild.innerHTML = lastRow.lastElementChild.innerHTML.replace(/```(.*?)```/gs, function (match, p1) {
                        return "<pre><code>" + p1.trim() + "</code></pre>";
                    });
                    lastRow.lastElementChild.innerHTML = lastRow.lastElementChild.innerHTML.replace(/`(.*?)`/gs, function (match, p1) {
                        return "<code>" + p1.trim() + "</code>";
                    });
                    return;
                }
                // decode chunk
                let chunk = decoder.decode(value);
                // add text to last row by chunk
                lastRow.lastElementChild.innerHTML += chunk;
                document.documentElement.scrollTop = document.documentElement.scrollHeight;
                // continue reading chunks
                return read();
            });
        }
        return read();
    }
    function onChunkedResponseError(err) {
        console.error(err)
    }
}
