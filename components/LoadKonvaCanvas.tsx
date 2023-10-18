"use client";
import Konva from "konva";
import React, { useEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";

function LoadKonvaCanvas({ savedState }) {
	const containerRef = useRef(null);

	useEffect(() => {
		if (savedState && containerRef.current) {
			Konva.Node.create(savedState, containerRef.current);
		}
	}, [savedState]);

	return (
		<div
			ref={containerRef}
			className='w-[300px] h-[300px] bg-center bg-cover'
			style={{ backgroundImage: "url(/body-map.jpeg)" }}
		></div>
	);
}

export default LoadKonvaCanvas;
