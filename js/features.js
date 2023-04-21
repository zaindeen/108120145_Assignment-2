var URL = window.confirm('Greetings madam!\nClick OK to see github repo\nCancel to continue');
if(URL){
    window.open('https://github.com/zaindeen/108120145_Assignment-2');
}
tvshows_ep_drop = document.querySelectorAll('.dropdown');
tvshows_ep_drop.forEach(
    drop => {drop.addEventListener('click',onWClick)}
);
click = [0,0,0];
totalTime = [0,0,0];
let prev = [[0,0],[0,0],[0,0]];

// creating total time watched
const timeBox  = document.createElement('div');
const timeText = document.createElement('div');
const time  = document.createElement('div');

//class names
timeBox.classList.add('timeBox');
timeText.classList.add('text');
time.classList.add('total_time');
//values
timeText.innerHTML='Total Time Spent'
time.textContent = '0 days, 0 hours, 0 mins'
//appending
const container = document.querySelector('.container');
container.appendChild(timeBox);
timeBox.appendChild(timeText);
timeBox.appendChild(time);

// calculating total time
function compute(){
    var total = totalTime[0]+totalTime[1]+totalTime[2];
    var day = Math.floor(total/1440);
    total%=1440;
    var hour = Math.floor(total/60);
    total%=60;
    var min = Math.floor(total);
    time.innerHTML='';
    time.textContent= day+' days, '+hour+' hours, '+min+' mins';
}

function checkAll(event){
    const present = event.currentTarget;
    const showNum = present.id.split('_')[1];
    const seaNum = present.id.split('_')[3];    
    const cbox = document.getElementById('show_'+showNum+'_sea_'+seaNum);
    const eyeLabelImage = document.getElementById('label_'+cbox.id);
    const check_box_ep = document.querySelectorAll('.epsiode_box_'+showNum+'_'+seaNum);
    if(cbox.checked){
    eyeLabelImage.children[0].src = "images/eye-green.png";
    check_box_ep.forEach(
        check =>{
            if(check.dataset.watched !== "true"){
                check.dataset.watched = "true";
                greenAll(check);
                calTimeAll(check);
            }
        }
    );
    }
    else{
        eyeLabelImage.children[0].src = "images/eye-gray.png";
        check_box_ep.forEach(
            check =>{
                if(check.dataset.watched !== "false"){
                    check.dataset.watched = "false";
                    greenAll(check);
                    calTimeAll(check);
                }
            }
        ); 
    }
}

function calTime(event){
    const element = event.currentTarget;
    const showNum = element.classList[1].split('_')[2];
    const seasonNum = element.id.split('_')[2];
    const epiNum = element.id.split('_')[3];
    if(element.dataset.watched == 'true')
        totalTime[showNum] += TV_SHOWS[showNum].seasons[seasonNum-1][epiNum].runtime;
    else
        totalTime[showNum] -= TV_SHOWS[showNum].seasons[seasonNum-1][epiNum].runtime;
    compute();
}

function calTimeAll(elementAll){
    const showNum = elementAll.classList[1].split('_')[2];
    const seasonNum = elementAll.id.split('_')[2];
    const epiNum = elementAll.id.split('_')[3];
    if(elementAll.dataset.watched == "true")
        totalTime[showNum] += TV_SHOWS[showNum].seasons[seasonNum-1][epiNum].runtime;
    else
        totalTime[showNum] -= TV_SHOWS[showNum].seasons[seasonNum-1][epiNum].runtime;
    compute();
}

function toggle(event){
    const ele = event.currentTarget;
    if(ele.dataset.watched === "false") ele.dataset.watched = "true";
    else ele.dataset.watched = "false";
}

function green(event){
    const ele = event.currentTarget;
    const backGreen = ele.children[0];
    const show = ele.classList[1].split('_')[2];
    const seasonNumber = ele.classList[1].split('_')[3];
    const episodeNumber = ele.id.split('_')[3];
    if(ele.dataset.watched === "true"){
        ele.children[0].children[0].classList.add('hidden');
        backGreen.classList.add('backGreen');
        backGreen.style.backgroundImage = `url("images/check.png"),linear-gradient(rgba(0, 255, 0, .5), rgba(0, 255, 0, .5)),url(${TV_SHOWS[show].seasons[seasonNumber-1][episodeNumber].image})`;
        backGreen.style.opacity = '0.8';
    }
    else{
        ele.children[0].children[0].classList.remove('hidden');
        backGreen.classList.remove('backGreen');
        backGreen.style.backgroundImage = '';
        backGreen.style.opacity = '1';
    }
}

function greenAll(elementAll){
    const backGreen = elementAll.children[0];
    const show = elementAll.classList[1].split('_')[2];
    const seasonNumber = elementAll.classList[1].split('_')[3];
    const episodeNumber = elementAll.id.split('_')[3];
    if(elementAll.dataset.watched === "true"){
        elementAll.children[0].children[0].classList.add('hidden');
        backGreen.classList.add('backGreen');
        backGreen.style.backgroundImage = `url("images/check.png"),linear-gradient(rgba(0, 255, 0, .5), rgba(0, 255, 0, .5)),url(${TV_SHOWS[show].seasons[seasonNumber-1][episodeNumber].image})`;
        backGreen.style.opacity = '0.8';
    }
    else{
        elementAll.children[0].children[0].classList.remove('hidden');
        backGreen.classList.remove('backGreen');
        backGreen.style.backgroundImage = '';
        backGreen.style.opacity = '1';
    }
}