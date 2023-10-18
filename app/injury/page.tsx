"use client";
import LoadKonvaCanvas from "@/components/LoadKonvaCanvas";
import React from "react";

type Props = {};

const InjuryPage = (props: Props) => {
	return (
		<div>
			<h1>VIEW PAGE</h1>
			<LoadKonvaCanvas
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
										x: 212,
										y: 157,
										radius: 20,
										fill: "transparent",
										stroke: "red",
										strokeWidth: 3,
									},
									className: "Circle",
								},
								{
									attrs: {
										x: 216,
										y: 21,
										radius: 20,
										fill: "transparent",
										stroke: "red",
										strokeWidth: 3,
									},
									className: "Circle",
								},
							],
						},
					],
				}}
			/>
		</div>
	);
};

export default InjuryPage;
