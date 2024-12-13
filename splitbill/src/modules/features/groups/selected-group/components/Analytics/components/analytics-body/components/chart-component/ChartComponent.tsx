import { Pie } from "react-chartjs-2";
import { useChartComponent } from "./hooks/useChartComponent";

const ChartComponent = () => {
	const { chartData, options } = useChartComponent();
	return (
		<Pie
			data={chartData}
			options={options}
		/>
	);
};

export default ChartComponent;
