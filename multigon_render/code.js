"use strict";
let canvas=document.getElementById("myCanvas");
canvas.width=window.innerWidth/2;
canvas.height=window.innerHeight;
let ctx=canvas.getContext("2d");

let points=1;
let distance=canvas.width/2-30
if(canvas.height<canvas.width){
    distance=canvas.height/2-30
}
function drawMultiGon(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    let previous;
    let start;
    let current;
    for(let i=0;i<points;i++){
        let angle=(Math.PI*2*i)/points;
        current=[Math.sin(angle)*-distance,Math.cos(angle)*-distance];
        if(i==0){
            previous=current;
            start=current;
        }
        ctx.beginPath();
        ctx.moveTo(previous[0]+canvas.width/2,previous[1]+canvas.height/2);
        ctx.lineTo(current[0]+canvas.width/2,current[1]+canvas.height/2);
        ctx.strokeStyle = `rgb(255,0,0)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        previous=current;
    }
    ctx.beginPath();
    ctx.moveTo(start[0]+canvas.width/2,start[1]+canvas.height/2);
    ctx.lineTo(current[0]+canvas.width/2,current[1]+canvas.height/2);
    ctx.strokeStyle = `rgb(255,0,0)`;
    ctx.lineWidth = 2;
    ctx.stroke();
}
setInterval(()=>{
    points+=0.05;
    drawMultiGon()
},20)