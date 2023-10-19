import Injury from "@/lib/models/injury.model";
import Report from "@/lib/models/report.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	try {
		connectToDB();
		const { reportId } = await req.json();

		// Fetch the report and populate the necessary fields
		const report = await Report.findById(reportId)
			.populate("author", "name") // Populate the 'name' field from the 'User' document
			.populate("injuries", "locationOfInjury description") // Populate 'locationOfInjury' and 'description' fields from the 'Injury' document
			.exec();

		if (!report) {
			return NextResponse.json({
				message: "Report not found",
				payload: null,
			});
		}

		return NextResponse.json({
			message: "success",
			payload: report,
		});
	} catch (err) {
		return NextResponse.json({
			message: "failed to fetch injury report",
			payload: `error: ${err}`,
		});
	}
}
