let canvas=document.getElementById('mycanvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let ctx=canvas.getContext('2d');

let entitys={
    "entity":{
        "properties":{
            "id":0,
            "maxhealth":100,
            "health":100
        },
        generation(){

        },
        draw(){

        },
        update(){

        }
    },
    "robot":{
        "properties":{
            "id":0,
            "maxhealth":100,
            "health":100,
        },
        generation(){

        },
        draw(){

        },
        update(){

        }
    }
}

function draw(){
    
}
function update(){
    
}

let framerate=60;
let startime=new Date()
let endtime=new Date()
function animationLoop(){
    endtime=new Date()
    if(endtime-startime>=1000/framerate){
        update()
        draw()
        startime=new Date()
    }
    requestAnimationFrame(animationLoop)
}