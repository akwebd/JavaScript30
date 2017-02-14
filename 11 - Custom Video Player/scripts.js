//load all elements
//const playPB = document.querySelector('button.player__button');
//const video = document.querySelector('video.player__video');
//const progress = document.querySelector('.progress__filled');
//const progressParent = progress.parentNode;
//const playerSliders = document.querySelectorAll('.player__slider');
//const skipButtons = document.querySelectorAll('.player__button');

////start video with play toggle button
//function playPause(video){
//    video[video.paused?'play':'pause']();
//    if(video.paused) playPB.innerHTML = '&#9658;';
//    else playPB.innerHTML = '&#10074; &#10074;';
//    console.dir(video);
//}
//playPB.addEventListener('click', () => playPause(video));
//video.addEventListener('click', () => playPause(video));
//
////playback progress indication and control
//progressParent.addEventListener('mousedown', () => progressBar = true);
//progressParent.parentNode.addEventListener('mousemove', (e) => {
//    if(progressBar){
//        //need to calculate mouse coordinates relative to divs' size
//        const x = e;
//        console.log(x);
//        console.log(this);}
//});
//progressParent.parentNode.addEventListener('mouseup', () => progressBar = false);
//progressParent.parentNode.addEventListener('mouseout', () => progressBar = false);
//
//setInterval(updateProgress, 100);
//function updateProgress(){
//progress.style.flexBasis = `${video.currentTime/video.duration * 100}%`;}
//
////slider control
////when video loads, slider values should be reset
//playerSliders.forEach(slider => slider.value = video[slider.name]);
//playerSliders.forEach(slider => slider.addEventListener('input', () => {
//    video[slider.name] = slider.value;
//}));
//
////forward/rewind control
//skipButtons.forEach(button => button.addEventListener('click', () => {
//    video.currentTime += parseFloat(button.dataset.skip);
//    updateProgress;
//}));
//
//function fwrRwd(){    
//    video.currentTime += parseFloat(button.dataset.skip);
//    updateProgress;
//}
//
//Above is code before realizing that video element has handy events
//All variables
const playPB = document.querySelector('.toggle');
const video = document.querySelector('video');
const progressSlide = document.querySelector('div.progress:not(.progress__filled)');
const progress = document.querySelector('.progress__filled');
const sliders = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('.player__button:not(.toggle)');

//when video loads, slider values should be reset
sliders.forEach(slider => slider.value = video[slider.name]);

//All function
//Video control from pushbuttons
function togglePlay(){
    const action = video.paused?'play':'pause';
    video[action]();
}

//Update play/pause PB icon
function updatePB(){
    const icon = video.paused?'&#9658;':'&#10074; &#10074;';
    playPB.innerHTML = icon;
}

//Update progress bar
function updateProgress(){
    progress.style.flexBasis = `${video.currentTime/video.duration * 100}%`;
}

//Change playback rate or volume
function updateSliders(){
    video[this.name] = this.value;
}

//Forward or rewind
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
    console.dir(this);
}

//Progress slider
function slide(e){
//    console.dir(progressSlide);
    video.currentTime = parseFloat((e.offsetX / progressSlide.offsetWidth) * video.duration);    
}

//All events
//when play/pause or video frame is clicked
playPB.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
//when played/paused PB icon should be updated
video.addEventListener('play', updatePB);
video.addEventListener('pause', updatePB);
//progress bar should be updated to match playback position
video.addEventListener('loadeddata', updateProgress);
video.addEventListener('timeupdate', updateProgress);
//sliders to control volume and playbackSpeed
sliders.forEach(slider => slider.addEventListener('input', updateSliders));
//skip buttorn for forward/rewind
skipButtons.forEach(btn => btn.addEventListener('click', skip));
//progress slider control
let active = false;
progressSlide.addEventListener('click', (e) => slide(e));
progressSlide.addEventListener('mousedown', (e) => active = true);
progressSlide.addEventListener('mousemove', (e) => active && slide(e));
progressSlide.addEventListener('mouseup', () => active = false);