//清除地图
const clear = mapArray => {
	for (let i = 0; i < mapArray.length; i++) {
		for (let j = 0; j < mapArray[i].length; j++) {
			mapArray[i][j].style.backgroundColor = "";
		}
	}
};
