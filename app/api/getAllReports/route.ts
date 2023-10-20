import Report from "@/lib/models/report.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
	try {
		// Connect to the database
		connectToDB();

		// Fetch all reports with only the required fields and exclude the _id field
		const reports = await Report.find().select(
			"patientName timeOfInjury createdAt -_id"
		);

		return NextResponse.json({
			message: "success",
			payload: reports,
		});
	} catch (err) {
		console.error("Error fetching reports:", err);
		return NextResponse.json({
			message: "failed to fetch all reports",
			payload: `error: ${err}`,
		});
	}
}
