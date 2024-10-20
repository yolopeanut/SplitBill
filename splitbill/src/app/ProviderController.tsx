import { AuthProvider } from "../modules/core/auth/contexts/AuthContext";
import { FriendsProvider } from "../modules/features/friends/context/FriendsContext";
import { UserProvider } from "../modules/features/login/contexts/UserContext";

export default function ProviderController({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<UserProvider>
				<FriendsProvider>{children}</FriendsProvider>
			</UserProvider>
		</AuthProvider>
	);
}
