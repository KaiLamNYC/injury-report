"use client";
import Image from "next/image";

import React, { useEffect } from "react";
import BodyMap from "./BodyMap";
import DynamicCanvas from "./components/DynamicCanvas";

export default function Home() {
	return (
		<div>
			<h1>HELLO WORLD</h1>
			{/* <BodyMap /> */}
			<DynamicCanvas />
		</div>
	);
}
