
class PRNG{
    constructor (seed){
        this.mod=17236312782;
        this.a=  1232174373;
        this.c=  175443324; 
        this.x=seed;
    }
    random(){
        this.x=((this.a*this.x+this.c)%this.mod)
        return (1/(this.mod-1))*this.x
    }
}

function oneIterationRandom(seed){
    let mod=17236312746;
    let a=  78348961246;
    let c=964238732;
    return Math.abs((1/(mod-1))*((a*seed+c)%mod))
}

class perlinNoise{
    constructor(seed){
        this.mod=17236312782;
        this.a=  1232174373;
        this.c=  175443324; 
        this.seed=seed;
    }
    XYRandom(x,y){
        //if(x<0){
        //    x=Math.abs(x)+832123132342
        //}
        //if(y<0){
        //    y=Math.abs(y)+342434135235
        //}
        let seed=(Math.abs(x)<< 16) * Math.abs(y)
        let mod=972342342432313;
        let a=  48722345333;
        let c=  6921212533422;
        return Math.abs((1/(mod-1))*((a*(seed)+c)%mod))
    }
}


//testing

let canvas=document.getElementById("myCanvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let ctx=canvas.getContext("2d");

let random=new perlinNoise(547634)

let size=10;

for(let i=0;i<100;i++){
    for(let j=0;j<100;j++){
        let pixel=random.XYRandom(i,j)*255;
        console.log(pixel)
        ctx.fillStyle=`rgb(${pixel},${pixel},${pixel})`
        ctx.fillRect(i*size,j*size,size,size)
    }
}