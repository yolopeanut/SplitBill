import AddFriendPageHeader from "./components/add-friend-page-header/AddFriendPageHeader";
import AddFriendPageBody from "./components/add-friend-page-body/AddFriendPageBody";
import { useState } from "react";

const AddFriendPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <>
            <div className='flex flex-col gap-4 px-4 pt-8 h-full'>
                <AddFriendPageHeader setSearchQuery={setSearchQuery} />
                <AddFriendPageBody searchQuery={searchQuery} />
            </div>
        </>
    );
};

export default AddFriendPage;
