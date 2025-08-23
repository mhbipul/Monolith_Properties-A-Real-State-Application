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