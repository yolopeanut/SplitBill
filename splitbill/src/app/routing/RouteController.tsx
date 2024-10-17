import { Route, Routes } from "react-router-dom";
import LoginPage from "../../modules/features/login/LoginPage";
import { ProtectedRoutes } from "./ProtectedRouting/ProtectedRoutes";
import GroupsPage from "../../modules/features/groups/GroupsPage";
import ProfilePage from "../../modules/features/profile/ProfilePage";
import FriendsPage from "../../modules/features/friends/FriendsPage";

export const RouteController = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<LoginPage />}
			/>
			<Route
				path='/groups'
				element={
					<ProtectedRoutes>
						<GroupsPage />
					</ProtectedRoutes>
				}
			/>
			<Route
				path='/profile'
				element={
					<ProtectedRoutes>
						<ProfilePage />
					</ProtectedRoutes>
				}
			/>
			<Route
				path='/friends'
				element={
					<ProtectedRoutes>
						<FriendsPage />
					</ProtectedRoutes>
				}
			/>
		</Routes>
	);
};
