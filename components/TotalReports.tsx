import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";

type Props = {};

const TotalReports = (props: Props) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["All Reports"],
		queryFn: async () => {
			const data = await axios.get("/api/getTotalInjuries");
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
		<Card className='flex flex-col items-center w-2/3'>
			<CardTitle>Total Number of Reports</CardTitle>
			<CardContent>
				<h1 className='text-xl'>{data}</h1>
			</CardContent>
		</Card>
	);
};

export default TotalReports;
