import { Route, Routes } from "react-router-dom";
import LoginPage from "../../modules/features/login/LoginPage";
import { ProtectedRoutes } from "./ProtectedRouting/ProtectedRoutes";
import GroupsPage from "../../modules/features/groups/GroupsPage";
import ProfilePage from "../../modules/features/profile/ProfilePage";
import FriendsPage from "../../modules/features/friends/FriendsPage";
import CreateProfilePage from "../../modules/features/login/create-profile/CreateProfilePage";
import AddFriendPage from "../../modules/features/friends/add-friends/AddFriendPage";
import SelectedGroupPage from "../../modules/features/groups/selected-group/SelectedGroupPage";
import CreateTransactionPage from "../../modules/features/groups/selected-group/create-transaction/CreateTransactionPage";

export const RouteController = () => {
	return (
		<Routes>
			{/* Login */}
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

			{/* Groups */}

			<Route
				path='/groups'
				element={
					<ProtectedRoutes>
						<GroupsPage />
					</ProtectedRoutes>
				}
			/>
			<Route
				path='/groups/:groupId'
				element={
					<ProtectedRoutes>
						<SelectedGroupPage />
					</ProtectedRoutes>
				}
			/>
			<Route
				path='/groups/:groupId/create-transaction'
				element={
					<ProtectedRoutes>
						<CreateTransactionPage />
					</ProtectedRoutes>
				}
			/>

			{/* Profile */}
			<Route
				path='/profile'
				element={
					<ProtectedRoutes>
						<ProfilePage />
					</ProtectedRoutes>
				}
			/>

			{/* Friends */}
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
