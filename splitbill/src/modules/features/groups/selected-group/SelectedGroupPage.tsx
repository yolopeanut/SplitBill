// react
import {
    NavigateFunction,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

// react-icons
import { IoArrowBack } from "react-icons/io5";
import { FaShareSquare } from "react-icons/fa";

// interfaces
import { IAllGroupsTable } from "../../../core/interfaces/all_GroupsTable";
import { formatCurrency } from "../../../core/common/commonFunctions";

// components
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import Badges from "./components/BadgesComponent";
import Transactions from "./components/Transactions/TransactionsComponent";
import Balances from "./components/Balances/BalancesComponent";
import Analytics from "./components/Analytics/AnalyticsComponent";
import DropdownComponent from "./components/DropdownComponent";
import Loading from "../../../core/common/components/Loading";
import useGetHeaderBalances from "./hooks/useGetHeaderBalances";
import GroupImg from "./components/GroupImg";
import { useSelectedGroup } from "./hooks/useSelectedGroup";

// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import LeaveGroupDrawer from "./components/leave-group-drawer/LeaveGroupDrawer";
import AnalyticsTimeframeDrawer from "./components/analytics-timeframe-drawer/AnalyticsTimeframeDrawer";
import AnalyticsGroupOrOwnerDrawer from "./components/analytics-group-or-owner-drawer/AnalyticsGroupOrOwnerDrawer";
import JoinGroupDrawer from "./components/join-group-drawer/JoinGroupDrawer";
import { useGroupsContext } from "../hooks/useGroupsContext";
import useUserContext from "../../login/hooks/useUserContext";
import { APP_URL } from "../../../core/constants/AppUrl";

interface handleEditGroupDropDownProps {
    navigate: NavigateFunction;
    groupId: string;
}

const handleEditGroupDropDown = ({
    navigate,
    groupId,
}: handleEditGroupDropDownProps) => {
    navigate(`/groups/${groupId}/edit-group`);
};

//=========== Selected Group Page ============//
const SelectedGroupPage = () => {
    const {
        selectedGroup,
        isLoading,
        isLoadingAllTransactions,
        isLoadingGroupUsers,
        isLoadingBalances,
    } = useSelectedGroup();
    const [isLeaveGroupDrawerOpen, setIsLeaveGroupDrawerOpen] = useState(false);

    // If loading, show loading screen
    if (
        isLoading ||
        isLoadingAllTransactions ||
        isLoadingGroupUsers ||
        isLoadingBalances
    ) {
        return <Loading />;
    }

    return (
        <>
            <div className='relative flex flex-col h-[calc(100vh-4rem)]'>
                <SelectedGroupHeader
                    selectedGroup={selectedGroup}
                    setIsLeaveGroupDrawerOpen={setIsLeaveGroupDrawerOpen}
                />
                <SelectedGroupBody
                    isLeaveGroupDrawerOpen={isLeaveGroupDrawerOpen}
                    setIsLeaveGroupDrawerOpen={setIsLeaveGroupDrawerOpen}
                />
            </div>
        </>
    );
};
export default SelectedGroupPage;
//=========== Selected Group Page ============//

//=========== Selected Group Header ============//

interface SelectedGroupHeaderProps {
    selectedGroup: IAllGroupsTable | undefined;
    setIsLeaveGroupDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const SelectedGroupHeader = ({
    selectedGroup,
    setIsLeaveGroupDrawerOpen,
}: SelectedGroupHeaderProps) => {
    const navigate = useNavigate();

    // Styling classes for to pay, to receive, and total amounts
    const amountClass = "text-font-white text-sm font-bold";
    const amountTitleClass = "text-font-white text-xs font-light";

    const { totalToPay, totalToReceive } = useGetHeaderBalances();
    const location = useLocation();

    return (
        <>
            <div className='flex flex-col justify-between w-full min-h-48'>
                {/* Header and bg image */}
                <div className='relative flex flex-row justify-between items-center px-4 py-2'>
                    <GroupImg
                        className='brightness-[40%] left-0 -z-10 absolute w-screen h-64 object-cover'
                        img_url={selectedGroup?.img_url ?? undefined}
                    />
                    <button
                        className='p-0 border-none btn'
                        onClick={() => {
                            navigate("/groups");
                        }}
                    >
                        <IoArrowBack size={20} className='text-brand-orange' />
                    </button>
                    <span className='left-1/2 absolute font-semibold text-font-white text-xl -translate-x-1/2'>
                        {selectedGroup?.name}
                    </span>

                    <div className='flex flex-row items-center'>
                        <button
                            className='btn px-0 border-none outline-none'
                            type='button'
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    APP_URL + location.pathname
                                );
                            }}
                        >
                            <FaShareSquare
                                size={20}
                                className='text-brand-orange'
                            />
                        </button>
                        <DropdownComponent
                            editGroup={() =>
                                handleEditGroupDropDown({
                                    navigate,
                                    groupId: selectedGroup?.id || "",
                                })
                            }
                            leaveGroup={() => setIsLeaveGroupDrawerOpen(true)}
                        />
                    </div>
                </div>

                {/* Amounts Bar */}
                <div className='px-4 pt-4'>
                    <div className='flex flex-row justify-between items-center bg-card-gray-dark px-4 py-2 rounded-xl h-16'>
                        <div className='flex flex-col items-center gap-2'>
                            <span className={amountTitleClass}>To pay</span>
                            <span className={amountClass}>
                                {formatCurrency(
                                    Math.abs(totalToPay),
                                    selectedGroup?.currency || ""
                                )}
                            </span>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <span className={amountTitleClass}>To receive</span>
                            <span className={amountClass}>
                                {formatCurrency(
                                    totalToReceive,
                                    selectedGroup?.currency || ""
                                )}
                            </span>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <span className={amountTitleClass}>Total</span>
                            <span className={amountClass}>
                                {formatCurrency(
                                    totalToPay + totalToReceive,
                                    selectedGroup?.currency || ""
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
//=========== Selected Group Header ============//

//=========== Selected Group Body ============//
interface SelectedGroupBodyProps {
    isLeaveGroupDrawerOpen: boolean;
    setIsLeaveGroupDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const SelectedGroupBody = ({
    isLeaveGroupDrawerOpen,
    setIsLeaveGroupDrawerOpen,
}: SelectedGroupBodyProps) => {
    const [selectedBadge, setSelectedBadge] = useState("Transactions");
    const { groupId } = useParams();
    const { groupUsers } = useGroupsContext();
    const { currentUser } = useUserContext();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperClass | null>(null);
    const [isJoinGroupDrawerOpen, setIsJoinGroupDrawerOpen] = useState(false);

    // Handle slide changes and scroll reset
    const handleSlideChange = (swiper: SwiperClass) => {
        const badges = ["Transactions", "Balances", "Analytics"];
        setSelectedBadge(badges[swiper.activeIndex]);
    };

    const handleScroll = useCallback(
        (event: React.UIEvent<HTMLDivElement>) => {
            const scrollPosition = event.currentTarget.scrollTop;

            const timeoutId = setTimeout(() => {
                sessionStorage.setItem(
                    `transactions-scroll-${groupId}`,
                    scrollPosition.toString()
                );
            }, 100);

            return () => clearTimeout(timeoutId);
        },
        [groupId]
    );
    // Add useEffect to restore scroll position on mount
    useEffect(() => {
        const savedScrollPosition = sessionStorage.getItem(
            `transactions-scroll-${groupId}`
        );
        if (savedScrollPosition && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
                parseInt(savedScrollPosition);
        }

        if (groupUsers) {
            // If the user is not in the group (kicked or not in the group), show the join group drawer
            if (
                groupUsers?.find((user) => user.id === currentUser?.id)
                    ?.status === "kicked" ||
                !groupUsers?.find((user) => user.id === currentUser?.id)
            ) {
                console.log("show join group drawer");
                setIsJoinGroupDrawerOpen(true);
            }
        }
    }, [groupId, groupUsers, currentUser]);

    return (
        <>
            <div className='flex flex-row justify-between items-center px-4 pt-4'>
                <Badges
                    selectedBadge={selectedBadge}
                    setSelectedBadge={setSelectedBadge}
                    swiperRef={swiperRef}
                />
            </div>
            <div
                className='flex flex-col gap-4 px-4 pt-4 w-full h-[calc(100vh-16.75rem)] overflow-y-auto'
                onScroll={handleScroll}
                ref={scrollContainerRef}
            >
                <Swiper
                    modules={[]}
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    touchRatio={1}
                    resistance={true}
                    resistanceRatio={0.85}
                    threshold={5}
                    updateOnWindowResize={true}
                    observer={true}
                    observeParents={true}
                    className='w-full h-full'
                >
                    <SwiperSlide className='h-full'>
                        <div className='h-full'>
                            <Transactions />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='h-full'>
                        <div className='h-full'>
                            <Balances />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='h-full'>
                        <div className='h-full'>
                            <Analytics />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <LeaveGroupDrawer
                isLeaveGroupDrawerOpen={isLeaveGroupDrawerOpen}
                setIsLeaveGroupDrawerOpen={setIsLeaveGroupDrawerOpen}
            />
            <AnalyticsTimeframeDrawer />
            <AnalyticsGroupOrOwnerDrawer />
            <JoinGroupDrawer
                isOpen={isJoinGroupDrawerOpen}
                toggleDrawer={() => setIsJoinGroupDrawerOpen(false)}
            />
        </>
    );
};
//=========== Selected Group Body ============//
