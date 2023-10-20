"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

type Props = {};

const Navbar = (props: Props) => {
	const { data: session } = useSession();
	return (
		<div className='flex flex-col items-start space-y-16'>
			<p>Welcome {session?.user.name}</p>
			<Avatar>
				<AvatarImage src={session?.user.image} alt='@shadcn' />
				<AvatarFallback>{session?.user?.name[0]}</AvatarFallback>
			</Avatar>
			<Link href={"/allReports"}>
				<p>All Reports</p>
			</Link>
			<Link href={"/dashboard"}>
				<p>Dashboard</p>
			</Link>
			<Link href={"/createReport"}>
				<p>Create Report</p>
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
