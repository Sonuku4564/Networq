import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export const signup = async (req , res) =>{
    try{
        const {name, username, email, password} = req.body;
        if(!name || !username || !email || !password){
            return res.status(400).json({message: " All fields are required "});
        }

        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message: "Email already Exist"});
        }

        const existingUsername = await User.findOne({username});

        if(existingUsername){
            return res.status(400).json({message: " Usernamealready Exist"});
        }

        if(password.length <6){
            return res.status(400).json({message: " Password must be atleast 6 Characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            username
        })
        await user.save();

        const token = jwt.sign( {userId: user._id}, process.env.JWT_SECRET , {expiresIn: "3d"})

        res.cookie("jwt-linkedin", token,{
            httpOnly: true,  // prevent xss
            maxAge : 3*24*60*60*1000,
            sameSite: "strict", // prevent csrf
            secure: process.env.NODE_ENV === 'Production', // prevents Man in the middle account
        })
        res.status(201).json({message: "User Registered Successfully"});

        const profileUrl = process.env.CLIENT_URL +"/profile/" +user.username;


        // todo send the welcome email
        try{
            await sendWelcomeEmail(user.email, user.name, user.profileUrl);
        } catch (error){
            console.error("Error Sending Welcome Email", error)
        }

    }
    catch (error){
        console.log("Error in Signup", error.message);
        res.status(500).json({message: " Internal Server Error",});

    }
}

export const login = async (req , res) =>{
    try{
        const {username, password} = req.body;
        
        // check if user exist 
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: " Invalid Credentials"})
        }

        // Check for password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch ){
            return res.status(400).json({message: " Invalid Credentials"})
        }
        const token = jwt.sign( {userId: user._id}, process.env.JWT_SECRET , {expiresIn: "3d"})

        res.cookie("jwt-linkedin", token,{
            httpOnly: true,  // prevent xss
            maxAge : 3*24*60*60*1000,
            sameSite: "strict", // prevent csrf
            secure: process.env.NODE_ENV === 'Production', // prevents Man in the middle account
        })
        res.status(200).json({message: " Logged In Successfully"});

    } catch (error){
        console.log("Error in Login Controller:", error);
        res.status(500).json({message: "Server Error"});

    }

}

export const logout = (req , res) =>{
    res.clearCookie("jwt-linkedin");
    res.json({message : "Logged Out Successfully"})
}

export const getCurrentUser = async (req,res) =>{
    try{
        res.json(req.user)
    } catch (error){
        console.log("Error in getCurrentUser Controller:", error);
        res.status(500).json({message: "Server Error"});

    }

}