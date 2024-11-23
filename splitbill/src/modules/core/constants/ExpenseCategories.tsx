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
		color: "bg-red-700", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Housing,
		icon: <FaHome size={20} />,
		color: "bg-blue-800", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Transportation,
		icon: <FaBus size={20} />,
		color: "bg-yellow-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Utilities,
		icon: <FaWater size={20} />,
		color: "bg-blue-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Health,
		icon: <FaHeart size={20} />,
		color: "bg-pink-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Insurance,
		icon: <FaShieldCat size={20} />,
		color: "bg-green-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Entertainment,
		icon: <FaFilm size={20} />,
		color: "bg-orange-700", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Clothing,
		icon: <FaTshirt size={20} />,
		color: "bg-purple-700", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.PersonalCare,
		icon: <FaSpa size={20} />,
		color: "bg-pink-300", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Education,
		icon: <FaGraduationCap size={20} />,
		color: "bg-indigo-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Travel,
		icon: <FaPlane size={20} />,
		color: "bg-teal-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Gifts,
		icon: <FaGift size={20} />,
		color: "bg-pink-700", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Donations,
		icon: <FaHandsHolding size={20} />,
		color: "bg-orange-300", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Groceries,
		icon: <FaShoppingCart size={20} />,
		color: "bg-lime-500", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.DiningOut,
		icon: <FaUtensils size={20} />,
		color: "bg-orange-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Subscriptions,
		icon: <FaStream size={20} />,
		color: "bg-purple-500", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.HomeMaintenance,
		icon: <FaTools size={20} />,
		color: "bg-amber-700", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Childcare,
		icon: <FaBaby size={20} />,
		color: "bg-orange-300", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Pets,
		icon: <FaDog size={20} />,
		color: "bg-amber-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Fitness,
		icon: <FaDumbbell size={20} />,
		color: "bg-emerald-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Hobbies,
		icon: <FaPaintBrush size={20} />,
		color: "bg-orange-500", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.OfficeSupplies,
		icon: <FaClipboardList size={20} />,
		color: "bg-blue-300", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Technology,
		icon: <FaLaptop size={20} />,
		color: "bg-blue-800", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Savings,
		icon: <FaPiggyBank size={20} />,
		color: "bg-yellow-500", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Investments,
		icon: <FaChartLine size={20} />,
		color: "bg-green-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Taxes,
		icon: <FaFileInvoiceDollar size={20} />,
		color: "bg-orange-700", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Repairs,
		icon: <FaWrench size={20} />,
		color: "bg-gray-600", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Events,
		icon: <FaCalendar size={20} />,
		color: "bg-red-700", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.Miscellaneous,
		icon: <FaQuestionCircle size={20} />,
		color: "bg-red-900", // Adjusted for better contrast with white text
	},
	{
		label: ExpenseCategory.DebtRepayment,
		icon: <FaCreditCard size={20} />,
		color: "bg-red-800", // Adjusted for better contrast with white text
	},
];
