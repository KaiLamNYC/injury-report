"use client";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import React from "react";
type Props = {};

const Dashboard = (props: Props) => {
	const { data: session } = useSession();
	// console.log(session);
	return (
		<div>
			<Navbar />
			<h1>Dashboard</h1>
		</div>
	);
};

export default Dashboard;
