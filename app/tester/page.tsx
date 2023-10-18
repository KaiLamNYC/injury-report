"use client";
import React from "react";
import TestCanvas from "../../components/TestCanvas";

type Props = {};

const page = (props: Props) => {
	return (
		<div>
			<h1>TEST CANVAS</h1>
			<TestCanvas />
		</div>
	);
};

export default page;
