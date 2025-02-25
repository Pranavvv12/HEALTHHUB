import express from "express";
import { signup, login, getAllDoctors, deleteDoctor, addDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/", getAllDoctors);

router.delete("/:id", deleteDoctor);

router.post("/add", addDoctor);

export default router;
