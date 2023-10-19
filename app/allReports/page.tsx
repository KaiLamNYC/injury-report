import Navbar from "@/components/Navbar";
import React from "react";

type Props = {};

const page = (props: Props) => {
	return (
		<div className='flex flex-row justify-between items-center min-h-screen'>
			<Navbar />
			<div className='flex justify-center items-center flex-grow'></div>
		</div>
	);
};

export default page;
