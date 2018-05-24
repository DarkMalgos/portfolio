function pong() {
    let animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60)
        },
        canvas = document.createElement("canvas"),
        width = document.body.offsetWidth,
        height = document.body.offsetHeight
    canvas.setAttribute('id', 'game')
    canvas.width = width
    canvas.height = height
    let context = canvas.getContext('2d'),
        player = new Player(),
        computer = new Computer(),
        ball = new Ball(width / 2, height / 2),
        keysDown = {}

    function render() {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);
        player.render();
        computer.render();
        ball.render();
    }

    function update() {
        player.update(ball, computer);
        computer.update(ball);
        ball.update(player.paddle, computer.paddle);
    }

    function step() {
        update();
        render();
        animate(step);
    }

    function Paddle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x_speed = 0;
        this.y_speed = 0;
    }

    Paddle.prototype.render = function () {
        context.fillStyle = "#000000";
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    Paddle.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
        this.x_speed = x;
        this.y_speed = y;
        if (this.x < 0) {
            this.x = 0;
            this.x_speed = 0;
        } else if (this.x + this.width > width) {
            this.x = width - this.width;
            this.x_speed = 0;
        }
    }

    function Computer() {
        this.paddle = new Paddle(width / 2.1, 10, 50, 10);
    }

    Computer.prototype.render = function () {
        this.paddle.render();
    }

    Computer.prototype.update = function (ball) {
        var x_pos = ball.x;
        var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
        if (diff < 0 && diff < -4) {
            diff = -5;
        } else if (diff > 0 && diff > 4) {
            diff = 5;
        }
        this.paddle.move(diff, 0);
        if (this.paddle.x < 0) {
            this.paddle.x = 0;
        } else if (this.paddle.x + this.paddle.width > width) {
            this.paddle.x = width - this.paddle.width;
        }
    }

    function Player() {
        this.paddle = new Paddle(width / 2.1, 580, 50, 10);
    }

    Player.prototype.render = function () {
        this.paddle.render();
    }

    Player.prototype.update = function (ball, computer) {
        for (var key in keysDown) {
            var value = Number(key);
            if (value == 37) {
                this.paddle.move(-4, 0);
            } else if (value == 39) {
                this.paddle.move(4, 0);
            } else {
                this.paddle.move(0, 0);
            }
        }
    }

    function Ball(x, y) {
        this.x = x;
        this.y = y;
        this.x_speed = 0;
        this.y_speed = 3;
    }

    Ball.prototype.render = function () {
        context.beginPath();
        context.arc(this.x, this.y, 5, 2 * Math.PI, false);
        context.fillStyle = "#000000";
        context.fill();
    }

    Ball.prototype.update = function (paddle1, paddle2) {
        this.x += this.x_speed;
        this.y += this.y_speed;
        var top_x = this.x - 5;
        var top_y = this.y - 5;
        var bottom_x = this.x + 5;
        var bottom_y = this.y + 5;

        if (this.x - 5 < 0) {
            this.x = 5;
            this.x_speed = -this.x_speed;
        } else if (this.x + 5 > width) {
            this.x = width - 5;
            this.x_speed = -this.x_speed;
        }

        if (this.y < 0) {
            //player score + 1
            paddle1.x = width / 2.1
            console.log('player score + 1')
        }

        if (this.y > height) {
            //computer score + 1
            paddle1.x = width / 2.1
            console.log('computer score + 1')
        }

        if (this.y < 0 || this.y > height) {
            this.x_speed = 0;
            this.y_speed = 3;
            this.x = width / 2;
            this.y = height / 2;
        }

        if (top_y > 300) {
            if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
                this.y_speed = -3;
                this.x_speed += (paddle1.x_speed / 2);
                this.y += this.y_speed;
            }
        } else {
            if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
                this.y_speed = 3;
                this.x_speed += (paddle2.x_speed / 2);
                this.y += this.y_speed;
            }
        }
    }

    document.querySelector('#pong').appendChild(canvas);
    animate(step);

    window.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
    });

    window.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];
    });
}
pong()
//@TODO faire le pause avec space
window.addEventListener("keyup", function (event) {
    if (event.keyCode == 32) {
        document.querySelector('#pong').removeChild(document.querySelector('#game'))
        pong()
    }
})
