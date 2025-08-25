import { errorHandler } from '../lib/error.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup =async (req, res, next) => { 
  
    try {
        const {username, email, password} = req.body;



        //creating hash of password
        // const salt = await bcrypt.genSalt(10);
        // newUser.password = await bcrypt.hash(newUser.password, salt);   
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({username,email,password: hashedPassword})

        //saving the user to the database
        await newUser.save()

        res.status(200).json({ message: "User created successfully", user: newUser });
        
    } catch (error) {
        next(error)
        
    }
}

export const singin = async (req, res, next) => {  
    try{
        const {email, password} = req.body;
        //find user by email
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, "User not found"));

        //compare password
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(400, "Wrong Credentials"));

        //creating token
        const token =  jwt.sign({id : validUser._id},process.env.JWT_SECRET, {expiresIn: "1d"});

        //removing password from user object before sending response
        const {password: pwd, ...rest} = validUser._doc;

        //cookie 
        res.cookie("access_token", token, {
            httpOnly: true,
            expires : new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        }).status(200).json(rest);// sending user data without password




    } 
    catch(error) {
        next(error)
    }
}

export const googleAuth = async (req, res, next) => {
    try {
        const { name, email, photo } = req.body;
        // Check if user already exists
        const user = await User.findOne({email})
        if(user){
            //create a token
            const token = jwt.sign({id:user._id},
                process.env.JWT_SECRET, {expiresIn: "1d"}
            )
            //remove password from user object before sending response
            const {password:pwd,...rest} = user._doc;
            //cookie

            res.cookie("access_token",token,{
                httpOnly: true,
                expires : new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                sameSite: "strict",
            }).status(200).json(rest); // sending user data without password
        }
        else{
            //generates password 
            const generatedPasswrod = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            //creating hash of password
            const  hashedPassword = bcrypt.hashSync(generatedPasswrod,10);
            //creating new user
            const newUser = new User({
                username: name.split("").join("").toLowerCase()+Math.random().toString(36).slice(-4), // generating a random username
                email,
                password : hashedPassword,
                avatar : photo
            })

            //saving the user to the database
            await newUser.save();
            const token = jwt.sign({id:user._id},
                process.env.JWT_SECRET, {expiresIn: "1d"}
            )
            //remove password from user object before sending response
            const {password:pwd,...rest} = user._doc;
            //cookie

            res.cookie("access_token",token,{
                httpOnly: true,
                sameSite: "strict",
            }).status(200).json(rest); // sending user data without password

        }
        
    } catch (error) {
        next(error)
        
    }   
}

export const signout = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };