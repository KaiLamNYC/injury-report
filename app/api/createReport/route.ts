// @ts-nocheck
import Injury from "@/lib/models/injury.model";
import Report from "@/lib/models/report.model";
import { connectToDB } from "@/lib/mongoose";
import { authOptions, getAuthSession } from "@/lib/nextauth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response) {
	try {
		connectToDB();
		const { patientAge, patientName, timeOfInjury, injuries, stageState } =
			await req.json();
		const session = await getAuthSession();
		console.log();
		const formattedInjuries = injuries.map((injury: any) => ({
			locationOfInjury: injury.label,
			description: injury.value,
		}));

		// Insert the injuries into the database and await the result
		const docs = await Injury.insertMany(formattedInjuries);

		// Collect the ObjectIDs of the inserted injuries
		const injuryIds = docs.map((doc) => doc._id);

		// Create the report document using the parsed values
		const reportData = {
			author: session?.user?.id,
			patientAge: Number(patientAge), // Convert string to number
			patientName,
			timeOfInjury: new Date(timeOfInjury),
			injuries: injuryIds,
			stageState,
		};

		const report = await Report.create(reportData);

		return NextResponse.json({
			message: "success",
			payload: report,
		});
	} catch (err) {
		console.error("Error:", err);
		return NextResponse.json(
			{
				message: "An error occurred",
				error: err.message,
			},
			{ status: 500 }
		);
	}
}
