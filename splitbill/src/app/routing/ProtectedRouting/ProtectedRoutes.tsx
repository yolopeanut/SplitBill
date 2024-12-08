import useAuthContext from "../../../modules/core/auth/hooks/useAuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../../modules/core/common/components/Loading";
import useUserContext from "../../../modules/features/login/hooks/useUserContext";

export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
	const { session, isLoading } = useAuthContext();
	const { hasCreatedProfile, getUserById } = useUserContext();
	const location = useLocation();

	if (isLoading || getUserById.isLoading) return <Loading />;
	else {
		// If user has not created profile and is not on create profile page, navigate to create profile page
		if (!hasCreatedProfile && location.pathname !== "/create-profile")
			return <Navigate to='/create-profile' />;
		// If user is not logged in, navigate to login page
		else if (!session) return <Navigate to='/' />;
		// If user is logged in, return children
		else return <>{children}</>;
	}
};
