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

export default function GameBox() {
	const [checked, setChecked] = useState([]);
	const [snakeHead, setSnakeHead] = useState({ x: 0, y: 0 });
	const [status, setStatus] = useState(true);

	const handleKeyDown = (e) => {
		if (!(e.code in keys)) return;
		console.log(e.code);
		setSnakeHead((prevVal) => {
			return {
				x: prevVal.x + keys[e.code].x,
				y: prevVal.y + keys[e.code].y,
			};
		});
	};

	useEffect(() => {
		console.log("Document Loaded");
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		console.log(snakeHead);

		// Check whether user has lost game;
		if (
			snakeHead.x < 0 ||
			snakeHead.y < 0 ||
			snakeHead.x >= rows ||
			snakeHead.y >= cols
		) {
			console.log("here");
			setStatus(false);
			return;
		}

		if (checked.find((obj) => obj.x === snakeHead.x && obj.y === snakeHead.y)) {
			setStatus(false);
			return;
		}

		setChecked([...checked, { ...snakeHead }]);
	}, [snakeHead]);

	useEffect(() => {
		if (status === false) {
			alert(`You Lost! Your score is ${checked.length}`);
			setChecked([]);
			setSnakeHead({ x: 0, y: 0 });
			setStatus(true);
		}
	}, [status]);

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
										(snakeHead.x === idx && snakeHead.y === idx2
											? "snake-head"
											: checked.find((obj) => obj.x === idx && obj.y === idx2)
											? "cell-selected"
											: "cell") + " cell-common"
									}
									onClick={() => {
										console.log(checked, idx, idx2);
										checked.map((obj) => {
											console.log(obj.x, idx);
										});
									}}
									key={idx2}></Box>
							);
						})}
					</Box>
				);
			})}
		</Box>
	);
}
