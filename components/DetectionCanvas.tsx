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

	return (
		<Stage width={image ? image.width : 0} height={image ? image.height : 0}>
			<Layer>
				<Image image={image} alt='body map' />
				<Line
					name='Left Arm'
					points={[69, 304, 110, 317, 128, 225, 76, 212]}
					fill='rgba(0,0,0,0.3)' // semi-transparent just for visualization
					closed
					onClick={handleAreaClick}
				/>
				<Line
					name='Right Arm'
					points={[226, 226, 239, 318, 292, 303, 274, 215]}
					fill='rgba(0,0,0,0.3)' // semi-transparent just for visualization
					closed
					onClick={handleAreaClick}
				/>
			</Layer>
		</Stage>
	);
}

export default BodyMap;
