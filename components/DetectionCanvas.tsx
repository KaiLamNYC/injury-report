"use client";
import React from "react";
import { Image, Layer, Line, Stage } from "react-konva";
import useImage from "use-image";

function BodyMap() {
	const [image] = useImage("/body-map.jpeg");

	const handleAreaClick = (e) => {
		const area = e.target.attrs.name;
		alert(`You clicked on the ${area}`);
	};

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

	return (
		<Stage width={image ? image.width : 0} height={image ? image.height : 0}>
			<Layer>
				<Image image={image} alt='body map' />
				{areas.map((area, index) => (
					<Line
						key={index}
						name={area.name}
						points={area.coords}
						closed
						onClick={handleAreaClick}
					/>
				))}
			</Layer>
		</Stage>
	);
}

export default BodyMap;
