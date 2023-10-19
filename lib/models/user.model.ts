import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
	},
	image: {
		type: String,
	},
	reports: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Report",
		},
	],
});

//IF DOESNT EXIST IN DB THEN IT CREATES THE MODEL OTHERWISE JUST READS FROM DB
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
