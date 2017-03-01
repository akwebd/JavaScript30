const leftText = document.querySelector('.display__time-left');
const endText = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
const inputField = document.querySelector('.timer__controls input');
const title = document.querySelector('title');
let counter;


function timer(timeSec){
    //clear previous timers
    clearInterval(counter);
    
    const endTime = Date.now() + timeSec * 1000;
    
    //show intilial time
    displayEnd(endTime);
    updateRemainig(timeSec);
    
    counter = setInterval(() => {
        const remainingTime = Math.round((endTime - Date.now())/1000);
        
        //reset when time elapses
        if (remainingTime < 0)
            clearInterval(counter);
        
        //update remaining
        updateRemainig(remainingTime);
    },1000);
}

function displayEnd(endTime){
    const time = new Date(endTime);
    const timeText = `Be Back At ${time.getHours()}:${time.getMinutes()}`;
    endText.innerHTML = timeText;
    
}

function updateRemainig(leftTime){
    const remaining = `${Math.floor(leftTime/60)}:${("0"+leftTime%60).slice(-2)}`;    
    leftText.innerHTML = remaining;
    title.innerHTML = remaining;
}

buttons.forEach(button => button.addEventListener('click', (e) => timer(e.target.dataset.time)));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    timer(this.minutes.value * 60);
    this.reset();
});