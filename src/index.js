const dino = document.getElementById("dino");

const dinoSprite = ["./Assests/dino1.png","./Assests/dino2.png"]
setInterval(() => {
    dino.setAttribute("src",dinoSprite[(dinoSprite.indexOf(dino.getAttribute("src"))+1)%2])
}, 100);
function jump(){
    dino.classList.add("jump");
    setTimeout(() => {
        dino.classList.remove("jump");
    }, 500);
}

document.addEventListener("keydown", (e) => {jump()});