import mongoose from "mongoose";

const injurySchema = new mongoose.Schema({
	locationOfInjury: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

//IF DOESNT EXIST IN DB THEN IT CREATES THE MODEL OTHERWISE JUST READS FROM DB
const Injury = mongoose.models.Injury || mongoose.model("Injury", injurySchema);

export default Injury;
