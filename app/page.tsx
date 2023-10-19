"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import DynamicCanvas from "../components/DynamicCanvas";
// import BodyMap from "./BodyMap";

export default function Home() {
	return (
		<div className='flex flex-col items-center'>
			<h1>Injury Report Database</h1>
			<div className='flex gap-2'>
				<Link href={"/login"}>
					<Button>Login</Button>
				</Link>
				<Link href={"/signup"}>
					<Button>SignUp</Button>
				</Link>
			</div>
		</div>
	);
}
