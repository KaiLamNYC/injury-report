"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Konva from "konva";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	reportId: string;
};
function LoadKonvaCanvas({ reportId }: Props) {
	const containerRef = useRef(null);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["Injury Report"],
		queryFn: async () => {
			const data = await axios.post("/api/getReport", { reportId });
			return data.data.payload;
		},
	});

	useEffect(() => {
		if (data?.stageState && containerRef.current) {
			Konva.Node.create(data.stageState, containerRef.current);
		}
	}, [data]);

	if (isLoading) {
		return <div>Loading....</div>;
	}
	if (isError) {
		return <span>Error fetching Injury Report {error.message}</span>;
	}

	return (
		<div className='flex flex-col'>
			<div
				ref={containerRef}
				className='bg-no-repeat'
				style={{
					backgroundImage: "url(/body-map.jpeg)",
					width: "612px", // Adjust based on your image's dimensions
					height: "612px", // Adjust based on your image's dimensions
				}}
			></div>
			<h1>Author: {data.author.name}</h1>
			<h1>Time of Report: {data.createdAt}</h1>
			<h1>Patient Name: {data.patientName}</h1>
			<h1>Patient Age: {data.patientAge}</h1>
			<h1>Time of Injury: {data.timeOfInjury}</h1>
		</div>
	);
}

export default LoadKonvaCanvas;
