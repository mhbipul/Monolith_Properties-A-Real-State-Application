import User from "../models/user.model.js"; 
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // If password is being updated, hash it
    if (updates.password) {
      updates.password = bcryptjs.hashSync(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      {
        $set: {
          username: updates.username,
          email: updates.email,
          password: updates.password,
          avatar: updates.avatar,
        }
      }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser._doc;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);
    
    res.clearCookie('access_token');
    res.status(200).json({ success: true, message: 'User has been deleted!' });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    // You'll need to import your Listing model here
    // const listings = await Listing.find({ userRef: userId });
    
    // For now, returning empty array - replace with actual listing logic
    const listings = [];
    
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};