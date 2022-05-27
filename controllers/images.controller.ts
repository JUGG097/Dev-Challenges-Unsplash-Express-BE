import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { omit } from "lodash";
import Image from "../models/images.model";

export const getImages = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const images = await Image.find(
			{},
			{ _id: 1, img_url: 2, label: 3 }
		).sort({ createdAt: -1 });
		res.status(200).json({
			success: true,
			data: images,
		});
	} catch (error) {
		// catch error and forward to error handler
		return next(error);
	}
};

export const createImage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// Check for valdation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ success: false, message: errors.array() });
		}

		const image = await Image.create({
			img_url: req.body.img_url,
			label: req.body.label,
		});
		res.status(200).json({
			success: true,
			data: omit(image.toJSON(), ["__v", "createdAt", "updatedAt"]),
		});
	} catch (error) {
		// catch error and forward to error handler
		return next(error);
	}
};

export const deleteImage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// check if image exists
		const image = await Image.findById(req.params.imageId);
		if (!image) {
			res.status(400).json({
				success: false,
				message: "Image not found",
			});
		}

		await Image.findByIdAndDelete(req.params.imageId);
		res.status(200).json({ success: true, data: [] });
	} catch (error) {
		// catch error and forward to error handler
		return next(error);
	}
};
