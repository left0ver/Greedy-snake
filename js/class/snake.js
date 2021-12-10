class Snake {
	constructor() {
		this.snakeArray = [
			{ row: 10, column: 10 },
			{ row: 10, column: 9 },
			{ row: 10, column: 8 },
		];
		this.tail = null;
		this.head = null;
		// 右 39  左37  上38  下40
		this.direction = 39;
	}
	//蛇移动
	move(snakeArray) {
		this.tail = snakeArray.pop();
		this.head = snakeArray[0];
		if (this.direction == 39) {
			snakeArray.unshift({
				row: snakeArray[0].row,
				column: snakeArray[0].column + 1,
			});
		}
		if (this.direction == 40) {
			snakeArray.unshift({
				row: snakeArray[0].row + 1,
				column: snakeArray[0].column,
			});
		}
		if (this.direction == 38) {
			snakeArray.unshift({
				row: snakeArray[0].row - 1,
				column: snakeArray[0].column,
			});
		}
		if (this.direction == 37) {
			snakeArray.unshift({
				row: snakeArray[0].row,
				column: snakeArray[0].column - 1,
			});
		}
	}

	//改变蛇的方向
	changeDirection(direction) {
		switch (direction) {
			case 37:
			case 39: {
				if (this.direction == 38 || this.direction == 40) {
					this.direction = direction;
				}
				break;
			}
			case 38:
			case 40: {
				if (this.direction == 37 || this.direction == 39) {
					this.direction = direction;
				}
				break;
			}
		}
	}
}
