import React, { useRef, useState } from "react";
import { Circle, Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { Button } from "./ui/button";

function KonvaCanvas() {
	const [image] = useImage("/body-map.jpeg");
	const [circles, setCircles] = useState([]);
	const stageRef = useRef(null);

	const handleStageClick = (event) => {
		const stage = event.target.getStage();
		const point = stage.getPointerPosition();

		setCircles([...circles, { x: point.x, y: point.y, radius: 20 }]);
	};
	const handleSave = () => {
		const stageToSave = stageRef.current;
		const stageState = stageToSave.toJSON();
		// Save stageState to your database or local storage
		console.log(stageState); // For demonstration purposes
	};

	return (
		<div>
			<Stage width={300} height={300} onClick={handleStageClick} ref={stageRef}>
				<Layer>
					<Image image={image} width={300} height={300} alt='body map' />
					{circles.map((circle, index) => (
						<Circle
							key={index}
							x={circle.x}
							y={circle.y}
							radius={circle.radius}
							fill='transparent'
							stroke='red'
							strokeWidth={3}
						/>
					))}
				</Layer>
			</Stage>
			<Button onClick={handleSave}>SAVE</Button>
		</div>
	);
}

export default KonvaCanvas;
