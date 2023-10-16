import { fabric } from "fabric";
import React, { useEffect, useRef } from "react";

function CanvasComponent() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasRef.current);

		const canvasWidth = window.innerWidth / 2; // Half of screen width
		const canvasHeight = window.innerHeight / 2; // Half of screen height
		canvas.setWidth(canvasWidth);
		canvas.setHeight(canvasHeight);

		// Load the body map image
		fabric.Image.fromURL("/body-map.jpeg", (img) => {
			const scale = Math.min(
				canvasWidth / img.width,
				canvasHeight / img.height
			);
			img.scale(scale);
			canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
		});

		// Add event listener for drawing circles
		canvas.on("mouse:down", (options) => {
			const circle = new fabric.Circle({
				left: options.e.clientX - canvas._offset.left,
				top: options.e.clientY - canvas._offset.top,
				radius: 20, // Adjust as needed
				fill: "transparent",
				stroke: "red",
				strokeWidth: 3,
			});
			canvas.add(circle);
		});
	}, []);

	return (
		<canvas
			ref={canvasRef}
			width={window.innerWidth}
			height={window.innerHeight}
		></canvas>
	);
}

export default CanvasComponent;
