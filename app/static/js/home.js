import { sendText } from './_send_to_server.js';


/* SETTINGS */
const userRequestDiv = document.getElementById('userRequest');


/* MAIN */
// кнопка для скрытия элементов страницы
// (политика chrome не позволяет воспроизводить аудио без пользовательских действий)
// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("main").style.display = "none";
// });
// var hideBtn = document.getElementById("hide-btn");
// var divToHide = document.getElementById("main");
// hideBtn.addEventListener("click", function () {
//     divToHide.style.display = (divToHide.style.display == "none") ? "block" : "none";
// });

// отправка текста на сервер по нажатию кнопки
var sendBtn = document.getElementById("send-btn");
sendBtn.addEventListener("click", function () {
    sendText(userRequestDiv.value);
});
