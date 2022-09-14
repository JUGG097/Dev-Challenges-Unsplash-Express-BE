import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import {
	createImageService,
} from "../services/images.service";

const imagePayload = {
	label: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
	img_url: "https://i.imgur.com/QlRphfQ.jpg",
};

const invalidImagePayload = {
	labelsss: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
	img_urlaa: "https://i.imgur.com/QlRphfQ.jpg",
};

const emptyImagesBody = {
	success: true,
	data: [],
};

const randomId = new mongoose.Types.ObjectId().toString();

describe("Tests the fetch, create and delete image functions", () => {
	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();

		await mongoose.connect(mongoServer.getUri());
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	it("Get request to fetch images from empty DB", async () => {
		const resp = await request(app).get("/api/v1/images");

		expect(resp.status).toEqual(200);
		expect(resp.body).toEqual(emptyImagesBody);
	});

  it("Post request is made to add a new image", async () => {
		const resp = await request(app)
                      .post("/api/v1/images")
                      .send(imagePayload);

		expect(resp.status).toEqual(200);
		expect(resp.body.data.img_url).toEqual(imagePayload.img_url);
	});

  it("Post request is made to add a new image with invalid payload", async () => {
		const resp = await request(app)
                      .post("/api/v1/images")
                      .send(invalidImagePayload);

		expect(resp.status).toEqual(400);
	});

  it("Get request to fetch images", async () => {
		const image = await createImageService(imagePayload.img_url, imagePayload.label);
    
    const resp = await request(app).get("/api/v1/images");

		expect(resp.status).toEqual(200);
		expect(resp.body.data[0].img_url).toEqual(image.img_url);
	});

  it("Delete request for specific image", async () => {
		const image = await createImageService(imagePayload.img_url, imagePayload.label);
    
    const resp = await request(app).delete(`/api/v1/images/${image._id}`);

		expect(resp.status).toEqual(200);
		expect(resp.body).toEqual(emptyImagesBody);
	});

  it("Delete request for specific image that does not exist", async () => {
		const image = await createImageService(imagePayload.img_url, imagePayload.label);
    
    const resp = await request(app).delete(`/api/v1/images/${randomId}`);

		expect(resp.status).toEqual(400);
		expect(resp.body.message).toEqual("Image not found");
	});

  it("Wrong method for valid endpoint", async () => {
		const image = await createImageService(imagePayload.img_url, imagePayload.label);
    
    const resp = await request(app).get(`/api/v1/images/${image._id}`);

		expect(resp.status).toEqual(404);
		expect(resp.body.error).toEqual("Not Found");
	});
});
