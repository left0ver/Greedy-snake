//撞墙了
const isKnockedEdges = (snakeArray, mapArray) => {
	if (
		snakeArray[0].row < 0 ||
		snakeArray[0].row >= mapArray.length ||
		snakeArray[0].column < 0 ||
		snakeArray[0].column >= mapArray[0].length
	)
		return true;
};

const suicide = snakeArray => {
	//自杀了
	return snakeArray
		.slice(1)
		.some(
			(value, index) =>
				value.row === snakeArray[0].row &&
				value.column === snakeArray[0].column
		);
};
