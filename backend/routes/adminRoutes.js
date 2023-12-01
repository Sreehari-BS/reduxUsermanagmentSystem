import express from "express";
import { 
    authAdmin,
    logoutAdmin,
    listUserData,
    createUser,
    updateUser,
    deleteUser
 } from "../controllers/adminControllers.js";
 import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/authAdmin", authAdmin);
router.post("/adminLogout", logoutAdmin)
router.get("/adminHome", protectAdmin, listUserData)
router.post("/create",  createUser)
router.put("/updateUser",  updateUser)
router.delete("/delete/:id",  deleteUser)

export default router;
