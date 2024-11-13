import User from "../models/userModel.js";
import cloudinary from "../lib/cloudinary.js"

export const getSuggestedConnections = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id).select("connections");

        // find users who are not already connected and also do not recommended our own profile 
        const suggestedUser = await User.find({
            _id: {
                $ne: req.user._id,
                $nin: currentUser.connections,
            },
        })
            .select("name username profilePicture headline")
            .limit(3);

        res.json(suggestedUser);

    } catch (error) {
        console.log("Error in getSuggestedConnections", error.message);
        res.status(500).json({ message: " Internal Server Error", });
    }

}

export const  getPublicProfile = async (req,res) =>{
    try{
        const username = req.params.username.trim();

        // Find the user without the password field
        const user = await User.findOne({ username }).select("-password");

        if(!user){
            return  res.status(404).json({ message: "User not  found"});
        }

        res.json(user)

    } catch (error){
        console.log("Error in  getPublicProfile", error.message);
        res.status(500).json({ message: " Internal Server Error", });
    }
    
}

export const updateProfile = async (req,res) => {

    try{

        const allowedFields = [
            "name",
            "headline",
            "username",
            "about",
            "location",
            "profilePicture",
            "bannerImg",
            "skills",
            "experience",
            "education",
        ]

        const updateData = {};

        for(const field of allowedFields){
            if(req.body[field]){
                updateData[field] = req.body[field];
            }
        }

        // todo check for the profile img and banner img

        if(req.body.profilePicture){
            const result = cloudinary.uploader.upload(req.body.profilePicture)
            updateData.profilePicture = result.secure_url
        }

        
        if(req.body.bannerImg){
            const result = cloudinary.uploader.upload(req.body.bannerImg)
            updateData.bannerImg = result.secure_url
        }

        
        const user = await User.findByIdAndUpdate(req.user._id , {$set: updateData}, {new:true}).select("-password");
        res.json(user)

    } catch (error){
        console.log("Error in  updateProfile", error.message);
        res.status(500).json({ message: " Internal Server Error", });
    }
}