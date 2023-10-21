import mongoose from "mongoose";
import Injury from "./models/injury.model";
import Report from "./models/report.model";
import User from "./models/user.model";
//VAR TO CHECK IF WERE CONNECTED TO MONGOOSE
let isConnected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);
	//IF NO URI SET IN ENV VAR
	if (!process.env.DATABASE_URL) return console.log("DATABASE_URL not found");
	//IF ALREADY CONNECTED TO DB
	if (isConnected) return console.log("Already connected to MONGODB");

	try {
		await mongoose.connect(process.env.DATABASE_URL);
		isConnected = true;
		console.log("Connected to MONGODB");
	} catch (err) {
		console.log(err);
	}
};
