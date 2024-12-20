import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import otpGenerator  from "otp-generator";
import {OTP} from  "../models/otpSchema.js";

export const userRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "User",
  });

  generateToken(user, "Registered Successfully!", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 400));
  }
  generateToken(user, "Login Successfully!", 201, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin",
  });

  console.log("new admin added");
  
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});



export const addNewStaff = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("staff With This Email Already Exists!", 400)
    );
  }

  const staff = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Staff"
  });

  res.status(200).json({
    success: true,
    message: "New staff Registered",
    staff,
  });
});

export const getAllStaffs = catchAsyncErrors(async (req, res, next) => {
  const staffs = await User.find({ role: "Staff" });
  res.status(200).json({
    success: true,
    staffs,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout function for dashboard admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});


// Logout function for dashboard staff
export const logoutStaff = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("staffToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "staff Logged Out Successfully.",
    });
});

// Logout function for frontend user
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("userToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "user Logged Out Successfully.",
    });
});

export const updatePassword = catchAsyncErrors(async(req, res, next) => {
  const {currentPassword, newPassword} = req.body;

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(currentPassword);
  
  if(!isPasswordMatched){
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  
  sendToken(user, 200, res, "Password updated successfully");
});

export const resetPassword = catchAsyncErrors(async(req, res, next) => {
  const {email, newPassword} = req.body;

  const user = await User.findOne({email, role: 'User'});

  if(!user){
    return next(new ErrorHandler("user with given email doest not exist", 400));
  }

  user.password = newPassword;
  await user.save();
  
  res.status(200).json({
    success: true,
    message: 'Password Change successfully',
  })
});


export const sendotp = catchAsyncErrors(async (req, res, next) =>  {
  
    const { email } = req.body

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })

    let result = await OTP.findOne({ otp: otp })
    //console.log("Result is Generate OTP Func")
    console.log("OTP", otp)
    //console.log("Result", result)
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      })
     result = await OTP.findOne({ otp: otp })
    }


    const otpPayload = { email, otp }
    const otpBody = await OTP.create(otpPayload)
    
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    })
  
});