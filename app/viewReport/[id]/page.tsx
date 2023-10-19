"use client";
import LoadKonvaCanvas from "@/components/LoadKonvaCanvas";
import Navbar from "@/components/Navbar";
import React from "react";

type Props = {
	params: {
		id: string;
	};
};

const InjuryPage = ({ params }: Props) => {
	return (
		<div className='flex flex-row justify-between items-center min-h-screen'>
			<Navbar />
			<div className='flex justify-center items-center flex-grow'>
				{/* <p>{params.id}</p> */}
				<LoadKonvaCanvas reportId={params.id} />
			</div>
		</div>
	);
};

export default InjuryPage;
