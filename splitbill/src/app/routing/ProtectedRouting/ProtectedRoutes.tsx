import useAuthContext from "../../../modules/core/auth/hooks/useAuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
	const { session, isLoading } = useAuthContext();

	if (isLoading) return <div>Loading...</div>;

	return <>{session ? children : <Navigate to='/' />}</>;
};
