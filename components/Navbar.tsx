"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

type Props = {};

const Navbar = (props: Props) => {
	return (
		<div className='flex flex-col items-start space-y-16'>
			<p>USER AVATAR</p>
			<Link href={"/allReports"}>
				<p>All Reports</p>
			</Link>
			<Link href={"/createReport"}>
				<p>Create Report</p>
			</Link>
			<Link href={"/viewReport"}>
				<p>View Report</p>
			</Link>
			<Link href={"/editReport"}>
				<p>Edit Report</p>
			</Link>

			<Button
				onClick={() =>
					signOut({
						callbackUrl: "/",
					})
				}
			>
				Sign Out
			</Button>
		</div>
	);
};

export default Navbar;
