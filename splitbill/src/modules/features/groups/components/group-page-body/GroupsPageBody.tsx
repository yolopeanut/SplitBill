import Loading from "../../../../core/common/components/Loading";
import { useGetOwnGroups } from "../../hooks/useGetOwnGroups";
import GroupCard from "./components/GroupCard";

const GroupsPageBody = () => {
	const { data: ownGroups, isLoading: isLoadingOwnGroups } = useGetOwnGroups();

	if (isLoadingOwnGroups) {
		return <Loading />;
	}

	return (
		<>
			<div className='flex flex-col gap-12 items-start w-full h-full'>
				<div className='flex flex-col gap-8 w-full items-start'>
					<div className='text-font-white text-lg font-semibold'>All Groups</div>
					<div className='flex flex-col gap-6 w-full pb-20 overflow-y-auto h-[calc(100vh-16rem)]'>
						{ownGroups?.map((group) => (
							<GroupCard
								key={group.id}
								groupId={group.id}
								image_src={group.img_url ?? ""}
								groupName={group.name}
								numMembers={group.num_members ?? 0}
								balance={group.to_pay ?? 0 + (group.to_receive ?? 0)}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default GroupsPageBody;
