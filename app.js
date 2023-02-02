const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector(".score")
const blockWidth = 100
const blockHeight = 20
const boardWidth = 1000
const boardHeight = 600 
const userStart = [430, 10]
let currentPosition = userStart
const userHeight = 20
const userWidth = 150
const ballStart = [500, 30]
let ballCurrentPosition = ballStart
let timerId
const ballDiameter = 20
let xDirection = 2
let yDirection = 2
let score = 0



//Create Block

class Block{
    constructor(xAxis, yAxis, lifes){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.lifes = lifes
    }
}

//All my blocks

const blocks = [
    new Block(10, 550, 1),
    new Block(120, 550, 1),
    new Block(230, 550, 1),
    new Block(340, 550, 1),
    new Block(450, 550, 1),
    new Block(560, 550, 1),
    new Block(670, 550, 1),
    new Block(780, 550, 1),
    new Block(890, 550, 1),
    new Block(10, 520, 1),
    new Block(230, 520, 1),
    new Block(340, 520, 1),
    new Block(560, 520, 1),
    new Block(670, 520, 1),
    new Block(890, 520, 1),
    new Block(120, 490, 1),
    new Block(450, 490, 1),
    new Block(780, 490, 1),
    new Block(10, 460, 1),
    new Block(230, 460, 1),
    new Block(340, 460, 1),
    new Block(560, 460, 1),
    new Block(670, 460, 1),
    new Block(890, 460, 1),
    new Block(10, 430, 1),
    new Block(120, 430, 1),
    new Block(230, 430, 1),
    new Block(340, 430, 1),
    new Block(450, 430, 1),
    new Block(560, 430, 1),
    new Block(670, 430, 1),
    new Block(780, 430, 1),
    new Block(890, 430, 1)
]


// All my HardBlock

const hardBlocks = [
    new Block(120, 520, 2),
    new Block(450, 520, 2),
    new Block(780, 520, 2),
    new Block(10, 490, 2),
    new Block(230, 490, 2),
    new Block(340, 490, 2),
    new Block(560, 490, 2),
    new Block(670, 490, 2),
    new Block(890, 490, 2),
    new Block(120, 460, 2),
    new Block(450, 460, 2),
    new Block(780, 460, 2)
]


//Draw all my blocks

function addBlocks(){
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement("div")
        block.classList.add("block")
        block.style.left = blocks[i].bottomLeft[0] + "px"
        block.style.bottom = blocks[i].bottomLeft[1] + "px"
        grid.appendChild(block)
    }

    for(let i = 0; i < hardBlocks.length; i++){
        const hardBlock = document.createElement('div')
        hardBlock.classList.add('hard-block')
        hardBlock.style.left = hardBlocks[i].bottomLeft[0] + 'px'
        hardBlock.style.bottom = hardBlocks[i].bottomLeft[1] + 'px'
        grid.appendChild(hardBlock)
    }
}

//add user

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)


//draw user

function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw ball

function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move user

function moveUser(e){

    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        
        case 'ArrowRight':
            if(currentPosition[0] < (boardWidth - userWidth)){
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

//add ball

const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)


//move ball

function moveBall(){
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 12)


//check for collisions

function checkForCollisions(){
    //check for block collisions

    for(let i = 0; i < blocks.length; i++){
        if(
            (ballCurrentPosition[0] + ballDiameter > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0])
            &&
            (ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){
            blocks[i].lifes -- 
            if(blocks[i].lifes === 0){
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                allBlocks[i].classList.remove('block')
                blocks.splice(i, 1)
                changeDirection()
                score++
                scoreDisplay.textContent = score
            }
        }

        //check for win
        if(blocks.length === 0){
            scoreDisplay.textContent = "YOU WIN"
            clearInterval(timerId)
            document.removeEventListener('keydown', moveUser)
        }
    }

    //check for hardBlock collisions

    for(let i = 0; i < hardBlocks.length; i++){
        if(
            (ballCurrentPosition[0] + ballDiameter > hardBlocks[i].bottomLeft[0] && ballCurrentPosition[0] < hardBlocks[i].bottomRight[0])
            &&
            (ballCurrentPosition[1] + ballDiameter > hardBlocks[i].bottomLeft[1] && ballCurrentPosition[1] < hardBlocks[i].topLeft[1]) 
        ){
            if(hardBlocks[i].lifes <= 1){
                hardBlocks[i].lifes --
                const allHardBlocks = Array.from(document.querySelectorAll('.hard-block'))
                allHardBlocks[i].classList.remove('hard-block')
                hardBlocks.splice(i, 1)
                changeDirection()
                score++
                scoreDisplay.textContent = score
            } if(hardBlocks[i].lifes > 1){
                console.log(hardBlocks[i].lifes)
                hardBlocks[i].lifes --
                console.log(hardBlocks[i].lifes)
                changeDirection()
            }
        }

        //check for win
        if(blocks.length === 0){
            scoreDisplay.textContent = "YOU WIN"
            clearInterval(timerId)
            document.removeEventListener('keydown', moveUser)
        }
    }

    //check for wall collisions
     if(ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[0] < 0 ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter)){
        changeDirection()
     }



      //check for user collisions


    if(
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + userWidth)
        &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + userHeight)    
    ){
        changeDirection()
    }


    // check for game over


    if (ballCurrentPosition[1] <= 0){
        clearInterval(timerId)
        scoreDisplay.textContent = "GAME OVER"
        document.removeEventListener("keydown", moveUser)
    }
}


 

function changeDirection(){
    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }
}

addBlocks()