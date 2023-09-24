let canvas=document.getElementById("myCanvas1");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let ctx=canvas.getContext("2d");
let audioSource;
let analyzer;
let files;
let audio;
let audioCTX;
let bufferArray;
let bufferLength;
const file=document.getElementById("file-input")
const fileName=document.getElementById("name")
let filesURL=localStorage.getItem("save")

let butL=document.getElementById("but1");
let butR=document.getElementById("but2");
let findBut=document.getElementById("find");
let findInput=document.getElementById("find-input");

let didcreate=false
audio=document.getElementById("audio1")
audio.load()
window.addEventListener('click',()=>{
if(!didcreate){
audioCTX = new AudioContext();
audioSource=audioCTX.createMediaElementSource(audio);
analyzer=audioCTX.createAnalyser()
audioSource.connect(analyzer)
analyzer.connect(audioCTX.destination)
analyzer.fftSize=1024;
bufferLength=analyzer.frequencyBinCount;
bufferArray=new Uint8Array(bufferLength)
analyzer.fftSize=Math.round(analyzer.fftSize*2);
didcreate=true
}
})
let candraw=false;

file.addEventListener('change',()=>{
    files=file.files;
    audio.src=URL.createObjectURL(files[0])
    fileName.innerText=files[0].name;
    audio.play()
})

let numFile=0;
let paused=false;
function resetFile(){
    audio.src=URL.createObjectURL(files[numFile])
        fileName.innerText=files[numFile].name;
        audio.play()
}
window.addEventListener('keydown',(event)=>{
    console.log(event.keyCode)
    if(event.keyCode==65){
        numFile-=1
        if(numFile<0){
            numFile=file.files.length-1
        }
    }
    if(event.keyCode==68){
        numFile+=1
        if(numFile>file.files.length-1){
            numFile=0
        }
    }
    if(event.keyCode==68 || event.keyCode==65){
        resetFile()
    }
    if(event.keyCode==32){
        paused=!paused
    }
    if(paused){
        audio.pause()
    }else{
        audio.play() 
    }
})
butL.addEventListener('click',()=>{
    numFile-=1
    if(numFile<0){
        numFile=file.files.length-1
    }
    resetFile()
})
butR.addEventListener('click',()=>{
    numFile+=1
    if(numFile>file.files.length-1){
        numFile=0
    }
    resetFile()
})

let middely=canvas.height/2
let scale=1;
if(canvas.width<canvas.height){
    scale=0.8
    document.getElementById("select-song").style.visibility="visible"
}
let middelx=canvas.width/2
//K%*Hbq6feA~FsZT
function draw(arr){
    let Fscale=1/scale;
    let maxcicle=170/Fscale;
    let mincircle=50/Fscale;
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle="lightblue"
    let arrLength=arr.length
    for(let i=0;i<arr.length;i++){
        ctx.strokeStyle=`hsl(${(330/300)*arr[i]},80%,50%)`
        ctx.beginPath();
        ctx.moveTo(middelx,middely);
        let angle=((Math.PI*2)*i/arrLength)
        let d=maxcicle+arr[i]/(2*Fscale)
        ctx.lineTo(middelx+(Math.sin(angle)*d),middely+(Math.cos(angle)*d));
        ctx.lineWidth = (maxcicle*2*Math.PI)/arrLength;
        ctx.stroke();
    }
    ctx.lineWidth=1/Fscale;
    ctx.beginPath()
    ctx.arc(middelx,middely,maxcicle,0,Math.PI*2)
    ctx.fill()
    ctx.stroke()
    for(let i=0;i<arr.length;i++){
        ctx.strokeStyle=`hsl(${(330/300)*arr[i]},80%,50%)`
        ctx.beginPath()
        ctx.arc(middelx,middely,mincircle+((maxcicle-mincircle)/300)*arr[i],0,Math.PI*2)
        ctx.stroke()
    }
    ctx.beginPath()
    ctx.fillStyle=`hsl(${(330/300)*arr[0]},80%,50%)`
    ctx.arc(middelx,middely,mincircle,0,Math.PI*2)
    ctx.fill()
}
draw([0,0,0,0,0,0])
function animate(){
    if(didcreate){
        analyzer.getByteFrequencyData(bufferArray)
        draw(bufferArray)
    }
    requestAnimationFrame(animate)
}
animate()

findBut.addEventListener('click',()=>{
    if(findInput.value.length>0){
        let keywords=findInput.value.toUpperCase().split(" ");
        let score=0;
        let findFile=0;
        for(let i=0;i<files.length;i++){
            let fileNameSearch=files[i].name.toUpperCase()
            let thisScore=0
            for(let j=0;j<keywords.length;j++){
                if(fileNameSearch.indexOf(keywords[j])>0){
                    thisScore+=1
                }
            }
            if(thisScore>score){
                score=thisScore
                findFile=i
            }
            console.log(fileNameSearch)
        }
        numFile=findFile
        resetFile()
    }
})