import express from "express";
import {
  login,
  userRegister,
  
  sendotp,
  resetPassword,

  addNewAdmin,
  addNewStaff,
  getAllStaffs,
  getUserDetails,
  logoutUser,
  logoutAdmin,
  logoutStaff
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isUserAuthenticated,
  isStaffAuthenticated,
} from "../middlewares/auth.js";


const router = express.Router();

router.post("/register", userRegister);
router.post("/login", login);

router.post("/sendotp", sendotp);
router.post("/resetPassword", resetPassword);


router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/staff/addnew", isAdminAuthenticated, addNewStaff);
router.get("/staff", getAllStaffs);
router.get("/user/me", isUserAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/staff/me", isStaffAuthenticated, getUserDetails);
router.get("/user/logout", isUserAuthenticated, logoutUser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/staff/logout", isStaffAuthenticated, logoutStaff);

export default router;
