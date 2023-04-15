/* MAIN */
// start and finish sounds of speech recognition
const urlStartMp3 = 'static/js/audio/start_record.mp3';
export function startRecordBeep() {
    // start sound
    const beep = new Audio(urlStartMp3);
    beep.play();
}
const urlFinishMp3 = 'static/js/audio/finish_record.mp3';
export function finishRecordBeep() {
    // finish sound
    const beep = new Audio(urlFinishMp3);
    beep.play();
}
