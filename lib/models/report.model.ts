import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},

	//COMMENTS ON THE THREAD
	injuries: [
		{
			type: String,
			required: true,
		},
	],
	timeOfInjury: {
		type: Date,
		required: true,
	},
	patientName: {
		type: String,
		required: true,
	},
	patientAge: {
		type: Number,
		required: true,
	},
});

//IF DOESNT EXIST IN DB THEN IT CREATES THE MODEL OTHERWISE JUST READS FROM DB
const Report = mongoose.models.Thread || mongoose.model("Report", reportSchema);

export default Report;
