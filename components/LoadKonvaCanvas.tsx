"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Konva from "konva";
import React, { useEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";

type Props = {
	reportId: string;
};
function LoadKonvaCanvas({ reportId }: Props) {
	const containerRef = useRef(null);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["Injury Report"],
		queryFn: async () => {
			const data = await axios.post("/api/getReport", { reportId });
			return data.data;
		},
	});

	if (isLoading) {
		return <div>Loading....</div>;
	}
	if (isError) {
		return <span>Error fetching Injury Report {error.message}</span>;
	}

	// useEffect(() => {
	// 	if (savedState && containerRef.current) {
	// 		Konva.Node.create(savedState, containerRef.current);
	// 	}
	// }, [savedState]);

	return (
		// <div
		// 	ref={containerRef}
		// 	className='bg-no-repeat'
		// 	style={{ backgroundImage: "url(/body-map.jpeg)" }}
		// ></div>
		<div>{data.payload.author.name}</div>
	);
}

export default LoadKonvaCanvas;
