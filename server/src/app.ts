import path from "path";
import cookieParser from "cookie-parser";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";
import { authRouter } from "./routes/auth.routes.js";
import { categoryRouter } from "./routes/category.routes.js";
import { mediaRouter } from "./routes/media.routes.js";
import { orderRouter } from "./routes/order.routes.js";
import { paymentRouter } from "./routes/payment.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { userRouter } from "./routes/user.routes.js";


const app: Express = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/media", mediaRouter);
app.use("/api/payments", paymentRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("{/*splat}", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

app.all("{/*splat}", (req: Request, res: Response) => {
    res.json({ success: false, message: "Not found." });
});

app.use(errorMiddleware);

export default app;