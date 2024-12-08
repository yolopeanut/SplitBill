import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ProviderController from "./ProviderController";
import { RouteController } from "./routing/RouteController";
import BottomNav from "../modules/core/common/components/BottomNav";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../config/ReactQuery";

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Router>
					<ProviderController>
						<RouteController />
						<BottomNav />
					</ProviderController>
				</Router>
			</QueryClientProvider>
		</>
	);
}

export default App;
