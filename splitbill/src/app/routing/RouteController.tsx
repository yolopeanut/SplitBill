import { Route, Routes } from "react-router-dom";
import LoginPage from "../../modules/features/login/LoginPage";
import { ProtectedRoutes } from "./ProtectedRouting/ProtectedRoutes";
import GroupsPage from "../../modules/features/groups/GroupsPage";
import ProfilePage from "../../modules/features/profile/ProfilePage";
import FriendsPage from "../../modules/features/friends/FriendsPage";
import CreateProfilePage from "../../modules/features/login/create-profile/CreateProfilePage";
import AddFriendPage from "../../modules/features/friends/add-friends/AddFriendPage";
import SelectedGroupPage from "../../modules/features/groups/selected-group/SelectedGroupPage";
import EditGroupPage from "../../modules/features/groups/selected-group/edit-group/EditGroupPage";
import CreateTransactionPage from "../../modules/features/groups/selected-group/components/Transactions/create-transaction/CreateTransactionPage";
import CreateGroupPage from "../../modules/features/groups/create-group/CreateGroupPage";
import TransactionDetailPage from "../../modules/features/groups/selected-group/components/Transactions/transaction-details/TransactionDetailPage";
import EditTransactionPage from "../../modules/features/groups/selected-group/components/Transactions/transaction-details/edit-transaction/EditTransactionPage";

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
				path='/groups/create'
				element={
					<ProtectedRoutes>
						<CreateGroupPage />
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
				path='/groups/:groupId/edit-group'
				element={
					<ProtectedRoutes>
						<EditGroupPage />
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
			<Route
				path='/groups/:groupId/transaction-details/:transactionId'
				element={
					<ProtectedRoutes>
						<TransactionDetailPage />
					</ProtectedRoutes>
				}
			/>
			<Route
				path='/groups/:groupId/edit-transaction/:transactionId'
				element={
					<ProtectedRoutes>
						<EditTransactionPage />
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
