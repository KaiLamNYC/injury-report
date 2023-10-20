"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

// const data = [
// 	{ name: "0-9", value: 4000 },
// 	{ name: "10-19", value: 3000 },
// 	{ name: "20-29", value: 2000 },
// 	{ name: "30-39", value: 2780 },
// 	{ name: "40-49", value: 1890 },
// 	{ name: "50-59", value: 2390 },
// 	{ name: "60-69", value: 3490 },
// 	{ name: "70-79", value: 2000 },
// 	{ name: "80+", value: 1200 },
// ];

const AgeDistributionHistogram = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["Ages"],
		queryFn: async () => {
			const data = await axios.get("/api/getAges");
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
			margin={{
				top: 20,
				right: 30,
				left: 20,
				bottom: 5,
			}}
		>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis dataKey='name'>
				<Label value='Age Ranges' offset={0} position='insideBottom' />
			</XAxis>
			<YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
			<Tooltip />
			<Bar dataKey='value' fill='#8884d8' />
		</BarChart>
	);
};

export default AgeDistributionHistogram;
