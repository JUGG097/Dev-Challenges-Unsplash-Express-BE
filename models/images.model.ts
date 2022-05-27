import mongoose from "mongoose";
import { ImageDocument } from "../utils/interface";

const imageSchema = new mongoose.Schema(
	{
		img_url: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<ImageDocument>("Image", imageSchema);
