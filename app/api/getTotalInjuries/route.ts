import Injury from "@/lib/models/injury.model"; // Adjust the path if needed
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
	try {
		const count = await Injury.countDocuments();
		return NextResponse.json({
			message: "success",
			payload: count,
		});
	} catch (err) {
		return NextResponse.json({
			message: "failed to fetch injury count",
			payload: `error: ${err}`,
		});
	}
}
