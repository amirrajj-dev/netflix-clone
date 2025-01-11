import jwt from "jsonwebtoken";
import usersModel from "../models/user.model.js";
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, token is required" , success: false });
    }
    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await usersModel.findOne({ _id: payload.userId } , '-password');
    
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, token is invalid" , success: false });
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized, token is invalid" });
  }
};

export default protectRoute;