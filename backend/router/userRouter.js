import express from "express";
import {
  login,
  userRegister,
  sendotp,
  addNewAdmin,
  addNewStaff,
  getAllStaffs,
  getUserDetails,
  logoutUser,
  logoutAdmin,
  logoutStaff,
  updatePassword,

} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isUserAuthenticated,
  isStaffAuthenticated,
} from "../middlewares/auth.js";


const router = express.Router();

router.post("/register", userRegister);
router.post("/sendotp", sendotp);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/staff/addnew", isAdminAuthenticated, addNewStaff);
router.get("/staff", getAllStaffs);
router.get("/user/me", isUserAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/staff/me", isStaffAuthenticated, getUserDetails);
router.get("/user/logout", isUserAuthenticated, logoutUser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/staff/logout", isStaffAuthenticated, logoutStaff);
router.put("/update/password", isUserAuthenticated, updatePassword);
router.put("/resetPass", resetPassword);


export default router;
