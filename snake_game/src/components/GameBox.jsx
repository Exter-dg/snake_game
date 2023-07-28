import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const rows = 20;
const cols = 30;
const keys = {
	ArrowDown: { x: 1, y: 0 },
	ArrowUp: { x: -1, y: 0 },
	ArrowLeft: { x: 0, y: -1 },
	ArrowRight: { x: 0, y: 1 },
};
let interval;
let intervalDuration = 200;

export default function GameBox() {
	const [checked, setChecked] = useState([]);
	const [snakeHead, setSnakeHead] = useState({ x: 0, y: 0 });
	const [status, setStatus] = useState(true);
	const [food, setFood] = useState({ x: 5, y: 5 });
	const [direction, setDirection] = useState({ x: 0, y: 1 });

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		interval = setIntervalHelper();

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		// Check whether user has lost game;
		if (
			snakeHead.x < 0 ||
			snakeHead.y < 0 ||
			snakeHead.x >= rows ||
			snakeHead.y >= cols
		) {
			setStatus(false);
			return;
		}

		if (
			checked.length > 1 &&
			checked.find((obj) => obj.x === snakeHead.x && obj.y === snakeHead.y)
		) {
			setStatus(false);
			return;
		}

		// If snake eats new food -> add length
		if (snakeHead.x === food.x && snakeHead.y === food.y) {
			// setChecked([...checked, { ...snakeTail }]);

			generateFoodLocation();
		} else {
			// Move snake
			// checked.pop();
			setChecked((prevChecked) => {
				prevChecked = prevChecked.slice(1);
				return prevChecked;
			});
		}
		setChecked((prevChecked) => {
			return [...prevChecked, { ...snakeHead }];
		});
	}, [snakeHead]);

	useEffect(() => {
		if (status === false) {
			alert(`You Lost! Your score is ${checked.length}`);
			setChecked([]);
			setSnakeHead({ x: 0, y: 0 });
			setStatus(true);
			setDirection({ x: 0, y: 1 });
			intervalDuration = 500;
		}
	}, [status]);

	// When Direction changes, change the interval
	useEffect(() => {
		clearInterval(interval);
		interval = setIntervalHelper();
	}, [direction]);

	const handleKeyDown = (e) => {
		if (!(e.code in keys)) return;
		setDirection({ ...keys[e.code] });

		// setSnakeHead((prevVal) => {
		// 	return {
		// 		x: prevVal.x + keys[e.code].x,
		// 		y: prevVal.y + keys[e.code].y,
		// 	};
		// });
	};

	const generateFoodLocation = () => {
		// Decrease interval snake length increases
		if (intervalDuration > 50) intervalDuration -= 10;

		let x = food.x;
		let y = food.y;

		while (
			(x === food.x && y === food.y) ||
			checked.find((obj) => obj.x === x && obj.y === y)
		) {
			x = Math.floor(Math.random() * rows);
			y = Math.floor(Math.random() * cols);
		}
		setFood({ x, y });
	};

	const setIntervalHelper = () => {
		return setInterval(() => {
			setSnakeHead((prevVal) => {
				return {
					x: prevVal.x + direction.x,
					y: prevVal.y + direction.y,
				};
			});
		}, intervalDuration);
	};

	return (
		<Box className="game-box">
			{[...Array(rows)].map((_, idx) => {
				return (
					<Box className="row" key={idx}>
						{[...Array(cols)].map((_, idx2) => {
							return (
								<Box
									component="span"
									className={
										(food.x === idx && food.y === idx2
											? "food"
											: snakeHead.x === idx && snakeHead.y === idx2
											? "snake-head"
											: checked.find((obj) => obj.x === idx && obj.y === idx2)
											? "cell-selected"
											: "cell") + " cell-common"
									}
									key={idx2}></Box>
							);
						})}
					</Box>
				);
			})}
		</Box>
	);
}
