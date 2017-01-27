//get all elements with 'key' class
var keys = document.querySelectorAll('.key');
var audios = document.querySelectorAll('audio');
var keyObj = {};
//group keys and sounds based on 'data-key' value
for (var i = 0; i < keys.length; i++)
    for (var ii = 0; ii < keys.length; ii++){
        var keyNum = keys[i].getAttribute('data-key');
        if(keyNum == keys[ii].getAttribute('data-key')){
            keyObj[keyNum] = {button: keys[i],
                             sound: audios[ii]};
            break;}
        }
    
//create event listener to capture 'keydown' 
document.addEventListener('keydown', function(event){
    var actvKey = event.which;
    if(actvKey in keyObj){
        keyObj[actvKey].button.classList.add('playing');
        keyObj[actvKey].sound.currentTime = 0;
        keyObj[actvKey].sound.play();
        event.preventDefault();}    
})

//create event listener to capture 'keyup' 
document.addEventListener('keyup', function(event){
    var actvKey = event.which;
    if(actvKey in keyObj){
        keyObj[actvKey].button.classList.remove('playing');
        event.preventDefault(); }   
})
