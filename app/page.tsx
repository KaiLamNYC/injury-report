import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<h1 className='text-4xl font-bold mb-2'>Injury Report Database</h1>
			<h2 className='text-2xl mb-2 text-gray-700'>
				Your go-to solution for managing injury reports.
			</h2>
			<p className='mb-4 text-gray-500'>By Kai</p>

			<div className='flex gap-2'>
				<Link href={"/login"}>
					<Button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
						Login
					</Button>
				</Link>
				<Link href={"/signup"}>
					<Button className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700'>
						SignUp
					</Button>
				</Link>
			</div>
		</div>
	);
}
