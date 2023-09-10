"use strict";
let guide=document.getElementById("guide");
let countdown=document.getElementById("countdown");
let levelDisplay=document.getElementById("level-display")
let input=document.getElementById("input");
let submit=document.getElementById("submit")
let showScore=document.getElementById("score")

let score=0
function checkAnswer(answer){
    if(answer==memString){
        score+=1
    }else{
        score-=1
    }
    count=0
    levelcount+=1;
    if(levelcount>9){
        levelcount=0
        level+=1
    }
    showScore.innerText="score: "+score
    memString=''
}

let canSubmit=false
let memString=""
let count=0
let levelcount=0;
let level=1
let time=4
setInterval(()=>{
    countdown.innerText=count
    levelDisplay.innerText="level: "+level
    if(count<(time+level)){
        if(count==0){
            memString=''
            for(let i=0;i<level+3;i++){
                memString+=`${Math.round(Math.random()*9)}`
            }
        }
        guide.innerText="number to remember: "+memString;
        canSubmit=false;
        input.value=''
    }else{
        guide.innerText="remember the number!";
        canSubmit=true;
    }
    count+=1
    if(count>(time+level)*2){
        checkAnswer(input.value)
    }
},1000)

input.addEventListener("keydown",()=>{
    if(!canSubmit){
        input.value=''
    }
})

window.addEventListener("keydown",(event)=>{
    console.log(event.key)
    if(canSubmit){
        if(!isNaN(event.key)){
            input.value+=event.key
        }
        if(event.key=='Backspace'){
            input.value=input.value.slice(0, -1)
        }
        if(event.key=='Enter'){
            checkAnswer(input.value)
        }
    }
})
submit.addEventListener("click",()=>{
    if(canSubmit){
        checkAnswer(input.value)
    }
})