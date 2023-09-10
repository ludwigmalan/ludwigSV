"use strict";
let canvas=document.getElementById("myCanvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let ctx=canvas.getContext("2d")

let tower=[[4,5,6,7],[0,0,0,0],[0,0,0,0]]
let mouseX=0;
let mouseY=0;
let mouseblock=0;
let hasblock=false;
let moves=0;
let time=0;

setInterval(()=>{
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    let segmentL=canvas.width/tower.length;
    for(let i=0;i<tower.length;i++){
        for(let j=0;j<tower[i].length;j++){
            if(j>0){
                if(tower[i][j-1]>0 && tower[i][j]==0){
                    tower[i][j]=tower[i][j-1];
                    tower[i][j-1]=0;
                }
                if(tower[i][j]!=0 && tower[i][j]<tower[i][j-1]){
                    alert("you lose")
                    tower=[[4,5,6,7],[0,0,0,0],[0,0,0,0]]
                    moves=0
                }
            }
            if(mouseX<segmentL*i+segmentL/2+((segmentL/2-10)) && mouseX>segmentL*i+segmentL/2-((segmentL/2+10))){
                if(mouseY>canvas.height-(100*(tower[i].length-j-1)+50)-50 && mouseY<canvas.height-(100*(tower[i].length-j-1)+50)+50){
                    if(tower[i][j]>0){
                        console.log(tower[i][j])
                        if(hasblock && mouseblock==0){
                            if(j==0){
                                mouseblock=tower[i][j]
                                tower[i][j]=0
                                moves+=1
                                time=0
                            }else if(tower[i][j-1]==0){
                                mouseblock=tower[i][j]
                                tower[i][j]=0
                                moves+=1
                                time=0
                            }
                        }
                    }else{
                        if(!hasblock && mouseblock>0){
                            if(j==0){
                                tower[i][j]=mouseblock
                                mouseblock=0
                                time=0
                            }else if(tower[i][j-1]==0){
                                tower[i][j]=mouseblock
                                mouseblock=0
                                time=0
                            }
                        }
                    }
                }
            }
        }
    }
    if(`${tower[2]}`==`${[4,5,6,7]}`){
        alert(`you WIN!!!! moves: ${moves}`)
        tower=[[4,5,6,7],[0,0,0,0],[0,0,0,0]]
        moves=0
        time=0
    }
    for(let i=0;i<tower.length;i++){
        ctx.strokeStyle=`rgb(200,200,200)`
        ctx.beginPath();
        ctx.moveTo(segmentL*i+segmentL/2,canvas.height);
        ctx.lineTo(segmentL*i+segmentL/2,200);
        ctx.lineWidth = 100;
        ctx.stroke();
        for(let j=0;j<tower[i].length;j++){
            ctx.strokeStyle=`rgb(0,200,200)`
            ctx.beginPath();
            ctx.moveTo(segmentL*i+segmentL/2,canvas.height-(100*(tower[i].length-j-1)+50));
            ctx.lineTo(segmentL*i+segmentL/2+((segmentL/2-10)*(tower[i][j]/7)),canvas.height-(100*(tower[i].length-j-1)+50));
            ctx.lineWidth = 100;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(segmentL*i+segmentL/2,canvas.height-(100*(tower[i].length-j-1)+50));
            ctx.lineTo(segmentL*i+segmentL/2-((segmentL/2+10)*(tower[i][j]/7)),canvas.height-(100*(tower[i].length-j-1)+50));
            ctx.lineWidth = 100;
            ctx.stroke();
        }
    }
    ctx.strokeStyle=`rgb(0,200,200)`
    ctx.beginPath();
    ctx.moveTo(mouseX+((segmentL/2-10)*(mouseblock/7)),mouseY);
    ctx.lineTo(mouseX-((segmentL/2+10)*(mouseblock/7)),mouseY)
    ctx.lineWidth = 100;
    ctx.stroke();
    time+=1
    if(time>60*5){
        alert("you lose")
        tower=[[4,5,6,7],[0,0,0,0],[0,0,0,0]]
        moves=0
    }
},1000/60)

window.addEventListener('mousemove',(event)=>{
    console.log(mouseX)
    mouseX=event.offsetX;
    mouseY=event.offsetY;
})
window.addEventListener('click',()=>{
    hasblock=!hasblock;
})