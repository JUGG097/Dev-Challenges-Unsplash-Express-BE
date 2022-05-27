import { body, param } from "express-validator";

export const createImageValidator = [
	body("img_url", "Image Url is required").exists({
		checkFalsy: true,
		checkNull: true,
	}),
	body("label", "Image Label is required").exists({
		checkFalsy: true,
		checkNull: true,
	}),
];
