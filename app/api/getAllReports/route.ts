import Report from "@/lib/models/report.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
	try {
		// fonnect to the database
		connectToDB();

		// fetch all reports and populate the author field
		const reports = await Report.find()
			.select("patientName timeOfInjury createdAt")
			.populate({
				path: "author",
				select: "name -_id",
			});

		// map over the reports to restructure them to match the desired format
		const formattedReports = reports.map((report) => ({
			_id: report._id.toString(),
			author: report.author.name,
			patientName: report.patientName,
			timeOfInjury: report.timeOfInjury,
			createdAt: report.createdAt,
		}));

		return NextResponse.json({
			message: "success",
			payload: formattedReports,
		});
	} catch (err) {
		console.error("Error fetching reports:", err);
		return NextResponse.json({
			message: "failed to fetch all reports",
			payload: `error: ${err}`,
		});
	}
}
