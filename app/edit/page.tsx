import EditKonvaCanvas from "@/components/EditKonvaCanvas";
import React from "react";

type Props = {};

const EditCanvas = (props: Props) => {
	return (
		<div>
			<h1>Edit Canvas</h1>
			<EditKonvaCanvas
				savedState={{
					attrs: { width: 300, height: 300 },
					className: "Stage",
					children: [
						{
							attrs: {},
							className: "Layer",
							children: [
								{
									attrs: { width: 300, height: 300, alt: "body map" },
									className: "Image",
								},
								{
									attrs: {
										x: 84,
										y: 31,
										radius: 20,
										fill: "transparent",
										stroke: "red",
										strokeWidth: 3,
									},
									className: "Circle",
								},
								{
									attrs: {
										x: 84,
										y: 31,
										text: "1",
										fontSize: 15,
										align: "center",
										verticalAlign: "middle",
										offsetX: 5,
										offsetY: 7,
										fill: "black",
									},
									className: "Text",
								},
								{
									attrs: {
										x: 209,
										y: 152,
										radius: 20,
										fill: "transparent",
										stroke: "red",
										strokeWidth: 3,
									},
									className: "Circle",
								},
								{
									attrs: {
										x: 209,
										y: 152,
										text: "2",
										fontSize: 15,
										align: "center",
										verticalAlign: "middle",
										offsetX: 5,
										offsetY: 7,
										fill: "black",
									},
									className: "Text",
								},
							],
						},
					],
				}}
			/>
		</div>
	);
};

export default EditCanvas;
