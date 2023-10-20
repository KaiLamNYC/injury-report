import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

// const data = [
// 	{ name: "Red", uv: 12 },
// 	{ name: "Blue", uv: 19 },
// 	{ name: "Yellow", uv: 3 },
// 	{ name: "Green", uv: 5 },
// 	{ name: "Purple", uv: 2 },
// 	{ name: "Orange", uv: 3 },
// ];

const CommonBarChart = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["Bar Chart"],
		queryFn: async () => {
			const data = await axios.get("/api/getFrequentInjuries");
			return data.data.payload;
		},
	});
	// const data = await getAllReports();

	if (isLoading) {
		return <div>Loading....</div>;
	}
	if (isError) {
		return <span>Error fetching Injury Report {error.message}</span>;
	}
	return (
		<BarChart
			width={500}
			height={300}
			data={data}
			margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis dataKey='name' />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey='injuries' fill='#BE123C' />
		</BarChart>
	);
};

export default CommonBarChart;
