import User from "@/lib/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	try {
		const body = await req.json();
		const { email, name, password } = body;

		//CHECK USER IN DB FIRST
		const exist = await User.findOne({ email: email });

		if (exist) {
			return new NextResponse("User already exists", { status: 400 });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const createdUser = new User({
			name,
			password: hashedPassword,
			email,
		});

		await createdUser.save();

		return NextResponse.json({
			message: "success",
			payload: createdUser,
		});
	} catch (err) {
		return NextResponse.json({
			message: "error",
			payload: `${err}`,
		});
	}
}
