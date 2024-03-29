const deg = 6;
const hr = document.querySelector('#hr');
const minu = document.querySelector('#minu');
const second = document.querySelector('#second');

const setAlramBtn = document.querySelector("button");

Alram = document.querySelector(".alram")

let alarmTime, isAlarmSet;
let ringtone = new Audio("Files/ringtone.mp3");

setInterval(() => {

    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

    hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    minu.style.transform = `rotateZ(${(mm)}deg)`;
    second.style.transform = `rotateZ(${ss}deg)`;

    let meridim = "AM"
    let h = day.getHours();
    let m = day.getMinutes();
    let s = day.getSeconds();

    if(h >= 12) {
        h = h -12;
        meridim = "PM";
    }

    /* IF HOUR VALUE IS 0, SET THIS VALUE TO 12 */
    h = h==0 ? h=12:h;

    /* ADDING 0 BEFORE  HOUR, MINUTES, SECOND IF THIS VALUE IS LESS THAN 10 */
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    if(alarmTime == `${h}:${m} ${meridim}`) {
        ringtone.play();
        ringtone.loop = true;
    }

},1000)

const btn = document.querySelector('.btn');
btn.onmousemove = function (e) {
    const x = e.pageX - btn.offsetLeft;
    const y = e.pageY - btn.offsetTop;

    btn.style.setProperty('--x', x + 'px');
    btn.style.setProperty('--y', y + 'px');
}

const selectMenu = document.querySelectorAll('select');

for(let i=12;i>0;i--) {
    i = i<10 ?"0" +i :i;
    let option = `<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59;i>=0;i--) {
    i = i<10 ?"0" +i :i;
    let option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}


for(let i=2;i>0;i--) {
    let ampm = i == 1 ? "AM" : "PM"
    let option = `<option value="${ampm}">${ampm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}


function setAlarm() {

    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        Alram.classList.remove("disable");
        setAlramBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }


    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    console.log("click");

    if(time.includes("Hour") || time.includes("Minute") || time.includes("Meridiem")) {
        return alert("Please, select a valid time!");
    }
    alarmTime = time;
    isAlarmSet = true;
    Alram.classList.add("disable");
    
    setAlramBtn.innerText = "Clear Alarm";
}

setAlramBtn.addEventListener("click", setAlarm);
