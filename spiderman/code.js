let canvas=document.getElementById('myCanvas');
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
let ctx=canvas.getContext('2d');

let pos=[0,0]
let rope=[false,0,0,0,0,0]
let entitys=[[20,20,200,200],[400,20,200,200],[-1000,-100,10000,10]]
let velocity=[0,0]
let mousex=0;
let mousey=0;

let friction=0.98;
function update(){
    pos[0]+=velocity[0];
    pos[1]+=velocity[1];
    rope[1]+=rope[3];
    rope[2]+=rope[4];
    pos[1]+=velocity[1];
    let didCling=false;
    for(let i=0;i<entitys.length;i++){
        if(pos[0]>entitys[i][0] && pos[0]<entitys[i][0]+entitys[i][2] && pos[1]>entitys[i][1] && pos[1]<entitys[i][1]+entitys[i][3]){
            //velocity[0]*=-1;
            //velocity[1]*=-1;
        }
        if(rope[1]>entitys[i][0] && rope[1]<entitys[i][0]+entitys[i][2] && rope[2]>entitys[i][1] && rope[2]<entitys[i][1]+entitys[i][3]){
            rope[3]=0;
            rope[4]=0;
            didCling=true;
        }
    }
    if(!didCling){
        rope[5]=Math.sqrt((pos[0]-rope[1])**2+(pos[1]-rope[2])**2)
    }
    if(rope[3]==0 && rope[4]==0 && rope[0]){
        let fx=(pos[0]-rope[1]);
        let fy=(pos[1]-rope[2]);
        let F=Math.sqrt(fx*fx+fy*fy)/rope[5];
        let t=Math.atan2(fy,fx);
        if(F<1){
            F=0;
        }
        fx=Math.cos(t)*F;
        fy=Math.sin(t)*F;
        velocity[0]-=fx;
        velocity[1]-=fy;
    }
    velocity[1]+=0.1;
    velocity[0]*=friction;
    velocity[1]*=friction;
}
function draw(){
    ctx.fillStyle="lightblue";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="yellow";
    for(let i=0;i<entitys.length;i++){
        ctx.fillRect(entitys[i][0]+canvas.width/2-pos[0],entitys[i][1]+canvas.height/2-pos[1],entitys[i][2],entitys[i][3]);
    }
    if(rope[0]){
    ctx.beginPath();
    ctx.moveTo(rope[1]+canvas.width/2-pos[0],rope[2]+canvas.height/2-pos[1]);
    ctx.lineTo(canvas.width/2,canvas.height/2);
    ctx.strokeStyle = `rgb(255,255,255)`;
    ctx.lineWidth = 2;
    ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 10, 0, Math.PI*2);
    ctx.stroke()
}
framerate=60;
setInterval(()=>{
    update();
    draw();
},1000/framerate)

canvas.addEventListener('mousemove',(event)=>{
    mousex=event.offsetX;
    mousey=event.offsetY;
})
canvas.addEventListener('click',()=>{
    rope[0]=!rope[0];
    rope[1]=pos[0];
    rope[2]=pos[1];
    let r=10;
    let t=Math.atan2(mousey-canvas.height/2,mousex-canvas.width/2);
    rope[3]=Math.cos(t)*r;
    rope[4]=Math.sin(t)*r;
})
window.addEventListener('keydown',(event)=>{
    console.log(event.key)
    if(event.key=="w"){
        if(rope[3]==0 && rope[4]==0 && rope[0]){
            let fx=(pos[0]-rope[1]);
            let fy=(pos[1]-rope[2]);
            let F=Math.sqrt(fx*fx+fy*fy);
            if(F>10){
                F=2
            }else{
                F=0
            }
            let t=Math.atan2(fy,fx);
            fx=Math.cos(t)*F;
            fy=Math.sin(t)*F;
            velocity[0]-=fx;
            velocity[1]-=fy;
        }
    }
    if(event.key==" "){
        if(rope[3]==0 && rope[4]==0 && rope[0]){
            let fx=(pos[0]-rope[1]);
            let fy=(pos[1]-rope[2]);
            let F=Math.sqrt(fx*fx+fy*fy);
            if(F>10){
                F=2
            }else{
                F=0
            }
            let t=Math.atan2(fy,fx);
            fx=Math.cos(t)*F;
            fy=Math.sin(t)*F;
            velocity[0]-=fx;
            velocity[1]-=fy;
        }
    }
})