"use strict";
let canvas=document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let ctx=canvas.getContext("2d")

let player={
    "x":200,
    "y":200,
    "vy":0,
    "vx":0,
    "maxhealth":200,
    "health":200,
    "maxcharge":300,
    "charge":300,
    "minbulletcharge":10,
    "maxbulletcharge":100,
}

let framerate=100;

setInterval(()=>{

},1000/framerate)