// звук начала и конца записи расшифрованного текста
const urlStartMp3 = 'static/js/audio/start_record.mp3';
export function startRecordBeep() {
    // звук начала записи
    const beep = new Audio(urlStartMp3);
    beep.play();
}
const urlFinishMp3 = 'static/js/audio/finish_record.mp3';
export function finishRecordBeep() {
    // звук конца записи
    const beep = new Audio(urlFinishMp3);
    beep.play();
}
