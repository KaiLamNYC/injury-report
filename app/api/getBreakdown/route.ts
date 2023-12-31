import Injury from "@/lib/models/injury.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
	try {
		const injuriesAggregated = await Injury.aggregate([
			{
				$group: {
					_id: "$locationOfInjury",
					count: { $sum: 1 },
				},
			},
		]);

		const data = injuriesAggregated.map((injury) => ({
			name: injury._id,
			value: injury.count,
		}));

		return NextResponse.json({
			message: "success",
			payload: data,
		});
	} catch (err) {
		return NextResponse.json({
			message: "failed to fetch injury counts",
			error: err.message,
		});
	}
}
