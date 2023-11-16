"use strict";
let canvas=document.getElementById("myCanvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let ctx=canvas.getContext("2d");

let modes = ["main menu", "characters", "worlds", "settings"];
let mode = "main menu";

let mousepos=[0,0];
let mousebut=[false,false,false];

let blockSize=35;

function copyOBJ(obj){
    return JSON.parse(JSON.stringify(obj))
}

let functions={
    "checkCollisionBP":(x,y,blockSize,character,world)=>{
        if( world.pos[0]*blockSize + character.hitbox[0]*blockSize >= x*blockSize && world.pos[0]*blockSize <= x*blockSize+blockSize && world.pos[1]*blockSize + character.hitbox[1]*blockSize >= y*blockSize && world.pos[1]*blockSize <= y*blockSize+blockSize){
            return true
        }else{
            return false
        }
    }
}

function createuniverse(){
    let universe={
        "dimension":"0",
        "seed":"r687w6er87we7r",
        "validpos":[0,0],
        "pos":[0,0],
        "drawpos":[0,0],
        "movepos":[0,0],
        "0":{
            "blocks":{

            },
            "entities":{
                
            }
        }
    }
    return JSON.parse(JSON.stringify(universe));
}

let inworld=false;
let worlds={
    "world0":createuniverse()
};
import {assets} from "./assets/functions.js";
let world;
let character=JSON.parse(JSON.stringify(assets.characters.default))

function updategame(){
    ctx.fillStyle='rgb(0,100,200)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    let sx=Math.floor(world.pos[0]-(canvas.width/blockSize)/2-2);
    let ex=Math.floor(world.pos[0]+(canvas.width/blockSize)/2+2);
    let sy=Math.floor(world.pos[1]-(canvas.height/blockSize)/2-2);
    let ey=Math.floor(world.pos[1]+(canvas.height/blockSize)/2+2);
    for(let a=sx;a<=ex;a++){
        for(let b=sy;b<=ey;b++){
            if(!world[`${world.dimension}`].blocks[`${a}#${b}#0`]){
                if(Math.random()>0.8){
                    world[`${world.dimension}`].blocks[`${a}#${b}#0`]=copyOBJ(assets.physical.blocks.dirt)
                    world[`${world.dimension}`].blocks[`${a}#${b}#1`]=copyOBJ(assets.physical.blocks.dirt)
                }else{
                    world[`${world.dimension}`].blocks[`${a}#${b}#0`]=copyOBJ(assets.physical.blocks.air)
                    world[`${world.dimension}`].blocks[`${a}#${b}#1`]=copyOBJ(assets.physical.blocks.air)
                }
            }
            assets.functions.blocks.update[world[`${world.dimension}`].blocks[`${a}#${b}#0`].name](world,character,a,b,0,ctx,blockSize,canvas,functions);
            assets.functions.blocks.update[world[`${world.dimension}`].blocks[`${a}#${b}#0`].name](world,character,a,b,1,ctx,blockSize,canvas,functions);
        }
    }
    ctx.fillStyle='rgb(255,0,0)';
    ctx.fillRect(canvas.width/2-character.hitbox[0]*blockSize/2,canvas.height/2-character.hitbox[1]*blockSize/2,character.hitbox[0]*blockSize,character.hitbox[1]*blockSize);
    world.validpos=[...world.pos]
    world.drawpos=[...world.pos]
}

function update(){
    if (mode == "main menu"){
        ctx.fillStyle='rgb(95, 197, 222)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        let startHeight = canvas.height*0.1;
        let startWidth = canvas.width*0.15;
        let optionHeight = canvas.height*0.8/(modes.length-1);
        let optionWidth = canvas.width*0.7;
        for (let m in modes){
            if (m != 0){
                ctx.fillStyle="rgb(50, 50, 50)";
                ctx.fillRect(startWidth, startHeight, optionWidth, optionHeight-5);
                let border = optionHeight/16;
                ctx.fillStyle="rgb(100, 100, 100)";
                if (mousepos[0] > startWidth && mousepos[0] < startWidth+optionWidth){
                    if (mousepos[1] > startHeight && mousepos[1] < startHeight+optionHeight){
                        ctx.fillStyle="rgb(120,120,120)";
                        if (mousebut[0]){
                            mode = modes[m];
                            mousebut=[false,false,false]
                        }
                    }
                }
                ctx.fillRect(startWidth+border, startHeight+border, optionWidth-border*2, optionHeight-5-border*2);
                ctx.font=`${optionHeight/2}px Arial`;
                ctx.fillStyle="rgb(200, 200, 200)";
                ctx.fillText(modes[m],startWidth+(optionWidth-ctx.measureText(modes[m]).width)/2, startHeight+optionHeight*5/8);
                startHeight += optionHeight;
            }
        }
    }
    if(mode == "worlds"){
        if(inworld){
            updategame()
        }else{
            let border_width=canvas.height/32;
            let option_border=border_width/2;
            let optionHeight = (canvas.height-border_width)*0.8/4;
            let y=border_width+optionHeight+optionHeight/5;
            let font_size=1.3;
            ctx.fillStyle='rgb(200, 200, 200)';
            ctx.fillRect(border_width,border_width,canvas.width-border_width*2,canvas.height-border_width*2);
            for (let key in worlds) {
                ctx.fillStyle='rgb(50, 50, 50)';
                if (mousepos[0] > border_width+option_border && mousepos[0] < border_width+option_border+canvas.width-border_width*2-option_border*2){
                    if (mousepos[1] > y+option_border && mousepos[1] < y+option_border+optionHeight-option_border*2){
                        ctx.fillStyle="rgb(26, 163, 109)";
                        if (mousebut[0]){
                            mousebut=[false,false,false]
                            world=worlds[key];
                            inworld=true;
                        }
                    }
                }
                ctx.fillRect(border_width,y,canvas.width-border_width*2,optionHeight);
                ctx.fillStyle='rgb(135, 206, 235)';
                ctx.fillRect(border_width+option_border,y+option_border,canvas.width-border_width*2-option_border*2,optionHeight-option_border*2);
                ctx.font=`${optionHeight/font_size}px Arial`;
                ctx.fillStyle="rgb(20,20,20)";
                ctx.fillText(key,border_width+option_border+(canvas.width-border_width*2-option_border*2-ctx.measureText(key).width)/2, y+optionHeight*(font_size*2+1)/(font_size*4));
                y+=optionHeight
            }

            //create world
            let key="create world"
            ctx.fillStyle='rgb(50, 50, 50)';
            if (mousepos[0] > border_width+option_border && mousepos[0] < border_width+option_border+canvas.width-border_width*2-option_border*2){
                if (mousepos[1] > border_width+option_border && mousepos[1] < border_width+option_border+optionHeight-option_border*2){
                    ctx.fillStyle="rgb(135, 206, 235)";
                }
            }
            ctx.fillRect(border_width,border_width,canvas.width-border_width*2,optionHeight);
            ctx.fillStyle='rgb(50,50,50)';
            ctx.fillRect(border_width+option_border,border_width+option_border,canvas.width-border_width*2-option_border*2,optionHeight-option_border*2);
            ctx.font=`${optionHeight/font_size}px Arial`;
            ctx.fillStyle="rgb(135, 206, 235)";
            ctx.fillText(key,border_width+option_border+(canvas.width-border_width*2-option_border*2-ctx.measureText(key).width)/2, border_width+optionHeight*(font_size*2+1)/(font_size*4));

            
            ctx.lineWidth = `${border_width*2}`;
            ctx.strokeStyle = "rgb(100, 100, 100)";
            ctx.beginPath();
            ctx.rect(0,0,canvas.width,canvas.height);
            ctx.stroke();
        }
    }
}

let fps=60;
let time=new Date();
function animate(){
    if(new Date()-time>1000/fps){
        if(canvas.height!=window.innerHeight || canvas.width!=window.innerWidth){
            canvas=document.getElementById("myCanvas");
            canvas.width=window.innerWidth;
            canvas.height=window.innerHeight;
            ctx=canvas.getContext("2d");
        }
        update()
        time=new Date()
    }
    requestAnimationFrame(animate)
}
animate()

window.addEventListener("mousemove",(event)=>{
    mousepos[0]=event.offsetX
    mousepos[1]=event.offsetY
})
window.addEventListener("mousedown",(event)=>{
    mousebut[event.button]=true
    console.log(mousebut)
})
window.addEventListener("mouseup",(event)=>{
    mousebut[event.button]=false
    console.log(mousebut)
})

document.addEventListener('contextmenu', event => {
    event.preventDefault();
});
window.addEventListener("keydown",(event)=>{
    console.log(event.keyCode)
    if(event.keyCode==87){
        //move up
        world.pos[1]-=character.speed
    }
    if(event.keyCode==83){
        //move up
        world.pos[1]+=character.speed
    }
    if(event.keyCode==65){
        //move up
        world.pos[0]-=character.speed
    }
    if(event.keyCode==68){
        //move up
        world.pos[0]+=character.speed
    }
})