// Select the HTML elements
const startBtn = document.getElementById('start-recording-btn');
const sendBtn = document.getElementById('send-recording-btn');
const responseDiv = document.getElementById('response');

// Initialize variables
let chunks = [];
let mediaRecorder;

startBtn.disabled = false;
sendBtn.disabled = true;

// Event listener for start recording button
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);

        startBtn.addEventListener('click', () => {
            mediaRecorder.start();

            startBtn.disabled = true;
            sendBtn.disabled = false;
        });

        mediaRecorder.addEventListener('dataavailable', event => {
            chunks.push(event.data);
            console.log("new audio data chunk(chunks):", event.data);
        });

        sendBtn.addEventListener('click', () => {
            mediaRecorder.stop();

            startBtn.disabled = false;
            sendBtn.disabled = true;
        });

        mediaRecorder.addEventListener("stop", () => {
            console.log("new audio data chunk(chunks):", chunks);
            const audioBlob = new Blob(chunks, { type: 'audio/mp4' });
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.mp4');

            sendVoice(formData);

            chunks = [];
        });
    })
    .catch(error => console.error(error));

function sendVoice(formData) {
    fetch('http://127.0.0.1:8080/audio/', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Extract the message value from the response
            const message = data.message;

            // Set the message as the inner HTML of the responseDiv
            responseDiv.innerHTML = message;
        })
        .catch(error => console.error(error));
}

const recognition = new webkitSpeechRecognition();
recognition.lang = 'ru-RU';
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 2;

recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.toLowerCase();
    if (text.includes('ярополк')) {
        console.log('ЯРОПОЛК');
        document.getElementById('speech-response').innerHTML = 'ЯРОПОЛК';
    } else if (text.includes('с богом')) {
        console.log('БОГ');
        document.getElementById('speech-response').innerHTML = 'БОГ';
    } else {
        console.log(`You said: ${text}`);
        document.getElementById('speech-response').innerHTML = `You said: ${text}`;
    }
};

recognition.onend = () => {
    recognition.start();
};

recognition.start();


//
// голосовая отправка на сервер
//
// Select the HTML elements
const responseDiv = document.getElementById('response');

// Initialize variables
let chunks = [];
let mediaRecorder;

// Start the speech recognition
const recognition = new webkitSpeechRecognition();
recognition.lang = 'ru-RU';
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Start the media recording
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript.toLowerCase();
            console.log(`You said: ${text}`);

            if (text.includes('ярополк')) {
                console.log('ТЫ ВЫЗВАЛ ЯРОПОЛКА');
                mediaRecorder.start();
            } else if (text.includes('с богом')) {
                console.log('ТЫ НАПРАВИЛ ОБРАЩЕНИЕ К ЯРОПОЛКУ');
                mediaRecorder.stop();
            }
        };

        recognition.onend = () => {
            recognition.start();
        };

        recognition.start();

        mediaRecorder.addEventListener('dataavailable', event => {
            chunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
            console.log('Recording stopped');
            const audioBlob = new Blob(chunks, { type: 'audio/mp4' });
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.mp4');

            sendVoice(formData);

            chunks = [];
        });
    })
    .catch(error => console.error(error));

function sendVoice(formData) {
    fetch('http://127.0.0.1:8080/audio/', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Extract the message value from the response
            const message = data.message;

            // Set the message as the inner HTML of the responseDiv
            responseDiv.innerHTML = message;
        })
        .catch(error => console.error(error));
}
