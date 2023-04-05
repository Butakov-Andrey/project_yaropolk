// Select the HTML elements
const startBtn = document.getElementById('start-recording-btn');
const stopBtn = document.getElementById('stop-recording-btn');
const sendBtn = document.getElementById('send-audio-btn');
const responseDiv = document.getElementById('response');

// Initialize variables
let chunks = [];
let mediaRecorder;

// Disable the send button when the page loads
sendBtn.disabled = true;

// Event listener for start recording button
startBtn.addEventListener('click', () => {
    // Request access to the microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            // Create a MediaRecorder instance
            mediaRecorder = new MediaRecorder(stream);

            // Start recording
            mediaRecorder.start();

            // Add data to chunks array on data available
            mediaRecorder.addEventListener('dataavailable', event => {
                chunks.push(event.data);
            });
        })
        .catch(error => console.error(error));
});

// Event listener for stop recording button
stopBtn.addEventListener('click', () => {
    // Stop recording
    mediaRecorder.stop();

    // Enable the send button after the recording has ended
    sendBtn.disabled = false;
});


// Event listener for send audio button
sendBtn.addEventListener('click', () => {
    // Create a Blob from the recorded audio chunks
    const audioBlob = new Blob(chunks, { type: 'audio/mp4' });

    // Create a FormData object and append the audio file to it
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.mp4');

    // Send the audio file to the server via an API using the Fetch API
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
});
