class Game {
	constructor(id, snake, food) {
		this.map = document.querySelector(id);
		//行数
		this.rows = 20;
		//列数
		this.columns = 20;
		//大小
		this.size = 25;
		//得分
		this.score = 0;
		//最高分
		this.maxScore = 0;
		//暂停
		this.isStop = false;
		//获取start button
		this.startBut = document.querySelector("#start");
		this.startTimer = null;
		this.snake = snake;

		this.food = food;
		//地图的数组
		this.mapArray = [];
		//初始化
		this.init();
	}
	init() {
		this.map.className = "game";
		this.map.style.width = this.column * this.size + "px";
		this.map.style.height = this.row * this.size + "px";
		//渲染地图
		this.renderMap();
		//渲染蛇
		this.renderSnake();
		//渲染食物
		this.renderFood();
		//开始
		this.start(this.snake.snakeArray);
	}
	//渲染地图
	renderMap() {
		for (let i = 0; i < this.rows; i++) {
			let row = document.createElement("div");
			row.className = "row";
			let rowArray = [];
			for (let j = 0; j < this.columns; j++) {
				let column = document.createElement("div");
				column.className = "column";
				row.appendChild(column);
				rowArray.push(column);
			}
			this.map.appendChild(row);
			this.mapArray.push(rowArray);
		}
	}

	//渲染蛇
	renderSnake() {
		//渲染蛇头
		switch (this.snake.direction) {
			case 38: {
				this.mapArray[this.snake.snakeArray[0].row][
					this.snake.snakeArray[0].column
				].style.backgroundImage = "url('./images/head_top.png')";
				break;
			}
			case 40: {
				this.mapArray[this.snake.snakeArray[0].row][
					this.snake.snakeArray[0].column
				].style.backgroundImage = "url('./images/head_bottom.png')";
				break;
			}
			case 37: {
				this.mapArray[this.snake.snakeArray[0].row][
					this.snake.snakeArray[0].column
				].style.backgroundImage = "url('./images/head_left.png')";
				break;
			}

			case 39: {
				this.mapArray[this.snake.snakeArray[0].row][
					this.snake.snakeArray[0].column
				].style.backgroundImage = "url('./images/head_right.png')";
				break;
			}
		}

		//渲染蛇身
		for (let i = 1; i < this.snake.snakeArray.length; i++) {
			this.mapArray[this.snake.snakeArray[i].row][
				this.snake.snakeArray[i].column
			].style.backgroundColor = "#24e063";
		}
	}
	//渲染食物
	renderFood() {
		this.mapArray[this.food.row][this.food.column].style.backgroundImage =
			"url('./images/apple.svg')";
	}
	//判断食物是否被吃
	isEaten() {
		if (
			this.food.row === this.snake.snakeArray[0].row &&
			this.food.column === this.snake.snakeArray[0].column
		)
			return true;
	}

	//让蛇动起来
	start(snakeArray) {
		document.querySelector("#max-score").innerHTML = this.maxScore;
		this.addEvent();
		this.startTimer = setInterval(() => {
			const context = this;
			this.snake.move(snakeArray);
			//是否撞墙或者自杀
			//撞墙或者自杀就结束游戏
			if (
				isKnockedEdges(snakeArray, this.mapArray) ||
				suicide(snakeArray)
			) {
				if (this.score > this.maxScore) {
					this.maxScore = this.score;
					document.querySelector("#max-score").innerHTML =
						this.maxScore;
				}
				document.getElementById("game-over").style.display = "block";
				clearInterval(this.startTimer);
				this.startBut.addEventListener("click", startClick);
				window.removeEventListener("keydown", directionEvent);
				window.addEventListener("keydown", spaceEvent);
				this.score = 0;
				document.querySelector("#score").innerHTML = this.score;

				return;
			}
			//食物被吃之后做
			if (this.isEaten()) {
				this.mapArray[this.food.row][
					this.food.column
				].style.backgroundImage = "";
				foodPosition.call(this.food);
				this.snake.snakeArray.push(this.snake.tail);
				document.querySelector("#score").innerHTML = ++this.score;
			}

			//这里清除原来的蛇头
			this.mapArray[this.snake.head.row][
				this.snake.head.column
			].style.backgroundImage = "";

			clear(this.mapArray);
			this.renderSnake();
			this.renderFood();

			//空格监听事件
			function spaceEvent(event) {
				if (event.keyCode === 32) {
					reset.call(context);
					this.removeEventListener("keydown", spaceEvent);
				}
			}

			//开始按钮监听事件
			function startClick() {
				reset.call(context);
				this.removeEventListener("click", startClick);
			}
		}, 110);
	}

	addEvent() {
		window.addEventListener("keydown", directionEvent.bind(this));
	}
}

new Game("#app", new Snake(), new Food());
