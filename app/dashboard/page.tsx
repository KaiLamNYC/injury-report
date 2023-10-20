// "use client";
import CommonBarChart from "@/components/BarChart";
import AgeDistributionHistogram from "@/components/Histogram";
import Navbar from "@/components/Navbar";
import PieChartComponent from "@/components/PieChart";
import TotalReports from "@/components/TotalReports";
import { useSession } from "next-auth/react";
import React from "react";
type Props = {};

const Dashboard = (props: Props) => {
	// console.log(session);
	return (
		<div className='flex flex row'>
			<Navbar />
			<div className='grid grid-cols-2 grid-rows-2 gap-4 p-8'>
				<div>
					<div className='flex flex-col items-center'>
						<h1 className='text-xl'>Most Common Injuries</h1>
						<CommonBarChart />
					</div>
				</div>
				<div>
					<div className='flex flex-col items-center'>
						<h1 className='text-xl'>Injury Breakdown</h1>
						<PieChartComponent />
					</div>
				</div>
				<div className='flex flex-col items-center'>
					<TotalReports />
				</div>
				<div>
					<div className='flex flex-col items-center'>
						<h1 className='text-xl'>Age Distribution</h1>
						<AgeDistributionHistogram />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
