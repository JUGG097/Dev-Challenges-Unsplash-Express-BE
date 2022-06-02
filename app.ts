import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db";

// Router Imports
import imagesRouter from "./routes/images.route";

dotenv.config();
const port = process.env.PORT;
// const corsOptions = {
// 	origin: "http://localhost:3000",
// };

// Initialize MongoDB connection
connectDB();

const app = express();
// app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.get("/check", (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: "Serve is up and running" });
});
app.use("/api/v1/images", imagesRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
	next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	// res.status(err.status || 500);
	res.status(err.status || 500);
	res.json({ success: false, error: err.message });
});

// Start the server
app.listen(port, async () => {
	console.log(
		`Listening on ${port}, App is running at http://localhost:${port}`
	);
});
