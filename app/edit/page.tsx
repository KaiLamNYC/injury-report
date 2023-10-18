"use client";
import EditKonvaCanvas from "@/components/EditKonvaCanvas";
import React from "react";

type Props = {};

const EditCanvas = (props: Props) => {
	return (
		<div>
			<h1>Edit Canvas</h1>
			<EditKonvaCanvas
				savedState={{
					attrs: { width: 612, height: 612 },
					className: "Stage",
					children: [
						{
							attrs: {},
							className: "Layer",
							children: [
								{ attrs: { alt: "body map" }, className: "Image" },
								{
									attrs: {
										name: "Right Palm",
										points: [65, 314, 108, 323, 95, 379, 49, 362],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Left Palm",
										points: [242, 319, 296, 312, 303, 377, 260, 377],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Right Arm",
										points: [71, 309, 107, 318, 120, 265, 127, 218, 85, 207],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Left Arm",
										points: [227, 220, 239, 314, 284, 307, 269, 208],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Right Shoulder",
										points: [85, 201, 124, 211, 132, 121, 92, 121],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Left Shoulder",
										points: [264, 201, 227, 211, 226, 124, 264, 112],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Face",
										points: [134, 20, 216, 18, 212, 105, 175, 119, 143, 101],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Chest",
										points: [132, 135, 130, 209, 221, 210, 222, 135, 176, 143],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Neck",
										points: [
											138, 127, 168, 138, 191, 137, 212, 128, 205, 113, 176,
											124, 146, 109,
										],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Body",
										points: [132, 220, 219, 222, 228, 315, 124, 312],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Right Leg",
										points: [120, 319, 175, 325, 175, 535, 135, 536],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Right Foot",
										points: [137, 540, 176, 540, 175, 587, 129, 586],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Left Foot",
										points: [216, 539, 180, 539, 180, 585, 221, 585],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Left Leg",
										points: [181, 326, 181, 527, 215, 530, 232, 323],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Head",
										points: [381, 20, 493, 17, 477, 121, 394, 120],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Left Back Hand",
										points: [
											328, 311, 368, 321, 359, 367, 334, 379, 312, 361, 308,
											326,
										],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Right Back Hand",
										points: [500, 323, 552, 315, 565, 346, 554, 383, 505, 362],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Back",
										points: [386, 128, 486, 123, 487, 282, 393, 276],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Left Arm",
										points: [
											375, 129, 380, 184, 381, 246, 381, 279, 369, 310, 335,
											300, 347, 206, 354, 146,
										],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Right Arm",
										points: [491, 131, 526, 134, 546, 305, 508, 310, 495, 280],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Butt",
										points: [386, 284, 490, 287, 496, 340, 379, 340],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Left Leg",
										points: [380, 345, 435, 347, 438, 434, 436, 537, 398, 538],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Left Foot",
										points: [397, 543, 438, 543, 437, 587, 392, 582],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Right Foot",
										points: [473, 543, 443, 543, 442, 586, 493, 585],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										name: "Right Leg",
										points: [494, 349, 440, 350, 442, 533, 482, 532],
										closed: true,
									},
									className: "Line",
								},
								{
									attrs: {
										x: 453,
										y: 77,
										radius: 20,
										fill: "transparent",
										stroke: "red",
										strokeWidth: 3,
									},
									className: "Circle",
								},
								{
									attrs: {
										x: 453,
										y: 77,
										text: "Head",
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
										x: 435,
										y: 196,
										radius: 20,
										fill: "transparent",
										stroke: "red",
										strokeWidth: 3,
									},
									className: "Circle",
								},
								{
									attrs: {
										x: 435,
										y: 196,
										text: "Back",
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
