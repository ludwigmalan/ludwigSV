"use strict";
let canvas=document.getElementById("myCanvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let ctx=canvas.getContext("2d");
let pixelSize=8;
let mouseX=0;
let mouseY=0;
let click=false;

function createMap(){
    let map=[];
    for(let i=0;i<=Math.round(canvas.width/pixelSize);i++){
        let temp=[];
        for(let j=0;j<=Math.round(canvas.height/pixelSize);j++){
            temp.push(0)
        }
        map.push(temp)
    }
    return map;
}
let map=createMap();

let transferF=0.2;
let maxtemp=1000;
let transferC=0.5
let dis=40;
function update2(){
    for(let i=0;i<=map.length-1;i++){
        for(let j=0;j<=map[i].length-1;j++){
            if(Math.sqrt((i*pixelSize-mouseX)**2+(j*pixelSize-mouseY)**2)<dis){
                if(click){
                    map[i][j]=maxtemp;
                }
            }
            if(j==0){
                //map[i][j-1]=0.0001;
            }
            if(map[i][j]<0.0001 || isNaN(map[i][j])){
                map[i][j]=0.0001;
            }
            if(map[i][j]>maxtemp){
                map[i][j]=maxtemp
            }
            try{
                    let v=0;
                    if(Math.random()>0.5){
                        let ii=(Math.round(Math.random()*2-1));
                        v=(map[i][j]-map[i+ii][j])*transferF;
                        map[i+ii][j]+=v;
                    }else{
                        let jj=(Math.round(Math.random()*2-1));
                        v=(map[i][j]-map[i][j+jj])*transferF;
                        map[i][j+jj]+=v;
                    }
                    map[i][j]-=v;
                if(map[i][j-1]<map[i][j] && Math.random()<transferC){
                    let temp=map[i][j];
                    map[i][j]=map[i][j-1];
                    map[i][j-1]=temp;
                }
            }catch(err){
                //console.log(err)
            }
        }
    }
}
function draw(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<=map.length-1;i++){
        for(let j=0;j<=map[i].length-1;j++){
            ctx.fillStyle=`hsl(${(330/maxtemp)*map[i][j]},80%,50%)`;
            ctx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
        }
    }
}
let framerate=120;
setInterval(()=>{
    update2();
    draw();
},1000/framerate)

window.addEventListener('mousemove',(event)=>{
    mouseX=event.offsetX;
    mouseY=event.offsetY;
})
window.addEventListener("click",()=>{
    click=!click;
})