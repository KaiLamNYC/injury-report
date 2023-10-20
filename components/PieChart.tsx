"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

const COLORS = [
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#A3E048",
	"#D946DB",
];

const PieChartComponent = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["Breakdown"],
		queryFn: async () => {
			const response = await axios.get("/api/getBreakdown");
			console.log(response.data.payload);
			return response.data.payload;
		},
	});

	if (isLoading) {
		return <div>Loading....</div>;
	}
	if (isError) {
		return <span>Error fetching Injury Report {error.message}</span>;
	}

	return (
		<PieChart width={400} height={400}>
			<Pie
				dataKey='value'
				isAnimationActive={false}
				data={data}
				cx='50%'
				cy='50%'
				outerRadius={80}
				fill='#8884d8'
				label
			/>
			<Tooltip />
			<Legend />
		</PieChart>
	);
};

export default PieChartComponent;
