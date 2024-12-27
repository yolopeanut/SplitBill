import Loading from "../../../../../../../core/common/components/Loading";
import useGetAllFriends from "../../../../../../groups/selected-group/edit-group/components/edit-group-page-body/components/drawers/select-users-input/hooks/useGetAllFriends";
import useUserContext from "../../../../../../login/hooks/useUserContext";
import useSearchFriends from "../../../../hooks/useSearchFriends";
import FriendCard from "../../../FriendCard";
import NoUserFoundBody from "../no-user-found-body/NoUserFoundBody";

interface SearchQueryBodyProps {
    searchQuery: string;
}

const SearchQueryBody = ({ searchQuery }: SearchQueryBodyProps) => {
    const { data, isLoading, isError } = useSearchFriends(searchQuery);
    const { currentUser } = useUserContext();
    const currFriends = useGetAllFriends();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        throw new Error("Error searching for friends");
    }

    const filteredUsers = data?.filter((user) => {
        return (
            user.unique_username !== currentUser?.unique_username &&
            !currFriends.data?.some((friend) => friend.id === user.id)
        );
    });

    if (!filteredUsers || filteredUsers.length === 0) {
        return <NoUserFoundBody />; // Return null if no users are found
    }

    return filteredUsers.map((user) => {
        return (
            <FriendCard
                key={user.id}
                id={user.id}
                name={user.name}
                uniqueUsername={user.unique_username}
                imgSrc={user.profile_img_url}
            />
        );
    });
};

export default SearchQueryBody;
