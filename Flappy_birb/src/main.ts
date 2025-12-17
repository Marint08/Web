import './style.css'

const birb:HTMLDivElement=document.querySelector('.birb') as HTMLDivElement;
const grid:HTMLDivElement=document.querySelector('.grid') as HTMLDivElement;
const alert:HTMLHeadingElement=document.querySelector('#alert') as HTMLHeadingElement;

const fromGround=30;
let bottom=0;
const gravity=-50;
let velocity:number=0;
const jumpVelocity:number=700;

let maxJumps=Infinity;
let maxHeight=750;

let jumpsUsed=0;
let grounded=true;
let lastTime=performance.now();

const obsSpacing=600;
const obsMinHeight=50;
const obsMaxHeight=710;

const step=10;
const interval=30;

const delay=Math.round((obsSpacing*interval)/step)

const spawn=2000;

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
    birb.style.bottom=(fromGround+bottom)+'px';

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
    if (isGameOver) return;
    const obsPosition:number=spawn;
    const obsHeight:number=Math.round(Math.random()*(obsMaxHeight-obsMinHeight)+obsMinHeight)
    let pos=obsPosition;
    const obsDiv:HTMLDivElement=document.createElement('div');
    obsDiv.classList.add('obsticle');

    obsDiv.style.height=obsHeight+'px';
    obsDiv.style.left=pos+'px'
    obsDiv.style.bottom='0px'

    grid.appendChild(obsDiv);

    const timer:number=window.setInterval(()=>{
        const collisionStart=0;
        const collisionEnd=60;

        if (pos>collisionStart && pos<collisionEnd){
            const birbBottom=fromGround+bottom;
            if (birbBottom<=obsHeight){
                window.clearInterval(timer);
                alert.innerHTML=`Game over! Score ${score}`;
                isGameOver=true;
                ClearGame()
                return;
            }
        }
        if (pos <=0){
            score++;
            alert.innerHTML=score.toString();
            if (obsDiv.parentElement) obsDiv.parentElement.removeChild(obsDiv);
            window.clearInterval(timer);
            return;
        }
        pos-=step
        obsDiv.style.left=pos+'px'
    },interval)
    if (!isGameOver){
        window.setTimeout(generateObsticle, delay)
    }
}

function ClearGame():void{
    while(grid.firstChild){
        grid.removeChild(grid.lastChild!)
    }
}