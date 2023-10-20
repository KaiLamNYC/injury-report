"use client";
import EditKonvaCanvas from "@/components/EditKonvaCanvas";
import Navbar from "@/components/Navbar";
import React from "react";

type Props = {
	params: {
		id: string;
	};
};

const EditCanvas = ({ params }: Props) => {
	return (
		<div className='flex flex-row justify-between items-center min-h-screen'>
			<Navbar />
			<div className='flex justify-center items-center flex-grow'>
				<EditKonvaCanvas reportId={params.id} />
			</div>
		</div>
	);
};

export default EditCanvas;
