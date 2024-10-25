import ExpenseCategory from "../enums/ExpenseCategoryEnum";
import {
	FaHome,
	FaPaintBrush,
	FaQuestionCircle,
	FaShoppingCart,
	FaStream,
	FaTools,
	FaTshirt,
} from "react-icons/fa";
import {
	FaFilm,
	FaUtensils,
	FaBus,
	FaWater,
	FaHeart,
	FaShieldCat,
	FaSpa,
	FaGraduationCap,
	FaPlane,
	FaGift,
	FaHandsHolding,
	FaBaby,
	FaDog,
	FaDumbbell,
	FaClipboardList,
	FaLaptop,
	FaPiggyBank,
	FaChartLine,
	FaFileInvoiceDollar,
	FaWrench,
	FaCalendar,
	FaCreditCard,
} from "react-icons/fa6";

export const expenseCategories = [
	{
		label: ExpenseCategory.Food,
		icon: <FaUtensils size={20} />,
		color: "#FF6347", // Tomato
	},
	{
		label: ExpenseCategory.Housing,
		icon: <FaHome size={20} />,
		color: "#4682B4", // Steel Blue
	},
	{
		label: ExpenseCategory.Transportation,
		icon: <FaBus size={20} />,
		color: "#FFD700", // Gold
	},
	{
		label: ExpenseCategory.Utilities,
		icon: <FaWater size={20} />,
		color: "#1E90FF", // Dodger Blue
	},
	{
		label: ExpenseCategory.Health,
		icon: <FaHeart size={20} />,
		color: "#FF69B4", // Hot Pink
	},
	{
		label: ExpenseCategory.Insurance,
		icon: <FaShieldCat size={20} />,
		color: "#32CD32", // Lime Green
	},
	{
		label: ExpenseCategory.Entertainment,
		icon: <FaFilm size={20} />,
		color: "#FF4500", // Orange Red
	},
	{
		label: ExpenseCategory.Clothing,
		icon: <FaTshirt size={20} />,
		color: "#8A2BE2", // Blue Violet
	},
	{
		label: ExpenseCategory.PersonalCare,
		icon: <FaSpa size={20} />,
		color: "#FFB6C1", // Light Pink
	},
	{
		label: ExpenseCategory.Education,
		icon: <FaGraduationCap size={20} />,
		color: "#6A5ACD", // Slate Blue
	},
	{
		label: ExpenseCategory.Travel,
		icon: <FaPlane size={20} />,
		color: "#20B2AA", // Light Sea Green
	},
	{
		label: ExpenseCategory.Gifts,
		icon: <FaGift size={20} />,
		color: "#FF1493", // Deep Pink
	},
	{
		label: ExpenseCategory.Donations,
		icon: <FaHandsHolding size={20} />,
		color: "#FFDAB9", // Peach Puff
	},
	{
		label: ExpenseCategory.Groceries,
		icon: <FaShoppingCart size={20} />,
		color: "#ADFF2F", // Green Yellow
	},
	{
		label: ExpenseCategory.DiningOut,
		icon: <FaUtensils size={20} />,
		color: "#FF8C00", // Dark Orange
	},
	{
		label: ExpenseCategory.Subscriptions,
		icon: <FaStream size={20} />,
		color: "#9370DB", // Medium Purple
	},
	{
		label: ExpenseCategory.HomeMaintenance,
		icon: <FaTools size={20} />,
		color: "#A52A2A", // Brown
	},
	{
		label: ExpenseCategory.Childcare,
		icon: <FaBaby size={20} />,
		color: "#FFDEAD", // Navajo White
	},
	{
		label: ExpenseCategory.Pets,
		icon: <FaDog size={20} />,
		color: "#D2691E", // Chocolate
	},
	{
		label: ExpenseCategory.Fitness,
		icon: <FaDumbbell size={20} />,
		color: "#3CB371", // Medium Sea Green
	},
	{
		label: ExpenseCategory.Hobbies,
		icon: <FaPaintBrush size={20} />,
		color: "#FF7F50", // Coral
	},
	{
		label: ExpenseCategory.OfficeSupplies,
		icon: <FaClipboardList size={20} />,
		color: "#B0C4DE", // Light Steel Blue
	},
	{
		label: ExpenseCategory.Technology,
		icon: <FaLaptop size={20} />,
		color: "#4682B4", // Steel Blue
	},
	{
		label: ExpenseCategory.Savings,
		icon: <FaPiggyBank size={20} />,
		color: "#FFD700", // Gold
	},
	{
		label: ExpenseCategory.Investments,
		icon: <FaChartLine size={20} />,
		color: "#32CD32", // Lime Green
	},
	{
		label: ExpenseCategory.Taxes,
		icon: <FaFileInvoiceDollar size={20} />,
		color: "#FF4500", // Orange Red
	},
	{
		label: ExpenseCategory.Repairs,
		icon: <FaWrench size={20} />,
		color: "#A9A9A9", // Dark Gray
	},
	{
		label: ExpenseCategory.Events,
		icon: <FaCalendar size={20} />,
		color: "#FF6347", // Tomato
	},
	{
		label: ExpenseCategory.Miscellaneous,
		icon: <FaQuestionCircle size={20} />,
		color: "#B22222", // Firebrick
	},
	{
		label: ExpenseCategory.DebtRepayment,
		icon: <FaCreditCard size={20} />,
		color: "#8B0000", // Dark Red
	},
];
