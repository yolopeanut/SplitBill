import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ProviderController from "./ProviderController";
import { RouteController } from "./routing/RouteController";

function App() {
	return (
		<>
			<Router>
				<ProviderController>
					<RouteController />
				</ProviderController>
			</Router>
		</>
	);
}

export default App;
