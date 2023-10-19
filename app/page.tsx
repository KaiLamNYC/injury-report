"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import DynamicCanvas from "../components/DynamicCanvas";
// import BodyMap from "./BodyMap";

export default function Home() {
	return (
		<div className='flex flex-col items-center'>
			<h1>Injury Report Database</h1>
			<div className='flex gap-2'>
				<Button>Login</Button>
				<Button>SignUp</Button>
			</div>
		</div>
	);
}
