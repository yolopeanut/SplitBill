import { AuthProvider } from "../modules/core/auth/contexts/AuthContext";

export default function ProviderController({ children }: { children: React.ReactNode }) {
	return <AuthProvider>{children}</AuthProvider>;
}
