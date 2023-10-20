// @ts-nocheck

"use client";
import EditKonvaCanvas from "@/components/EditKonvaCanvas";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
	params: {
		id: string;
	};
};

const EditCanvas = ({ params }: Props) => {
	const { data: session } = useSession();
	if (session?.user?.id != params.id) {
		return redirect(`/viewReport/${params.id}`);
	}
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
