import Report from "@/lib/models/report.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
	try {
		// Fetch all patient ages
		const reports = await Report.find({}, { patientAge: 1, _id: 0 });
		const ages = reports.map((report) => report.patientAge);

		// Initialize age categories
		const ageCategories = {
			"0-9": 0,
			"10-19": 0,
			"20-29": 0,
			"30-39": 0,
			"40-49": 0,
			"50-59": 0,
			"60-69": 0,
			"70-79": 0,
			"80+": 0,
		};

		// Categorize the ages
		for (let age of ages) {
			if (age < 10) ageCategories["0-9"]++;
			else if (age < 20) ageCategories["10-19"]++;
			else if (age < 30) ageCategories["20-29"]++;
			else if (age < 40) ageCategories["30-39"]++;
			else if (age < 50) ageCategories["40-49"]++;
			else if (age < 60) ageCategories["50-59"]++;
			else if (age < 70) ageCategories["60-69"]++;
			else if (age < 80) ageCategories["70-79"]++;
			else ageCategories["80+"]++;
		}

		// Convert the age categories object to an array
		const payload = Object.entries(ageCategories).map(([name, value]) => ({
			name,
			value,
		}));

		return NextResponse.json({
			message: "success",
			payload: payload,
		});
	} catch (err) {
		return NextResponse.json({
			message: "failed to fetch top injuries",
			payload: `error: ${err.message}`,
		});
	}
}
