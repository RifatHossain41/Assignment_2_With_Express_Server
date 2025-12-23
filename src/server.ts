import express, { Request, Response } from "express";
import { initDb } from "./database/db";
import config from "./database";
import { vehiclesRoute } from "./modules/vehicles/vehicles.route";
import { authRouter } from "./modules/auth/auth.route";
import { userRouter } from "./modules/user/user.route";
import { bookingRoute } from "./modules/bookings/bookings.route";
import logger from "./middleware/logger";

const app = express();
const port = config.port;

initDb();

// logger midlewere
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Express Server");
});

// parser
app.use(express.json());

// Auth CRUD
app.use("/api/v1/auth", authRouter);

// User CRUD
app.use("/api/v1/users", userRouter);

// Vehicles CRUD
app.use("/api/v1/vehicles", vehiclesRoute);

// Bookings CRUD
app.use("/api/v1/bookings", bookingRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(404).json({
    message: "This is the root",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
