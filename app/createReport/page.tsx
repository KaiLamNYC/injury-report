"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import CreateKonvaCanvas from "../../components/CreateKonvaCanvas";

type Props = {};

const page = (props: Props) => {
	return (
		<div className='flex flex-row justify-between items-center min-h-screen'>
			<Navbar />

			<div className='flex justify-center items-center flex-grow'>
				<CreateKonvaCanvas />
			</div>
		</div>
	);
};

export default page;
