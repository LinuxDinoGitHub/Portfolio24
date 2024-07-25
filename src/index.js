const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

const dinoSprite = ["./Assests/dino1.png","./Assests/dino2.png"];
setInterval(() => {
    dino.setAttribute("src",dinoSprite[(dinoSprite.indexOf(dino.getAttribute("src"))+1)%2])
}, 100);
function jump(){
    if(dino.classList != "jump"){
        dino.classList.add("jump");
        setTimeout(() => {
            dino.classList.remove("jump");
        }, 700);
    }
}

let isAlive = setInterval(()=>{
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusSide = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    let cactusTop = parseInt(window.getComputedStyle(cactus).getPropertyValue("top"));
    if(cactusSide < 20 && cactusSide > 0 && dinoTop >= cactusTop){
        console.log("hit")
    }
},20)

document.addEventListener("keydown", (e) => {jump()});