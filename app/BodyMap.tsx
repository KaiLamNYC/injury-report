import React, { useEffect, useRef, useState } from "react";

function BodyMap() {
	const canvasRef = useRef(null);
	const [circles, setCircles] = useState([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		// Load the body map image
		const img = new Image();
		img.src = "./assets/body-map";
		img.onload = () => {
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			drawCircles(ctx);
		};

		canvas.addEventListener("mousedown", (e) => {
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const newCircle = { x, y, radius: 20 }; // Adjust radius as needed
			setCircles([...circles, newCircle]);
			drawCircle(ctx, newCircle);
		});
	}, [circles]);

	const drawCircle = (ctx, circle) => {
		ctx.beginPath();
		ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
		ctx.strokeStyle = "red";
		ctx.stroke();
	};

	const drawCircles = (ctx) => {
		circles.forEach((circle) => drawCircle(ctx, circle));
	};

	return (
		<canvas
			ref={canvasRef}
			width={window.innerWidth}
			height={window.innerHeight}
		></canvas>
	);
}

export default BodyMap;
