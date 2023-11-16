
let assets={
    "characters":{
        "default":{
            "hitbox":[0.8,0.8],
            "speed":0.1,
            "health":100,
            "maxhealth":100
        }
    },
    "physical":{
        "blocks":{
            "air":{
                "id":0,
                "name":"air",
                "health":Infinity,
                "maxHealth":Infinity,
                "texture":"air",
                "state":"gas"
            },
            "dirt":{
                "id":1,
                "name":"dirt",
                "health":120,
                "maxHealth":120,
                "texture":"dirt",
                "state":"solid"
            }
        },
        "entities":{
        
        }
    },
    "functions":{
        "blocks":{
            "update":{
                //all functions
                "air":(world,character,a,b,ctx,blockSize,canvas)=>{
                    //pass
                },
                "dirt":(world,character,a,b,c,ctx,blockSize,canvas,funcs)=>{
                    ctx.fillStyle="rgb(200,100,50)"
                    let x=a*blockSize+canvas.width/2-character.hitbox[0]*blockSize/2-world.drawpos[0]*blockSize
                    let y=b*blockSize+canvas.height/2-character.hitbox[1]*blockSize/2-world.drawpos[1]*blockSize
                    ctx.fillRect(x,y,blockSize+1,blockSize+1);
                    if(c==1 && world[`${world.dimension}`].blocks[`${a}#${b}#1`].state=="solid"){
                        if(funcs.checkCollisionBP(a,b,blockSize,character,world)){
                            world.pos=[...world.validpos]
                        }
                    }
                }

                //end of fucntions
            }
        },
        "entities":{
            "update":{

            }
        }
    }
}

export {assets};