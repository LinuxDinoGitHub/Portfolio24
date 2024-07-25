const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const floor = document.querySelectorAll("#floor");
const gamOver = document.getElementById("gameover");
const cactustex = ["ctex1","ctex2","ctex3"];
const dinoSprite = ["./Assests/dino1.png","./Assests/dino2.png"];
setInterval(() => {
    dino.setAttribute("src",dinoSprite[(dinoSprite.indexOf(dino.getAttribute("src"))+1)%2])
}, 100);
function jump(){
    if(dino.classList != "jump"){
        dino.classList.add("jump");
        setTimeout(() => {
            dino.classList.remove("jump");
        }, 710);
    }
}

let frame = setInterval(()=>{
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusSide = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    let cactusTop = parseInt(window.getComputedStyle(cactus).getPropertyValue("top"));
    console.log(dinoTop, cactusSide, cactusTop)
    if(cactusSide < 0){
        cactus.classList.remove("ctex1", "ctex2", "ctex3");
        cactus.classList.add(cactustex[Math.round(Math.random() * 100) % 3])
    }
    if(cactusSide < 20 && cactusSide > 0 && dinoTop >= 140){
        gameOver()
    }
},20)

function gameOver(){
    floor[0].classList.remove("movingfloor");
    floor[1].classList.remove("movingfloor");
    cactus.classList.remove("movingcactus");
    gamOver.classList.toggle("gameover");
}

document.addEventListener("keydown", (e) => {jump()});