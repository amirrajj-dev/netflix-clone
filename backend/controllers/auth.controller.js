import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import usersModel from '../models/user.model.js'
import { generateTokenAndSetItInCookie } from "../utils/generateToken.js";
//regex for email and password and username
const usernameRegex = /^[a-z0-9_-]{3,15}$/
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/

export const signup = async (req , res)=>{
    try {
        const {username , email , password} = req.body;
        if (!username || !email || !password){
            return res.status(400).json({message : "Please fill in all fields" , success : false});
        }
        const isValidEmail = emailRegex.test(email)
        const isValidUsername = usernameRegex.test(username)
        const isValidPassword = passwordRegex.test(password)
        if (!isValidEmail || !isValidUsername || !isValidPassword){
            return res.status(400).json({message : "Invalid input format" , success : false});
        }
        const existingUser = await usersModel.findOne({
            $or : [
                {username : username} ,
                {email : email}
            ]
        });
        //choose one of the pictures as user default pic randomly
        const defaultPics = ['/avatar1.pngg', '/avatar2.png' , '/avatar3.png']
        const randomPic = defaultPics[Math.floor(Math.random() * defaultPics.length)]
        if (existingUser){
            return res.status(400).json({message : "Username or email already exists" , success : false})
        }
        const hashedPassword = await bcrypt.hash(password , 12)
        const user = new usersModel({
            username ,
            email ,
            password : hashedPassword ,
            image : randomPic
        })
        await user.save()
        //generate jwt token and set it in cookie
        await generateTokenAndSetItInCookie(user._id , res)
        user.password = null
        res.status(201).json({message : "User created successfully" , success : true , data : user})
    } catch (error) {
        return res.status(500).json({message : 'error signing up => ' , error : error.message , success : false})
    }
}

export const login = async (req , res)=>{
    try {
        const {email , password} = req.body;
        if (!email ||!password){
            return res.status(400).json({message : "Please fill in all fields" , success : false});
        }
        const isValidEmail = emailRegex.test(email)
        const isValidPassword = passwordRegex.test(password)
        if (!isValidEmail || !isValidPassword){
            return res.status(400).json({message : "Invalid input format" , success : false})
        }
        const user = await usersModel.findOne({email})
        if (!user){
            return res.status(404).json({message : "user not found" , success : false})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(401).json({message : "Incorrect password" , success : false})
        }
        //generate jwt token and set it in cookie
        await generateTokenAndSetItInCookie(user._id, res)
        user.password = null
        res.status(200).json({message : "Logged in successfully" , success : true , data : user})
    } catch (error) {
        return res.status(500).json({message : 'error logging in => ' , error : error.message , success : false})
    }
}

export const logout = async (req , res)=>{
    try {
        // remove jwt token from cookie
        res.clearCookie('token')
        res.status(200).json({message : "Logged out successfully" , success : true})
    } catch (error) {
        return res.status(500).json({message : 'error logging out => ' , error : error.message , success : false})
    }
}

export const getMe = async (req , res)=>{
    try {
        res.status(200).json({message : "User Fetched Succesfully" , success : true , data : req.user})
    } catch (error) {
        return res.status(500).json({message : 'error fetching user => ' , error})
    }
}