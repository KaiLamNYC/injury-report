"use client";
import React, { useState } from "react";
import { Circle, Layer, Stage, Text } from "react-konva";

function EditKonvaCanvas({ savedState }) {
	const initialCircles = savedState
		? savedState.children[0].children
				.filter((child) => child.className === "Circle")
				.map((circle) => ({
					...circle.attrs,
					number: parseInt(
						savedState.children[0].children.find(
							(text) =>
								text.className === "Text" &&
								Math.abs(text.attrs.x - circle.attrs.x) < 5 &&
								Math.abs(text.attrs.y - circle.attrs.y) < 5
						).attrs.text
					),
				}))
		: [];
	const [circles, setCircles] = useState(initialCircles);

	const handleStageClick = (event) => {
		const stage = event.target.getStage();
		const point = stage.getPointerPosition();

		// Check if there's already a circle at the clicked position
		const existingCircle = circles.find((circle) => {
			const distance = Math.sqrt(
				(circle.x - point.x) ** 2 + (circle.y - point.y) ** 2
			);
			return distance <= circle.radius;
		});

		if (!existingCircle) {
			setCircles([
				...circles,
				{
					x: point.x,
					y: point.y,
					radius: 20,
					fill: "transparent",
					stroke: "red",
					strokeWidth: 3,
					number: circles.length + 1,
				},
			]);
		}
	};

	const handleCircleDblClick = (index) => {
		const newCircles = [...circles];
		newCircles.splice(index, 1);
		// Renumber the circles after one is removed
		newCircles.forEach((circle, idx) => {
			circle.number = idx + 1;
		});
		setCircles(newCircles);
	};

	return (
		<div
			style={{
				width: 300,
				height: 300,
				backgroundImage: "url(/body-map.jpeg)",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<Stage width={300} height={300} onClick={handleStageClick}>
				<Layer>
					{circles.map((circle, index) => (
						<>
							<Circle
								key={index}
								{...circle}
								draggable={true}
								onDblClick={() => handleCircleDblClick(index)}
							/>
							<Text
								x={circle.x}
								y={circle.y}
								text={circle.number.toString()}
								fontSize={15}
								align='center'
								verticalAlign='middle'
								offsetX={5} // Adjust based on the font size
								offsetY={7} // Adjust based on the font size
								fill='black'
							/>
						</>
					))}
				</Layer>
			</Stage>
		</div>
	);
}

export default EditKonvaCanvas;
