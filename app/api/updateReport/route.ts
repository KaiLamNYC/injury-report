import Injury from "@/lib/models/injury.model";
import Report from "@/lib/models/report.model";
import { connectToDB } from "@/lib/mongoose";
import { authOptions, getAuthSession } from "@/lib/nextauth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	try {
		connectToDB();
		const {
			reportId,
			patientAge,
			patientName,
			timeOfInjury,
			injuries,
			stageState,
		} = await req.json();
		const session = await getAuthSession();

		// Find the report first to check the author
		const report = await Report.findById(reportId);
		if (!report) {
			throw new Error("Report not found");
		}

		// Check if the session user is the author of the report
		if (!session || String(report.author) !== String(session?.user?.id)) {
			throw new Error("Not authorized to update this report");
		}

		const formattedInjuries = injuries.map((injury) => ({
			locationOfInjury: injury.label,
			description: injury.value,
		}));

		// Insert the new injuries into the database and await the result
		const docs = await Injury.insertMany(formattedInjuries);

		// Collect the ObjectIDs of the inserted injuries
		const injuryIds = docs.map((doc) => doc._id);

		// Update the report document using the parsed values
		const updatedReport = await Report.findByIdAndUpdate(
			reportId,
			{
				author: session?.user?.id,
				patientAge: Number(patientAge), // Convert string to number
				patientName,
				timeOfInjury: new Date(timeOfInjury),
				injuries: injuryIds,
				stageState,
			},
			{ new: true } // This option returns the updated document
		);

		return NextResponse.json({
			message: "success",
			payload: updatedReport,
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
