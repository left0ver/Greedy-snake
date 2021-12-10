//监听方向
function directionEvent(event) {
	let direction = event.keyCode;
	this.snake.changeDirection(direction, this.mapArray);
}
