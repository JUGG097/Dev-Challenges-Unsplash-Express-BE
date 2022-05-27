import express from "express";
import {
	getImages,
	createImage,
	deleteImage,
} from "../controllers/images.controller";
import { createImageValidator } from "../validators/images.validator";

const router = express.Router();

router.get("/", getImages);

router.post("/", createImageValidator, createImage);

router.delete("/:imageId", deleteImage);

export default router;
