import { Route, Routes } from "react-router-dom";
import LoginPage from "../../modules/features/login/LoginPage";
import { ProtectedRoutes } from "./ProtectedRouting/ProtectedRoutes";
import GroupsPage from "../../modules/features/groups/GroupsPage";
import ProfilePage from "../../modules/features/profile/ProfilePage";
import FriendsPage from "../../modules/features/friends/FriendsPage";
import CreateProfilePage from "../../modules/features/login/create-profile/CreateProfilePage";
import AddFriendPage from "../../modules/features/friends/add-friends/AddFriendPage";

export const RouteController = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<LoginPage />}
			/>
			<Route
				path='/create-profile'
				element={
					<ProtectedRoutes>
						<CreateProfilePage />
					</ProtectedRoutes>
				}
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
			<Route
				path='/friends/add-friends'
				element={
					<ProtectedRoutes>
						<AddFriendPage />
					</ProtectedRoutes>
				}
			/>
		</Routes>
	);
};
