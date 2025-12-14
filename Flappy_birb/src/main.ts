import './style.css'

const birb:HTMLDivElement=document.querySelector('.birb') as HTMLDivElement;
const grid:HTMLDivElement=document.querySelector('.grid') as HTMLDivElement;
const alert:HTMLHeadingElement=document.querySelector('#alert') as HTMLHeadingElement;

let position:number=30;
let gravity:number=9.81;
let isJumping:boolean=false;
let isGameOver:boolean=false;
let score:number=0;

generateObsticle();

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
                birb.style.bottom = position + 'px';
            }, gravity);  
        }
        position+=5;
        birb.style.bottom = position + 'px';
    }, gravity);
}

function generateObsticle():void{
    let randomTime: number = (Math.random()*2000)+500;
    let obsticlePosition: number = 2000;
    let obsticleDiv: HTMLDivElement = document.createElement('div');
    if(isGameOver == false){
        obsticleDiv.classList.add('obsticle');
        obsticleDiv.style.left = obsticlePosition + 'px';
        grid.appendChild(obsticleDiv);
    }
    let timer: number = setInterval(() => {
        if(obsticlePosition>0 && obsticlePosition<60 && position<60){
            clearInterval(timer)
            alert.innerHTML=`Game over! Score ${score}`
            isGameOver=true
            ClearGame()
        }
        if(obsticlePosition == 0){
            score++;
            alert.innerHTML = score.toString();
        }
        obsticlePosition -= 10;
        obsticleDiv.style.left = obsticlePosition + 'px';
    }, 30);

    if(isGameOver == false)
    {
        setTimeout(generateObsticle, randomTime);
    }

}

function ClearGame():void{
    while(grid.firstChild){
        grid.removeChild(grid.lastChild!)
    }
}