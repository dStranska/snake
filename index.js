const game = document.getElementById('game');
const gameContext = game.getContext('2d');



window.onload = () => {
    gameLoop();
}

function gameLoop() {
    setInterval(show, 1000 / 15);
}

function show() {
    /**UPDATE */
    if (snake.dirX == 1) {
        snake.x += snake.itemSize;
    } else if (snake.dirX == -1) {
        snake.x -= snake.itemSize;
    } else if (snake.dirY == 1) {
        snake.y += snake.itemSize;
    } else if (snake.dirY == -1) {
        snake.y -= snake.itemSize;
    }
    snake.move();

    /**CHECK */
    if (snake.x >= game.width) {
        snake.x = 0;
    }else if (snake.x < 0) {
        snake.x = game.width-snake.itemSize;
    }
    else if (snake.y >= game.height) {
        snake.y = 0;
    }
    else if (snake.y < 0) {
        snake.y = game.height-snake.itemSize;
    }

    /***DRAW */
    //draw game
    creatSquere(0, 0, game.width, game.height, 'gray')

    //draw hada
   // creatSquere(snake.x, snake.y, 15, 15, 'black')


    snake.body.forEach((element) => {
        creatSquere(element.x+2.5, element.y+2.5, snake.itemSize - 5, snake.itemSize - 5, 'yellow')
    });



    //draw apple
    creatSquere(apple.x+2.5, apple.y+2.5, apple.itemSize, apple.itemSize, 'red')
    
    //draw score
    gameContext.font = "20px Arial"
    gameContext.fillStyle = "#00FF42"
    gameContext.fillText("Score: " + (snake.body.length-1),game.width - 120, 18)
    
    checkApple();
}


function checkApple(){
    if(snake.x==apple.x && snake.y==apple.y){
        snake.add()

        apple.x=Math.floor(Math.random() * 29)*20;
        apple.y=Math.floor(Math.random() * 29)*20;
        console.log(apple)
    }
}

function creatSquere(x, y, width, height, color) {
    gameContext.fillStyle = color;
    gameContext.fillRect(x, y, width, height);

}

class Snake {
    constructor() {
        this.x = 20;
        this.y = 20;
        this.dirX = 1;
        this.dirY = 0;
        this.itemSize = 20;
        this.body = [{x:this.x,y:this.y}]
        this.last = null
    }

    move() {
        this.body.unshift({ x: this.x, y: this.y })
        this.body.pop();
    }
    add() {
        if(!this.last){
            this.last={x:this.x,y:this.y}
        }
        let newItem = { x: this.last.x, y: this.last.y }
        if (this.dirX == 1) {
            newItem.x = this.last.x - this.itemSize;
        } else if (this.dirX == -1) {
            newItem.x = this.last.x + this.itemSize;
        } else if (this.dirY == 1) {
            newItem.y = this.last.y - this.itemSize;
        } else if (this.dirY == -1) {
            newItem.y = this.last.y + this.itemSize;
        }
        this.last = newItem;
        this.body.push(newItem)
    }

}
class Apple{
    constructor(){
        this.x=20;
        this.y=40;
        this.itemSize = 15;
    }
}
document.addEventListener('keydown', (event) => {
    if (event.keyCode == 37) {
        snake.dirY = 0;
        snake.dirX = -1;
    } else if (event.keyCode == 39) {
        snake.dirY = 0;
        snake.dirX = 1;
    } else if (event.keyCode == 40) {
        snake.dirY = 1;
        snake.dirX = 0;
    } else if (event.keyCode == 38) {
        snake.dirY = -1;
        snake.dirX = 0;
    }
});
const snake = new Snake();
const apple= new Apple();