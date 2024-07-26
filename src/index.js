const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const floor = document.querySelectorAll("#floor");
const gamOver = document.getElementById("gameover");
let over = false;
let score = 0;
let highscore = 0;
const cactustex = ["ctex1","ctex2","ctex3"];
const dinoSprite = ["./Assests/dino1.png","./Assests/dino2.png"];

setInterval(() => {
    if(!over){
        dino.setAttribute("src",dinoSprite[(dinoSprite.indexOf(dino.getAttribute("src"))+1)%2]);
        score += 5
    }
}, 100);

function startGame(){
    score = 0;
    floor[0].style.animationPlayState = 'running';
    floor[1].style.animationPlayState = 'running';
    cactus.style.left = "580px";
    cactus.style.animationPlayState = 'running';
    addCactus();
    jump();
    gamOver.classList.toggle("gameover");
    setTimeout(() => {
        over = false; 
    }, 100);
};

function jump(){
    if(dino.classList != "jump"){
        dino.classList.add("jump");
        setTimeout(() => {
            dino.classList.remove("jump");
        }, 710);
    }
}

function addCactus(){
    cactus.classList.remove("ctex1", "ctex2", "ctex3");
    cactus.classList.add(cactustex[Math.round(Math.random() * 100) % 3]);
}

let frame = setInterval(()=>{
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusSide = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    let cactusTop = parseInt(window.getComputedStyle(cactus).getPropertyValue("top"));
    if(cactusSide < 0){
        addCactus();
    }
    if(cactusSide < 20 && cactusSide > 0 && dinoTop >= 140 && !over){
        over = true;
        gameOver()
    }
},20)

function gameOver(){
    floor[0].style.animationPlayState = 'paused';
    floor[1].style.animationPlayState = 'paused';
    cactus.style.animationPlayState = 'paused';
    gamOver.classList.toggle("gameover");
    if(score > highscore){
        highscore = score;
    }
    console.log(score, highscore);
}

document.addEventListener("keydown", (e) => {
    !over? jump() : startGame(); 
});