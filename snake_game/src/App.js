import { Box, Container, Typography } from "@mui/material";
import "./App.css";
import GameBox from "./components/GameBox";
import { useState } from "react";

function App() {
	const [score, setScore] = useState(1);
	const [level, setLevel] = useState(0);
	return (
		<Container
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			<GameBox setScore={setScore} setLevel={setLevel} score={score}></GameBox>
			<Box
				sx={{
					width: "100%",
					marginTop: "1rem",
					display: "flex",
					justifyContent: "space-between",
					// border: "1px solid black",
				}}>
				<Typography className="display-text">Score: {score}</Typography>
				<Typography className="display-text">Worm: {level}</Typography>
			</Box>
		</Container>
	);
}

export default App;
