import './style.css'

const dino:HTMLDivElement=document.querySelector('.dino') as HTMLDivElement;
const grid:HTMLDivElement=document.querySelector('.grid') as HTMLDivElement;
const alert:HTMLHeadingElement=document.querySelector('#alert') as HTMLHeadingElement;

let position:number=30;
let gravity:number=9.81;
let isJumping:boolean=false;
let isGameOver:boolean=false;
let score:number=0;

generateCactus();

document.addEventListener('keydown', (event) => {
    if(event.code == "Space"){
        console.log("asd");
        if(!isJumping){
            isJumping = true;
            Jump();
        }
    }
});

function Jump():void{
    let jumpTimer: number = setInterval(() => {
        if(position >= 200){
            clearInterval(jumpTimer);
            let downTimer: number = setInterval(() => {
                if(position <= 30){
                    clearInterval(downTimer);
                    isJumping = false;
                }
                position -= 5;
                dino.style.bottom = position + 'px';
            }, gravity);  
        }
        position+=5;
        dino.style.bottom = position + 'px';
    }, gravity);
}

function generateCactus():void{
    let randomTime: number = (Math.random()*2000)+500;
    let cactusPosition: number = 2000;
    let cactusDiv: HTMLDivElement = document.createElement('div');
    if(isGameOver == false){
        cactusDiv.classList.add('cactus');
        cactusDiv.style.left = cactusPosition + 'px';
        grid.appendChild(cactusDiv);
    }
    let timer: number = setInterval(() => {
        if(cactusPosition>0 && cactusPosition<60 && position<60){
            clearInterval(timer)
            alert.innerHTML=`Game over! Score ${score}`
            isGameOver=true
            ClearGame()
        }
        if(cactusPosition == 0){
            score++;
            alert.innerHTML = score.toString();
        }
        cactusPosition -= 10;
        cactusDiv.style.left = cactusPosition + 'px';
    }, 30);

    if(isGameOver == false)
    {
        setTimeout(generateCactus, randomTime);
    }

}

function ClearGame():void{
    while(grid.firstChild){
        grid.removeChild(grid.lastChild!)
    }
}