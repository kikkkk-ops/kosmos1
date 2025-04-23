const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cannonSfx = new Audio("https://ia601404.us.archive.org/24/items/metal-block/Anti%20Aircraft%20Cannon-18363-Free-Loops.com.mp3");

let cannonTop = new Image();
cannonTop.src="https://ia801504.us.archive.org/32/items/cannon_202104/cannon.png";
cannonTop.onload = renderImages;

let mousePos = null;
let angle = null;
let canShoot = true;

//Global Functions
function drawBorder() {
    ctx.fillStyle = "#666666";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.clearRect(20,20,560,560);
}

//Ensure cannon balls have the correct starting position
function sortBallPos(x, y) {
    let rotatedAngle = angle;
    //Work out distance between rotation point & cannon nozzle
    let dx = x - (cannon.x + 15);
    let dy = y - (cannon.y - 50);
    let distance = Math.sqrt(dx*dx + dy*dy);
    let originalAngle = Math.atan2(dy,dx);
    //Work out new positions
    let newX = (cannon.x + 15) + distance * Math.cos(originalAngle + rotatedAngle);
    let newY = (cannon.y - 50) + distance * Math.sin(originalAngle + rotatedAngle);

    return {
        x: newX,
        y: newY
    }
}

class Cannon {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.topX = x-20;
        this.topY = y-95;
    }

    stand(){
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+15,this.y-50);
        ctx.lineTo(this.x+30,this.y);
        ctx.stroke();
    }

    rotateTop(){
        if(mousePos){
             angle = Math.atan2(mousePos.y - 
                (this.y-50), mousePos.x - 
                (this.x+15));
            ctx.translate((this.x+15), (this.y-50));
            ctx.rotate(angle);
            ctx.translate(-(this.x+15), -(this.y-50));
        }
    }

    draw() {
        //Draw the stand first
        this.stand();
        ctx.save();
        //Then draw the cannon
        this.rotateTop();
        ctx.drawImage(cannonTop,this.topX,this.topY,100,50);
    }
}

let cannon = new Cannon(80,580);

class CannonBall {
    constructor(angle, x, y) {
        this.radius = 15;
        this.mass = this.radius;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.dx = Math.cos(angle) * 7;
        this.dy = Math.sin(angle) * 7;
        this.gravity = 0.05;
        this.elasticity = 0.5;
        this.friction = 0.008;
        this.collAudio = new Audio("https://archive.org/download/metal-block_202104/metal-block.wav");
        this.collAudio.volume = 0.7;
        this.shouldAudio = true;
        this.timeDiff1 = null;
        this.timeDiff2 = new Date();
    }

    move() {  
        //Sort out gravity
        if(this.y + this.radius < 580){
            this.dy += this.gravity;
        } 

        //Apply friction to X axis
        this.dx = this.dx - (this.dx*this.friction);

        this.x += this.dx; 
        this.y += this.dy; 
    }

    draw() {
        //Set next offsets to normal offsets
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

let cannonBalls = [];

function ballHitWall(ball) {
    //A collision has occured on any side of the canvas
    if(ball.x + ball.radius > 580 ||
        ball.x - ball.radius < 20 ||
        ball.y + ball.radius > 580 ||
        ball.y - ball.radius < 20){
            if(ball.timeDiff1){
                ball.timeDiff2 = new Date() - ball.timeDiff1;
                ball.timeDiff2 < 200 ? ball.shouldAudio = false : null;
            }
            if(ball.shouldAudio) ball.collAudio.play();
            
        //Sort out elasticity & then change direction
        ball.dy = (ball.dy * ball.elasticity);

        //Right side of ball hits right side of canvas
        if(ball.x + ball.radius > 580) {
            //We set the X & Y coordinates first to prevent ball from getting stuck in the canvas border
            ball.x = 580 - ball.radius;
            ball.dx *= -1;
        }else if(ball.x - ball.radius < 20){
            //Left side of ball hits left side of canvas
            ball.x = 20 + ball.radius;
            ball.dx *= -1;
        }else if(ball.y + ball.radius > 580){
            //Bottom of ball hits bottom of canvas
            ball.y = 580 - ball.radius;
            ball.dy *= -1;
        }else if(ball.y - ball.radius < 20){
            //Top of ball hits top of canvas
            ball.y = 20 + ball.radius;
            ball.dy *= -1;
        }

            ball.timeDiff1 = new Date();
        }
}

function ballHitBall(ball1, ball2) {
    let collision = false;
    let dx = ball1.x - ball2.x;
    let dy = ball1.y - ball2.y;
    //Modified pythagorous, because sqrt is slow
    let distance = (dx * dx + dy * dy);
    if(distance <= (ball1.radius + ball2.radius)*(ball1.radius + ball2.radius)){
        collision = true;
    }
    return collision;
}

function collideBalls(ball1,ball2){
    //It matters that we are getting the exact difference from ball 1 & ball 2
    let dx = ball2.x - ball1.x;
    let dy = ball2.y - ball1.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    //Work out the normalized collision vector (direction only)
    let vCollisionNorm = {x: dx / distance, y:dy/distance}
    //Relative velocity of ball 2
    let vRelativeVelocity = {x: ball1.dx - ball2.dx,y:ball1.dy - ball2.dy};
    //Calculate the dot product
    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
    //Don't do anything because balls are already moving out of each others way
    if(speed < 0) return;
    let impulse = 2 * speed / (ball1.mass + ball2.mass);
    //Becuase we calculated the relative velocity of ball2. Ball1 needs to go in the opposite direction, hence a collision.
    ball1.dx -= (impulse * ball2.mass * vCollisionNorm.x);
    ball1.dy -= (impulse * ball2.mass * vCollisionNorm.y);
    ball2.dx += (impulse * ball1.mass * vCollisionNorm.x);
    ball2.dy += (impulse * ball1.mass * vCollisionNorm.y);
    //Still have to account for elasticity
    ball1.dy = (ball1.dy * ball1.elasticity);
    ball2.dy = (ball2.dy * ball2.elasticity);
}

function collide(index) {
    let ball = cannonBalls[index];
    for(let j = index + 1; j < cannonBalls.length; j++){
        let testBall = cannonBalls[j];
        if(ballHitBall(ball,testBall)){
            collideBalls(ball,testBall);
        }
    }
}


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //Draw Border first
    drawBorder();
    //Moving Canvas Graphics
    cannon.draw();
    ctx.restore();
    //Shoot the cannon balls
    cannonBalls.forEach((ball, index) => {
        //Moves the balls
        ball.move();
        ballHitWall(ball);
        collide(index);
        //Renders balls to canvas
        ball.draw();
    });
}

let imgCount = 1;
//Start application now because images have loaded
function renderImages(){
    if(--imgCount>0){return}
    //Call animate() when all images have loaded
    animate();
}

//Mouse has moved
canvas.addEventListener("mousemove", e => {

    mousePos = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    }
});

canvas.addEventListener("click", e => {
    //We don't want to be able to shoot a ball at this angle!
    if(angle < -2 || angle > 0.5) return;

    if(!canShoot) return;
    canShoot = false;

    let ballPos = sortBallPos(cannon.topX + 100, cannon.topY + 30);

    cannonBalls.push( 
        new CannonBall(angle, ballPos.x, ballPos.y)
        );
    
    cannonSfx.currentTime = 0.2;
    cannonSfx.play();

    
    setTimeout(() => {
        canShoot = true;
    }, 1000)
})
