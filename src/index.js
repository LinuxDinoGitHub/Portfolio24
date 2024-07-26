const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const floor = document.querySelectorAll("#floor");
const gamOver = document.getElementById("gameover");
const gameContainer = document.querySelector(".frame");
let over = false;
let score = 0;
let highscore = 0;
const cactustex = ["ctex1","ctex2","ctex3"];
const dinoSprite = ["./Assests/dino1.png","./Assests/dino2.png"];
const textEl = document.getElementById("textDisplay");
const dialogue = ["Hi there!","Keep jumping and I will tell you something...","Once upon a time there were many dinosaurs, ", "and one of them was the legendary LinuxDino.", "Everyday, he practiced jumping over thousands of cactus", "hoping to be the bounciest dinosaur of them all.","Huh?","I think... I think this is impossible...","But the word impossible wasn't invented yet back at LinuxDino's time."]
const intervals = [1,1,1.5,2,2,2,1,2,2];
setInterval(() => {
    if(!over){
        dino.setAttribute("src",dinoSprite[(dinoSprite.indexOf(dino.getAttribute("src"))+1)%2]);
        score += 5
    }
}, 100);
startGame();
function playDialogue(){
    for(let i=0; i<dialogue.length; i++){
        if(!over){
            for(let k=0; k < 11; k++){
                setTimeout(()=>{
                    textEl.style.opacity += 0.1;
                }, 10);
            };
            textEl.innerHTML = dialogue[i];
            setTimeout(()=>{
            }, intervals[i]*1000);
            for(let j=0; j < 11; j++){
                setTimeout(()=>{
                    textEl.style.opacity -= 0.1;
                }, 10);
            };
        }
        else{
            textEl.innerHTML = "";
        }
    };
};

function startGame(){
    score = 0;
    cactus.style.visibility = "hidden";
    floor[0].style.animationPlayState = 'running';
    floor[1].style.animationPlayState = 'running';
    cactus.style.left = "580px";
    cactus.style.animationPlayState = 'running';
    addCactus();
    jump();
    gamOver.classList.remove("gameover");
    setTimeout(() => {
        over = false; 
        cactus.style.visibility = "visible";
        playDialogue();
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
    gamOver.classList.add("gameover");
    if(score > highscore){
        highscore = score;
    }
    console.log(score, highscore);
}
document.addEventListener("keydown", (e) => {
    !over? jump() : startGame(); 
});

gameContainer.addEventListener("click", (e) => {
    !over? jump() : startGame(); 
});
