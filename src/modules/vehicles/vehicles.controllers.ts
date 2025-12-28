import { Request, Response } from "express";
import { vehicleServices } from "../vehicles/vehicles.services";

// post vehicle
const createVehicles = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  // console.log(req.body)
  try {
    const result = await vehicleServices.createVehicles(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    );
    res.status(201).json({
      success: true,
      message: "vehicle created sucessfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all vehicles
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    res.status(201).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

// get single vehicle
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicle(
      req.params.vehicleId!
    );
    if (result.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle fetched successfully",
        data: result.rows[0],
      });
    }
    console.log(result.rows);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update vehicle
const updateVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  try {
    const result = await vehicleServices.updateVehicle(
      req.params.vehicleId!,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    );

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete vehicle
const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehicle(req.params.vehicleId!);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: [],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesController = {
  createVehicles,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
