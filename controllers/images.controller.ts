import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { omit } from "lodash";
import Image from "../models/images.model";
import { createImageService, deleteImageService, findImageByIdService, getImagesService } from "../services/images.service";

export const getImages = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const images = await getImagesService()
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

		const image = await createImageService(req.body.img_url, req.body.label);
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
		const image = await findImageByIdService(req.params.imageId);
		if (!image) {
			res.status(400).json({
				success: false,
				message: "Image not found",
			});
		}

		await deleteImageService(req.params.imageId);
		res.status(200).json({ success: true, data: [] });
	} catch (error) {
		// catch error and forward to error handler
		return next(error);
	}
};
