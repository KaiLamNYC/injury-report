import React, { useRef, useState } from "react";
import { Circle, Image, Layer, Stage, Text } from "react-konva";
import useImage from "use-image";
import { Button } from "./ui/button";

function KonvaCanvas() {
	const [image] = useImage("/body-map.jpeg");
	const [circles, setCircles] = useState([]);
	const stageRef = useRef(null);

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
				{ x: point.x, y: point.y, radius: 20, number: circles.length + 1 },
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

	const handleSave = () => {
		const stageToSave = stageRef.current;
		const stageState = stageToSave.toJSON();
		console.log(stageState); // For demonstration purposes
	};

	return (
		<div>
			<Stage width={300} height={300} onClick={handleStageClick} ref={stageRef}>
				<Layer>
					<Image image={image} width={300} height={300} alt='body map' />
					{circles.map((circle, index) => (
						<>
							<Circle
								key={index}
								x={circle.x}
								y={circle.y}
								radius={circle.radius}
								fill='transparent'
								stroke='red'
								strokeWidth={3}
								onDblClick={() => handleCircleDblClick(index)}
							/>
							<Text
								// key={index}
								x={circle.x}
								y={circle.y}
								text={circle.number.toString()}
								fontSize={15}
								align='center'
								verticalAlign='middle'
								offsetX={5} // Adjust based on the font size
								offsetY={7} // Adjust based on the font size
							/>
						</>
					))}
				</Layer>
			</Stage>
			<Button onClick={handleSave}>SAVE</Button>
		</div>
	);
}

export default KonvaCanvas;
