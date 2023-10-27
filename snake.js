// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// Misc
// var score = 0;
var gameOver = false;

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
    document.addEventListener("keyup",changeDirection);
    setInterval(update, 1000/10);
}

function update()
{
    if(gameOver)
    {
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
context.fillStyle = "red";
context.fillRect(foodX, foodY, blockSize, blockSize);
// document.getElementById("score").innerHTML = score;

if(snakeX == foodX && snakeY == foodY)
{
    snakeBody.push([foodX, foodY]);
    placeFood();
    // score++;
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
        gameOver = true;
    }

    // gameOver on condition of hitting body
    for(let i = 0; i<snakeBody.length; i++)
    {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1])
        {
            gameOver = true;
        } 
    }

    // **Creates square with curved edges**
    // context.beginPath();    
    // context.moveTo(snakeX + borderRadius, snakeY);
    // context.lineTo(snakeX + blockSize - borderRadius, snakeY);
    // context.arc(snakeX + blockSize - borderRadius, snakeY + borderRadius, borderRadius, -Math.PI / 2, 0, false);
    // context.lineTo(snakeX + blockSize, snakeY + blockSize - borderRadius);
    // context.arc(snakeX + blockSize - borderRadius, snakeY + blockSize - borderRadius, borderRadius, 0, Math.PI / 2, false);
    // context.lineTo(snakeX + borderRadius, snakeY + blockSize);
    // context.arc(snakeX + borderRadius, snakeY + blockSize - borderRadius, borderRadius, Math.PI / 2, Math.PI, false);
    // context.lineTo(snakeX, snakeY + borderRadius);
    // context.arc(snakeX + borderRadius, snakeY + borderRadius, borderRadius, -Math.PI, -Math.PI / 2, false);
    // context.fill();
}

function changeDirection(e)
{
    if(e.code == "ArrowUp" && velocityY != 1)
    {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1)
    {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1)
    {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX !=1)
    {
        velocityX = 1;
        velocityY = 0;
    }
}
// spawn the food randomly
function placeFood()
{
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}