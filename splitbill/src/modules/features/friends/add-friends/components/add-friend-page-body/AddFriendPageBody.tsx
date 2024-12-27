import NoSearchQueryBody from "./components/no-search-query-body/NoSearchQueryBody";
import SearchQueryBody from "./components/search-query-body/SearchQueryBody";

interface AddFriendPageBodyProps {
    searchQuery: string;
}

const AddFriendPageBody = ({ searchQuery }: AddFriendPageBodyProps) => {
    return (
        <div className='h-full flex flex-col gap-4'>
            {searchQuery ? (
                <SearchQueryBody searchQuery={searchQuery} />
            ) : (
                <NoSearchQueryBody />
            )}
        </div>
    );
};

export default AddFriendPageBody;
