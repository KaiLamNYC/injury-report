"use client";
import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Report, columns } from "./columns";
import { DataTable } from "./data-table";

type Props = {};

const AllReportsPage = (props: Props) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["All Reports"],
		queryFn: async () => {
			const data = await axios.get("/api/getAllReports");
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
		<div className='flex flex-row justify-between items-center min-h-screen'>
			<Navbar />
			<div className='flex justify-center items-center flex-grow flex-col'>
				<h1 className='text-3xl font-bold'>VIEW ALL INJURY REPORTS</h1>
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
};

export default AllReportsPage;
