import mongoose, { Document } from "mongoose";

export interface ImageDocument extends Document {
	img_url: string;
	label: string;
	createdAt: Date;
	updatedAt: Date;
}
