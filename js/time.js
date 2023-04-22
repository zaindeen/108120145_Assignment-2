totalTime = [0,0,0];


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