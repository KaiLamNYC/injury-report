"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Konva from "konva";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

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
	const formatDate = (isoString) => {
		const date = new Date(isoString);
		return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
	};

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
			{/* <div className='flex justify-center items-center'> */}
			<Card className='flex flex-col justify-center items-center'>
				<CardHeader className='flex flex-col items-center'>
					<CardTitle>{data.patientName}</CardTitle>
					<CardDescription> {data.patientAge} years old</CardDescription>
				</CardHeader>

				<CardContent>
					<p className='mb-2'>
						<span className='font-semibold text-primary'>Author:</span>{" "}
						{data.author.name}
					</p>
					<p className='mb-2'>
						<span className='font-semibold text-primary'>Time of Report:</span>{" "}
						{formatDate(data.createdAt)}
					</p>

					<p className='mb-2'>
						<span className='font-semibold text-primary'>Time of Injury:</span>{" "}
						{formatDate(data.timeOfInjury)}
					</p>
				</CardContent>
			</Card>
			{/* </div> */}

			{/* <h1>Author: {data.author.name}</h1> */}

			<Table className='gap-1'>
				<TableCaption>List of {data.patientName} injuries</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className=''>Body Part</TableHead>
						<TableHead>Description</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.injuries.map((injury, index) => (
						<TableRow key={index}>
							{/* <TableCell className='font-bold'>{index + 1}</TableCell> */}
							<TableCell className='font-semibold'>
								{injury.locationOfInjury}
							</TableCell>
							<TableCell className=''>{injury.description}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default LoadKonvaCanvas;
