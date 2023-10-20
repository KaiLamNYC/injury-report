"use client";
import SimpleBarChart from "@/components/BarChart";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import React from "react";
type Props = {};

const Dashboard = (props: Props) => {
	const { data: session } = useSession();
	// console.log(session);
	return (
		<div className='flex flex row'>
			<Navbar />

			<div className='grid grid-cols-2 grid-rows-5 gap-4'>
				<div className='col-span-2 row-span-2 col-start-1 row-start-2'>
					<div className='flex flex-col items-center'>
						<h1 className='text-xl'>Most Frequent Injuries</h1>
						<SimpleBarChart />
					</div>
				</div>
				<div className='col-span-2 row-span-2 col-start-1 row-start-4'>2</div>
				<div className='col-span-2 col-start-1 row-start-1'>3</div>
			</div>
		</div>
	);
};

export default Dashboard;
