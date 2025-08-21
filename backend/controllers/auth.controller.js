import { errorHandler } from '../lib/error.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

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