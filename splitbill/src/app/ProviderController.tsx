import { AuthProvider } from "../modules/core/auth/contexts/AuthContext";
import { GroupsProvider } from "../modules/features/groups/context/GroupsContext";
import { UserProvider } from "../modules/features/login/contexts/UserContext";

export default function ProviderController({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<UserProvider>
				<GroupsProvider>{children}</GroupsProvider>
			</UserProvider>
		</AuthProvider>
	);
}
