import { Router } from "express";
import { vehiclesController } from "./vehicles.controllers";
import auth from "../../middleware/auth";


const router = Router();

router.post("/", auth("admin"), vehiclesController.createVehicles);
router.get("/", vehiclesController.getVehicles);
router.get("/:vehicleId", vehiclesController.getSingleVehicle);
router.put("/:vehicleId", auth("admin"), vehiclesController.updateVehicle);
router.delete("/:vehicle", auth("admin"), vehiclesController.deleteVehice)

export const vehiclesRoute = router;
