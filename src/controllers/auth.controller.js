import userModel from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";
import {sendEmail} from "../services/email.service.js";
import { generateOtp, getOtpHtml } from "../utils/utils.js";
import otpmodel from "../models/otp.model.js";
import otpModel from "../models/otp.model.js";

export async function register(req, res) {
  try {
    if (
      !req.body ||
      !req.body.username ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).json({
        message: "all filled are requried",
      });
    }

    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyRegistered) {
      res.status(409).json({
        message: "username or email already exist",
      });
    }

    const hashPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    // ! CODE BEFORE EMAIL AUTH ADD.
    // const refreshToken = jwt.sign(
    //   {
    //     id: user._id,
    //   },
    //   config.JWT_SECRET,
    //   { expiresIn: "7d" },
    // );

    // // CREATE SESSION
    // const refreshTokenHash = crypto
    //   .createHash("sha256")
    //   .update(refreshToken)
    //   .digest("hex");
    // const session = sessionModel.create({
    //   user: user._id,
    //   refreshTokenHash,
    //   ip: req.ip,
    //   userAgent: req.headers["user-agent"],
    // });

    // const accessToken = jwt.sign(
    //   {
    //     id: user._id,
    //     sessionId: session._id,
    //   },
    //   config.JWT_SECRET,
    //   { expiresIn: "15m" },
    // );

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

    // return res.status(201).json({
    //   message: "User registered successfully",
    //   user: {
    //     username: user.username,
    //     email: user.email,
    //   },
    //   accessToken,
    // });

    const otp = generateOtp();
    const html = getOtpHtml(username, otp);

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    await otpmodel.create({
      email,
      user: user._id,
      otpHash,
    });

    await sendEmail(email, "OTP Verification", `Your OTP code is ${otp}`, html);
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.verified) {
      return res.status(401).json({
        message: "Email not verified",
      });
    }
    const hashPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const isPasswordValid = hashPassword === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = sessionModel.create({
      user: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days.
    });

    return res.status(200).json({
      message: "Logged in successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

export async function getMe(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    return res.status(200).json({
      message: "user fetched successfully",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

export async function refreshToken(req, res) {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(401).json({
        message: "Email  or Password not provided",
      });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const hashPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const isPasswordValid = hashPassword === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = sessionModel.create({
      user: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days.
    });

    return res.status(200).json({
      message: "Logged in successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

export async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh Token not found",
      });
    }

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.findOne({
      refreshTokenHash,
      revoked: false,
    });

    if (!session) {
      return res.status(400).json({
        message: "Invalid refresh token",
      });
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

export async function logoutAll(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    //not working
    const result = await sessionModel.updateMany(
      {
        user: decoded.id,
        revoked: false,
      },
      {
        revoked: true,
      },
    );

    res.clearCookie("refreshToken");
    const allSession = await sessionModel.find({});

    return res.status(200).json({
      message: "Logged out from all devices successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

export async function verifiEmail(req, res) {
  try {
    if (!req.body || !req.body.otp || !req.body.email) {
      return res.status(401).json({
        message: "Otp or Email not provided",
      });
    }

    const { otp, email } = req.body;

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const otpDoc = await otpmodel.findOne({
      email,
      otpHash,
    });

    if (!otpDoc) {
      return res.status(400).json({
        message: "Invalid Otp",
      });
    }

    const user = await userModel.findByIdAndUpdate(otpDoc.user, {
      verified: true,
    });

    await otpModel.deleteMany({
      user: otpDoc.user,
    });

    return res.status(200).json({
      message: "Email verified successfully",
      user: {
        username: user.username,
        email: user.email,
        verified: user.verified
      }
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}
