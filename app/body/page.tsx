"use client";
import React from "react";
import CanvasComponent from "../../components/CanvasComponent";
import DynamicCanvas from "../../components/DynamicCanvas";

type Props = {};

const page = (props: Props) => {
	return (
		<div>
			<h1>BODY MAP VIEW</h1>
			<CanvasComponent />
			{/* <DynamicCanvas /> */}
		</div>
	);
};

export default page;
