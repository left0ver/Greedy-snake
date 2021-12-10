function reset() {
	// 重新开始的时候清除蛇头和蛇身体
	this.mapArray[this.snake.head.row][
		this.snake.head.column
	].style.backgroundImage = "";
	clear(this.mapArray);
	this.snake.snakeArray = [
		{ row: 10, column: 10 },
		{ row: 10, column: 9 },
		{ row: 10, column: 8 },
	];
	this.snake.direction = 39;
	document.getElementById("game-over").style.display = "none";
	this.start(this.snake.snakeArray);
}
