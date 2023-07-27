import { Container } from "@mui/material";
import "./App.css";
import GameBox from "./components/GameBox";

function App() {
	return (
		<Container
			sx={{
				height: "100%",
				display: "flex",
				alignItems: "center",
			}}>
			<GameBox></GameBox>
		</Container>
	);
}

export default App;
