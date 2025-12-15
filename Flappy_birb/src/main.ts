import './style.css'

const birb:HTMLDivElement=document.querySelector('.birb') as HTMLDivElement;
const grid:HTMLDivElement=document.querySelector('.grid') as HTMLDivElement;
const alert:HTMLHeadingElement=document.querySelector('#alert') as HTMLHeadingElement;

const position=30;
let bottom=0;
const gravity=-50;
let velocity:number=0;
const jumpVelocity:number=700;

let maxJumps=Infinity;
let maxHeight=2000;

let jumpsUsed=0;
let grounded=true;
let lastTime=performance.now();

let isGameOver:boolean=false;
let score:number=0;

generateObsticle();

function update(now:number){
    const t=(now-lastTime)/1000;
    lastTime=now;

    velocity+=gravity+t;
    bottom+=velocity*t;

    if (bottom<=0)
    {
    if (!grounded)
    {
        jumpsUsed=0;
    }
    bottom=0
    velocity=0
    grounded=true;
    }
    else
    {
        grounded=false;
    }
    birb.style.bottom=(position+bottom)+'px';

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
    


function Jump(){
    if(bottom>=maxHeight) return;

    if (grounded){
        velocity=jumpVelocity;
        grounded=false;
        return;
    }
    if (jumpsUsed<maxJumps){
        velocity=jumpVelocity;
        jumpsUsed+=1;
    }
}

window.addEventListener('keydown', (event) => {
    if(event.code === "Space"){
        event.preventDefault();
        Jump();
        }
    }
);

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