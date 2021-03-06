const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/background.jpg";

const foodImg = new Image();
foodImg.src = "img/foodFirst.png";

const snakeBody = new Image();
snakeBody.src = "img/snakeBody.png";

const snakeHead = new Image();
snakeHead.src = "img/snakeHead.png";

const borderTop = new Image();
borderTop.src = "img/borderTop.png";

function customize(){
    let foodpicture = document.getElementsByName("food");
    for (let i = 0; i<foodpicture.length; i++) {
        if(foodpicture[i].checked){
            foodImg.src = foodpicture[i].value;
            // console.log(foodpicture[i].value);
        }
    }
    let snakePicture = document.getElementsByName("snakeType");
    for (let i = 0; i < snakePicture.length; i++) {
        if(snakePicture[i].checked.value == "firstSnake"){
            snakeHead.src = "img/snakeHead.png";
            snakeBody.src = "img/snakeBody.png";
            }
            else {
                snakeHead.src = "img/snakeHeadSecond.png";
                snakeBody.src = "img/snakeBodySecond.png";
            }
    }
}

let alertText;

let box = 32;

let score = 0;

let food = {
    x: Math.floor(Math.random() * 17) * box,
    y: Math.floor(Math.random() * 17 + 1) * box
}

let snake = [];

snake[0] = {
    x: 9 * box, 
    y: 9 * box
}

document.addEventListener("keydown", direction);

let dir;

function direction(event){
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if(event.keyCode == 38 && dir != "down")
        dir = "up";
    else if(event.keyCode == 39 && dir != "left")
        dir = "right";
    else if(event.keyCode == 40 && dir != "up")
        dir = "down";
}

function eatTail(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y){
            endGame();
    }
        
    }
}

function drawGame(){

    ctx.drawImage(ground , 0, 0);
    ctx.drawImage(borderTop, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++){
        if (i) {
            // ctx.fillStyle = "lightgreen";
            // ctx.fillRect(snake[i].x, snake[i].y, box, box);}
            ctx.drawImage(snakeBody, snake[i].x, snake[i].y)}
        else {
            ctx.drawImage(snakeHead, snake[i].x, snake[i].y);
            // ctx.fillStyle = "grey";
            // ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }
    }

    ctx.fillStyle = "black";
    ctx.font = "25px Arial";
    ctx.fillText("Score: " + score, box, box * 0.8);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random() * 17) * box,
            y: Math.floor(Math.random() * 17 + 1) * box
        }
    } else {
        snake.pop();
    }

    if (snakeX < 0 || snakeX > box * 18 || snakeY < box || snakeY > box * 18)
        {
            endGame();
        }

    let newHead = {
            x: snakeX,
            y: snakeY
    };

    

    if (dir == "left") newHead.x -= box;
    if (dir == "right") newHead.x += box;
    if (dir == "up") newHead.y -= box;
    if (dir == "down") newHead.y += box;

    eatTail(newHead, snake);

    
    snake.unshift(newHead);
}


let game = setInterval(drawGame,100);

function endGame(){

    clearInterval(game); 
    let mes = document.getElementById("message");
    mes.innerText = "You lose. Your score: " + score;
    mes.style.cssText = "background-color: darkred;";
    
}
function StartNewGame(){
    
    clearInterval(game); 
    snake = [];
    snake[0] = {
    x: 9 * box, 
    y: 9 * box
    }
    dir = null;
    score = 0;
    let mes = document.getElementById("message");
    mes.innerText = "You can play";
    mes.style.cssText = "background-color: green;";
    game = setInterval(drawGame,100);

}

$(document).on("click", ".naccs .menu div", function() {
	var numberIndex = $(this).index();

	if (!$(this).is("active")) {
		$(".naccs .menu div").removeClass("active");
		$(".naccs ul li").removeClass("active");

		$(this).addClass("active");
		$(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

		var listItemHeight = $(".naccs ul")
			.find("li:eq(" + numberIndex + ")")
			.innerHeight();
		$(".naccs ul").height(listItemHeight + "px");
	}
});