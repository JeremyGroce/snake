// board
var blockSize = 23;
var rows = 20;
var cols = 20;
var board;
var context;

var foodImage = new Image();
foodImage.src = "./assets/food.png";
var gameLoop;


// Misc
var score = 0;
var gameOver = false;

let isPaused = false;

// snake head starting position
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

// window.onload means to execute once all other HTML, 
// CSS, JavaScript, images, and SRCs have finished loading
window.onload = function()
{
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    // start game in response to key press
    document.addEventListener("keydown",keyReader);
    
    
    
    //Runs interval until gameOver stops it
    gameLoop = setInterval(update, 1000/10);


}

function update()
{
    if(gameOver)
    {
        clearInterval(gameLoop);
        // toggle game over screen
        //-------
        return;
    }

    var squareSize = blockSize;

// Loop to draw the chessboard background
for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
        if ((row + col) % 2 === 0) {
            // Light green square
            context.fillStyle = "#aad751";
        } else {
            // Slightly darker green square
            context.fillStyle = "#a2d149";
        }
        context.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
    }
}

// Draw Food
context.drawImage(foodImage, foodX, foodY, blockSize, blockSize*1);


document.getElementById("score").innerHTML = score;

// Snake Eats food
if(snakeX == foodX && snakeY == foodY)
{
    // promise to prevent update() from waiting
    playBiteSound()
    .then(result => console.log(result))
    .catch(error => console.error(error));

    
    snakeBody.push([foodX, foodY]);
    placeFood();
    score++;
}

    // updates the movement to follow the previous snake addition
    for(let i = snakeBody.length-1; i> 0; i--)
    {
        snakeBody[i] = snakeBody[i-1];
    }

    // makes the first addition of the chain follow the head
    if(snakeBody.length)
    {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "#4573e8";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    for(let i = 0; i< snakeBody.length; i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // gameOver on condition of hitting border
    if(snakeX < 0 || snakeX >= cols*blockSize || snakeY < 0 || snakeY >= rows*blockSize)
    {
        playDeathSound();
        gameOver = true;
    }

    // gameOver on condition of hitting body
    for(let i = 0; i<snakeBody.length; i++)
    {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1])
        {
            playDeathSound();
            gameOver = true;
        } 
    }

}

function keyReader(e)
{
    if(e.code == "ArrowUp" && velocityY != 1 && isPaused == false)
    {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1 && isPaused == false)
    {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1 && isPaused == false)
    {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX !=-1 && isPaused == false)
    {
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.code === "KeyP")
    {
        isPaused = !isPaused;   // Toggle Pause
        var popUp = document.getElementById("pause");

        if(isPaused)    //if true
        {
            clearInterval(gameLoop); // Stop game updates
            popUp.classList.toggle("visible");
            // Toggle CS pop-up screen
        }
        else
        {
            popUp.classList.toggle("visible");
            gameLoop = setInterval(update, 1000 / 10); // Start the game loop again
        }

    }
}
// spawn the food randomly
function placeFood()
{
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    context.drawImage(foodImage, foodX, foodY, blockSize, blockSize);

}

function playDeathSound(){
    var deathSound = document.getElementById("death")
    deathSound.play();
}

// plays 1 of 3 bite sounds
function playBiteSound() {
    return new Promise((resolve, reject) => {
        switch (Math.floor(Math.random() * 3) + 1) {
            case 1:
                var biteSound1 = document.getElementById("bite1");
                biteSound1.play();
                biteSound1.onended = () => resolve("Bite 1 sound played");
                break;
            case 2:
                var biteSound2 = document.getElementById("bite2");
                biteSound2.play();
                biteSound2.onended = () => resolve("Bite 2 sound played");
                break;
            case 3:
                var biteSound3 = document.getElementById("bite3");
                biteSound3.play();
                biteSound3.onended = () => resolve("Bite 3 sound played");
                break;
            default:
                reject("Sound couldn't be played");
        }
    });
}
