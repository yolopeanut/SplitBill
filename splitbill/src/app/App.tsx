import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ProviderController from "./ProviderController";
import { RouteController } from "./routing/RouteController";
import BottomNav from "../modules/core/common/BottomNav";

function App() {
	return (
		<>
			<Router>
				<ProviderController>
					<RouteController />
				</ProviderController>
				<BottomNav />
			</Router>
		</>
	);
}

export default App;
