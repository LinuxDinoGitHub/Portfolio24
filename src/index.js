const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const floor = document.querySelectorAll("#floor");
const gamOver = document.getElementById("gameover");
const gameContainer = document.querySelector(".frame");
const scoreDisplay = document.getElementById("score");
const autoJump = document.getElementById("checkbox");
let enabledAuto = false;
let cutscene = false;
let over = false;
let score = 0;
let highscore = 0;
const cactustex = ["ctex1","ctex2","ctex3"];
const dinoSprite = ["./Assests/dino1.png","./Assests/dino2.png"];
const textEl = document.getElementById("textDisplay");
const dialogue = ["Hi there!","Keep jumping (press SPACE) and I will tell you something...","Once upon a time there were many dinosaurs, ", "and one of them was the legendary LinuxDino.", "Everyday, he practiced jumping over thousands of cacti,", "hoping to be the bounciest dinosaur of them all.","Huh?","I think... I think this is impossible...","But the word impossible wasn't invented yet back at LinuxDino's time."]
const intervals = [0,3,3,4,4,4,3,4,5];
let dinoAnim = setInterval(() => {
    if(!over){
        dino.setAttribute("src",dinoSprite[(dinoSprite.indexOf(dino.getAttribute("src"))+1)%2]);
        score += 5;
        formatScore();
    }
}, 100);
startGame();

function formatScore(){
    let fhigh = highscore.toString().padStart(6, '0');
    let fscore = score.toString().padStart(6, '0');
    scoreDisplay.innerHTML = `HI ${fhigh} ${fscore}`;
}

let timeout = [];
function playDialogue(){
    for(let i=0; i<dialogue.length; i++){
        if(!over){
            let interval = 0;
            intervals.forEach((element, index) => {
                if(index <= i){
                    interval += element * 1000;
                };
            });
            timeout.push(setTimeout(()=>{
                textEl.innerHTML = dialogue[i];
                if(i == 5){ //Will call f() 1 interval earlier
                    cutscene = true;
                }
            }, interval));
        }
    };
};

function startGame(){
    formatScore();
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
    if(cactusSide < 0){ //IF cactus is offscreen
        addCactus();
    }
    if(enabledAuto && cactusSide < 70 && !over){ //Autojumping
        jump(); 
    }
    if(cactusSide < 20 && cactusSide > 0 && dinoTop >= 140 && !over){ //Checks collision
        over = true;
        gameOver()
    }
    if(cutscene){
        playCutscene();
    }
},20)

let cutsceneTimeout;
function playCutscene(){
    clearInterval(frame, dinoAnim);
    cutsceneTimeout = setTimeout(()=>{
        floor[0].style.animationPlayState = 'paused';
        floor[1].style.animationPlayState = 'paused';
        cactus.style.animationPlayState = 'paused';
    }, intervals[5]*1000)
}

function gameOver(){
    floor[0].style.animationPlayState = 'paused';
    floor[1].style.animationPlayState = 'paused';
    cactus.style.animationPlayState = 'paused';
    gamOver.classList.add("gameover");
    if(score > highscore){
        highscore = score;
    }
    formatScore();
    textEl.innerHTML = "oh no... you died, try again";
    timeout.forEach(e => {
        clearTimeout(e);
    })
    clearTimeout(cutsceneTimeout);
}
document.addEventListener("keydown", (e) => {
    !over? jump() : startGame(); 
});

gameContainer.addEventListener("click", (e) => {
    !over? jump() : startGame(); 
});

autoJump.addEventListener("click", (e) => {
    autoJump.classList.toggle('unchecked');
    enabledAuto = !enabledAuto;
});
