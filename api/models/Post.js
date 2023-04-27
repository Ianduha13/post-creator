const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	subtitle: {
		type: String,
	},
	description: {
		type: String,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
})

module.exports = mongoose.model("Post", PostSchema)
