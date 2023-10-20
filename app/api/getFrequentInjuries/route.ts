import Injury from "@/lib/models/injury.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
	try {
		const topInjuries = await Injury.aggregate([
			{
				$group: {
					_id: "$locationOfInjury",
					count: { $sum: 1 },
				},
			},
			{
				$sort: { count: -1 },
			},
			{
				$limit: 4,
			},
		]);

		const formattedInjuries = topInjuries.map((injury) => ({
			name: injury._id,
			uv: injury.count,
		}));

		return NextResponse.json({
			message: "success",
			payload: formattedInjuries,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({
			message: "failed to fetch top injuries",
			payload: `error: ${err.message}`,
		});
	}
}
