import { AuthProvider } from "../modules/core/auth/contexts/AuthContext";
import { UserProvider } from "../modules/features/login/contexts/UserContext";

export default function ProviderController({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<UserProvider>{children}</UserProvider>
		</AuthProvider>
	);
}
