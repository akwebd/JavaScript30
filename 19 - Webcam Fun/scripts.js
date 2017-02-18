const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
let colorFilter = {x:100, y:100, change: false};

function startCam(){
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
        .then (mediaStream => {
            video.srcObject = mediaStream;
            video.play();})
        .catch(err => {console.log('Problem with video input', err);})
}

function drawCanvas(){
    const [width, height] = [video.videoWidth, video.videoHeight];
    [canvas.width, canvas.height] = [width, height];
    setInterval(()=>{
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = threshold(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 1);
    
}

function redEffect(pixls){
    for(let i=0; i<pixls.data.length; i+=4){
        pixls.data[i+0] += 100;
        pixls.data[i+1] -= 100;
        pixls.data[i+2] *= 10;        
    }
    return pixls;
}

function threshold(pixls){
    const colorInd = colorFilter.x + colorFilter.y*4;
    const filter = average([ pixls.data[colorInd + 0],
                            pixls.data[colorInd + 1],
                            pixls.data[colorInd + 2]]);
    if(colorFilter.change){
        for(let i=0; i<pixls.data.length; i+=4){
            if(average([pixls.data[i+0],
                        pixls.data[i+1],
                        pixls.data[i+2]]) > filter){pixls.data[i+3] = 0;};        
        }
    }
    return pixls;        
}

function average(colors){
    return colors.reduce((total, color) =>{return total+color/3}, 0);
}

function takePhoto(){
    const urlPhoto = canvas.toDataURL('image/jpeg', 1.0);
    const link = document.createElement('A');
    link.href = urlPhoto;
    link.setAttribute('download', 'AKimg'); 
    link.innerHTML=`<img src=${urlPhoto} alt="urlPhoto">`;
    strip.insertBefore(link, strip.firstChild);
}

startCam();
video.addEventListener('canplay', drawCanvas);
canvas.addEventListener('click', (e)=>{
    e.preventDefault();
    colorFilter.x = e.offsetX;
    colorFilter.y = e.offsetY;    
    colorFilter.change = !colorFilter.change;    
});
