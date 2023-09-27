let canvas=document.getElementById('myCanvas');
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
let ctx=canvas.getContext('2d');

function createmap(){
    let map=[];
    for(let i=0;i<mapSize;i+=1){
        let chunk=[];
        for(let j=0;j<mapSize;j+=1){
            chunk.push(0);
        }
        map.push(chunk);
    }
    return map;
}

let mapSize=60;
let blockSize=30;
let mapx=0;
let mapy=0;
let map=createmap();
map[10][10]=1;
map[10][11]=1;
let mousex=0;
let mousey=0;
let colors=["lightblue","red","blue","yellow"]
let click=false;
let storeblock=[0,0,0]
function draw(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<mapSize;i+=1){
        for(let j=0;j<mapSize;j+=1){
            ctx.fillStyle=colors[map[i][j]];
            ctx.fillRect((i*blockSize)-mapx,(j*blockSize)-mapy,blockSize,blockSize);
        }
    }
}
framerate=60;
setInterval(()=>{
    draw();
},1000/framerate)

let speed=5;
window.addEventListener("keydown",(event)=>{
    let k=event.key;
    if(k=="w"){
        mapy-=speed
    }
    if(k=="s"){
        mapy+=speed
    }
    if(k=="a"){
        mapx-=speed
    }
    if(k=="d"){
        mapx+=speed
    }
    if(!isNaN(k)){
        k=Number(k);
        try{
            for(let i=0;i<mapSize;i+=1){
                for(let j=0;j<mapSize;j+=1){
                    if(mousex>(i*blockSize)-mapx && mousex<(i*blockSize)-mapx+blockSize && mousey>(j*blockSize)-mapy && mousey<(j*blockSize)-mapy+blockSize){
                        let editx=0;
                        let edity=0;
                        if(k==1){
                            editx=-1;
                            edity=-1;
                        }
                        if(k==2){
                            editx=0;
                            edity=-1;
                        }
                        if(k==3){
                            editx=1;
                            edity=-1;
                        }
                        if(k==4){
                            editx=-1;
                            edity=0;
                        }
                        if(k==6){
                            editx=1;
                            edity=0;
                        }
                        if(k==7){
                            editx=-1;
                            edity=1;
                        }
                        if(k==8){
                            editx=0;
                            edity=1;
                        }
                        if(k==9){
                            editx=1;
                            edity=1;
                        }
                        let canMove=false;
                        for(let o=-1;o<2;o+=1){
                            for(let p=-1;p<2;p+=1){
                                if(i+o>-1 && i+o<blockSize && j+p>-1 && j+p<blockSize){
                                    if(!(o==0 && p==0)){
                                        if(map[i+o][j+p]>0){
                                            canMove=true;
                                        }
                                    }
                                }
                            }
                        }
                        if(map[i+editx][j+edity]==0 && map[i][j]>0 && canMove){
                            map[i+editx][j+edity]=map[i][j];
                            map[i][j]=0;
                        }
                    }
                }
            }
        }catch(err){
            console.log(err)
        }
    }
})
window.addEventListener("mousemove",(event)=>{
    mousex=Math.max(event.offsetX-mapx,0);
    mousey=Math.max(event.offsetY-mapy,0);
})
canvas.addEventListener("click",(event)=>{
    click=!click;
})
canvas.addEventListener('wheel',(event)=>{
    if(event.deltaY>0){
        blockSize-=1;
    }else{
        blockSize+=1;
    }
})