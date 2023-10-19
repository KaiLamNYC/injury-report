import { X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Circle, Image, Layer, Line, Stage, Text } from "react-konva";
import useImage from "use-image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function CreateKonvaCanvas() {
	const [image] = useImage("/body-map.jpeg");
	const [circles, setCircles] = useState([]);

	//KEEP TRACK OF INJURY LIST
	const [inputs, setInputs] = useState([]);

	const stageRef = useRef(null);
	const areas = [
		{ name: "Right Palm", coords: [65, 314, 108, 323, 95, 379, 49, 362] },
		{ name: "Left Palm", coords: [242, 319, 296, 312, 303, 377, 260, 377] },
		{
			name: "Right Arm",
			coords: [71, 309, 107, 318, 120, 265, 127, 218, 85, 207],
		},
		{ name: "Left Arm", coords: [227, 220, 239, 314, 284, 307, 269, 208] },
		{ name: "Right Shoulder", coords: [85, 201, 124, 211, 132, 121, 92, 121] },
		{ name: "Left Shoulder", coords: [264, 201, 227, 211, 226, 124, 264, 112] },
		{ name: "Face", coords: [134, 20, 216, 18, 212, 105, 175, 119, 143, 101] },
		{
			name: "Chest",
			coords: [132, 135, 130, 209, 221, 210, 222, 135, 176, 143],
		},
		{
			name: "Neck",
			coords: [
				138, 127, 168, 138, 191, 137, 212, 128, 205, 113, 176, 124, 146, 109,
			],
		},
		{ name: "Body", coords: [132, 220, 219, 222, 228, 315, 124, 312] },
		{ name: "Right Leg", coords: [120, 319, 175, 325, 175, 535, 135, 536] },
		{ name: "Right Foot", coords: [137, 540, 176, 540, 175, 587, 129, 586] },
		{ name: "Left Foot", coords: [216, 539, 180, 539, 180, 585, 221, 585] },
		{ name: "Left Leg", coords: [181, 326, 181, 527, 215, 530, 232, 323] },
		{ name: "Head", coords: [381, 20, 493, 17, 477, 121, 394, 120] },
		{
			name: "Left Back Hand",
			coords: [328, 311, 368, 321, 359, 367, 334, 379, 312, 361, 308, 326],
		},
		{
			name: "Right Back Hand",
			coords: [500, 323, 552, 315, 565, 346, 554, 383, 505, 362],
		},
		{ name: "Back", coords: [386, 128, 486, 123, 487, 282, 393, 276] },
		{
			name: "Left Arm",
			coords: [
				375, 129, 380, 184, 381, 246, 381, 279, 369, 310, 335, 300, 347, 206,
				354, 146,
			],
		},
		{
			name: "Right Arm",
			coords: [491, 131, 526, 134, 546, 305, 508, 310, 495, 280],
		},
		{ name: "Butt", coords: [386, 284, 490, 287, 496, 340, 379, 340] },
		{
			name: "Left Leg",
			coords: [380, 345, 435, 347, 438, 434, 436, 537, 398, 538],
		},
		{ name: "Left Foot", coords: [397, 543, 438, 543, 437, 587, 392, 582] },
		{ name: "Right Foot", coords: [473, 543, 443, 543, 442, 586, 493, 585] },
		{ name: "Right Leg", coords: [494, 349, 440, 350, 442, 533, 482, 532] },
	];

	//POINT IN POLYGON FUNCTION
	function isPointInPolygon(point, polygon) {
		let intersections = 0;
		for (let i = 0, j = polygon.length - 2; i < polygon.length; i += 2) {
			const x1 = polygon[i];
			const y1 = polygon[i + 1];
			const x2 = polygon[j];
			const y2 = polygon[j + 1];

			if ((y1 < point.y && y2 >= point.y) || (y2 < point.y && y1 >= point.y)) {
				if (x1 + ((point.y - y1) / (y2 - y1)) * (x2 - x1) < point.x) {
					intersections++;
				}
			}
			j = i;
		}
		return intersections % 2 !== 0;
	}

	const handleStageClick = (event) => {
		const stage = event.target.getStage();
		const point = stage.getPointerPosition();

		//CHECKING IF THE POINT IS WITHIN THE AREA
		const clickedArea = areas.find((area) =>
			isPointInPolygon(point, area.coords)
		);

		//IF POINT IS A VALID AREA, CHECK IF EXISTS AND REPLACE
		if (clickedArea) {
			const existingCircleIndex = circles.findIndex(
				(circle) => circle.label === clickedArea.name
			);

			if (existingCircleIndex !== -1) {
				// Replace the existing circle
				const newCircles = [...circles];
				newCircles[existingCircleIndex] = {
					x: point.x,
					y: point.y,
					radius: 20,
					label: clickedArea.name,
				};
				setCircles(newCircles);
			} else {
				// Add a new circle
				setCircles([
					...circles,
					{ x: point.x, y: point.y, radius: 20, label: clickedArea.name },
				]);
			}

			//INPUT STUFF
			const existingInputIndex = inputs.findIndex(
				(input) => input.label === clickedArea.name
			);

			if (existingInputIndex === -1) {
				setInputs([...inputs, { label: clickedArea.name }]);
			}
		}
	};

	const handleSave = () => {
		const stageToSave = stageRef.current;
		const stageState = stageToSave.toJSON();
		console.log(stageState); // For demonstration purposes
	};
	const handleDelete = (label) => {
		const newCircles = circles.filter((circle) => circle.label !== label);
		setCircles(newCircles);

		const newInputs = inputs.filter((input) => input.label !== label);
		setInputs(newInputs);
	};

	return (
		<div>
			<Stage
				width={image ? image.width : 0}
				height={image ? image.height : 0}
				onClick={handleStageClick}
				ref={stageRef}
			>
				<Layer>
					<Image image={image} alt='body map' />
					{areas.map((area, index) => (
						<Line key={index} name={area.name} points={area.coords} closed />
					))}
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
							/>
							<Text
								x={circle.x}
								y={circle.y}
								text={circle.label}
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
			<div className='mt-4'>
				{inputs.map((input, index) => (
					<div key={index} className='flex flex-col gap-2'>
						<div className='flex flex-row items-center gap-2'>
							<Label htmlFor={`injury-${index}`}>{input.label}</Label>
							<Button
								onClick={() => handleDelete(input.label)}
								className='p-1 w-6 h-6'
							>
								<X size={12} />
							</Button>
						</div>

						<Input
							id={`injury-${index}`}
							type='text'
							placeholder={`Describe ${input.label} injury`}
						/>
					</div>
				))}
			</div>
			<Button onClick={handleSave} className='mt-2'>
				SAVE
			</Button>
		</div>
	);
}

export default CreateKonvaCanvas;
