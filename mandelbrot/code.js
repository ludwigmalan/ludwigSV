"use strict";
let canvas = document.getElementById("myCanvas");


//changeable variables
let pixelSize=2;
let zoomNum=2;
let width=500;
let height=500;
let power=2;
let ipower=0;
let iterations=256;


let scale=(width/4)/pixelSize;
if(height<width){
    scale=(height/4)/pixelSize;
}


canvas.width=width;
canvas.height=height;

let ctx=canvas.getContext('2d');
let start_x=-2;
let start_y=-2;

let juliaSet_ca=false;
let juliaSet_cb=false;
let julia_ca=0;
let julia_cb=0;

function mandel(){
    for(let x=0;x<width/pixelSize;x++){
        for(let y=0;y<height/pixelSize;y++){
            let a=start_x+x/scale;
            let b=start_y+y/scale;

            let ca=a;
            if(juliaSet_ca){ca=julia_ca}
            let cb=b;
            if(juliaSet_cb){cb=julia_cb}

            let i=0;
                while(i<iterations){
                    //mandel calculation begins
                    
                    let r=Math.sqrt(a*a+b*b);
                    let t=Math.atan2(b,a);
                    let p=(r**power)*(Math.E**(-1*ipower*t));
                    let m=power*t+ipower*Math.log(r);
                    a=p*Math.cos(m)+ca;
                    b=p*Math.sin(m)+cb;
                    
                    //mandel calculation ends                    
                    if(a*a+b*b>4){  
                        break;
                    }
                    i++;
                }
            
            ctx.fillStyle=`hsl(${(330/iterations)*i},80%,50%)`; //selects color based on namber of iterations
            ctx.fillRect(x*pixelSize,y*pixelSize,pixelSize,pixelSize);
        }
    }
}
mandel();

let clicked_a=document.querySelector(".clicked_a");
let clicked_b=document.querySelector(".clicked_b");

let zoomIn=true
canvas.addEventListener('click', function(event) {
    var xVal = event.offsetX/pixelSize //- elemLeft;
    var yVal = event.offsetY/pixelSize //- elemTop;
    clicked_a.innerHTML=`ca: ${start_x+xVal/scale}`;
    clicked_b.innerHTML=`cb: ${start_y+yVal/scale}`;
    if (zoomIn){
        start_x=(start_x+(xVal/scale))-(width/scale)/(zoomNum*2*pixelSize);
        start_y=(start_y+(yVal/scale))-(height/scale)/(zoomNum*2*pixelSize);
        scale=scale*zoomNum;
    }else{
        start_x=(start_x+(xVal/scale))-(width/scale)/zoomNum;
        start_y=(start_y+(yVal/scale))-(height/scale)/zoomNum;
        scale=scale/zoomNum;
    }
    mandel();
});


let zoomSize=document.querySelector(".zoomSize");
zoomSize.value="2";

let iterationNum=document.querySelector(".iterationNum");
iterationNum.value="256";

let multibrot_power=document.querySelector(".multibrot_power");
multibrot_power.value="2";
let multibrot_ipower=document.querySelector(".multibrot_ipower");
multibrot_ipower.value="0";

let canvasDetail=document.querySelector(".canvasDetail");
canvasDetail.value="2";

let canvasWidth=document.querySelector(".canvasWidth");
canvasWidth.value="500";

let canvasHeight=document.querySelector(".canvasHeight");
canvasHeight.value="500";

let zoomState=document.querySelector(".zoomState");
zoomState.addEventListener('change',function () {
    zoomIn=false;
    if(zoomState.value=="in"){
        zoomIn=true;
    }
})

let CA=document.querySelector(".CA");
let CB=document.querySelector(".CB");



let apply=document.querySelector(".apply");
apply.addEventListener('click',function(){
    if(Number(zoomSize.value)<1){
        zoomSize.value="1";
    }
    zoomNum=Math.round(Number(zoomSize.value));

    if(Number(iterationNum.value)<1){
        iterationNum.value="1";
    }
    iterations=Math.round(Number(iterationNum.value));

    power=Number(multibrot_power.value);
    ipower=Number(multibrot_ipower.value);

    if(Number(canvasDetail.value)<1){
        canvasDetail.value="2";
    }
    scale=scale*pixelSize;
    pixelSize=Math.round(Number(canvasDetail.value));
    scale=scale/pixelSize;

    if(CA.value==''){
        juliaSet_ca=false
    }else{
        juliaSet_ca=true
        julia_ca=Number(CA.value)
    }
    if(CB.value==''){
        juliaSet_cb=false
    }else{
        juliaSet_cb=true
        julia_cb=Number(CB.value)
    }

    if(Number(canvasWidth.value)<20 || Number(canvasWidth.value)>800){
        canvasWidth.value="500";
    }
    width=Math.round(Number(canvasWidth.value));

    if(Number(canvasHeight.value)<20 || Number(canvasHeight.value)>800){
        canvasHeight.value="500";
    }
    height=Math.round(Number(canvasHeight.value));
    canvas.width=width;
    canvas.height=height;
    ctx=canvas.getContext('2d');
    mandel()
})

let reset=document.querySelector(".reset");
reset.addEventListener('click',function(){
    pixelSize=2;
    zoomNum=2;
    width=500;
    height=500;
    power=2;
    ipower=0;
    iterations=256;


    scale=(width/4)/pixelSize;
    if(height<width){
        scale=(height/4)/pixelSize;
    }


    canvas.width=width;
    canvas.height=height;

    ctx=canvas.getContext('2d');
    start_x=-2;
    start_y=-2;
    juliaSet_ca=false;
    juliaSet_cb=false;
    julia_ca=0;
    julia_cb=0;

    zoomSize.value="2";
    iterationNum.value="256";
    multibrot_power.value="2";
    multibrot_ipower.value="0";
    canvasDetail.value="2";
    canvasWidth.value="500";
    canvasHeight.value="500";
    mandel()
})