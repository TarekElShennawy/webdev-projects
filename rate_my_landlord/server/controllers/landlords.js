import landlordDetails from '../models/landlords.js';
import mongoose from "mongoose";

export const getLandlords = async (req, res) => {
    try {
        const getDetails = await landlordDetails.find();   
        console.log(getDetails);

        res.status(200).json(getDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createLandlord = async (req, res) => {
    const details = req.body;
    const newLandlord = new landlordDetails(details);

    try {
        console.log(details); 
        await newLandlord.save();

        res.status(201).json(newLandlord); 
        console.log("New landlord added!"); 
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const upvotePost = async (req, res) => {
    const { id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No matching id');

    const landlord = await PostMessage.findById(id);
    const updatedUpvote = await PostMessage.findByIdAndUpdate(id, { upvoteCount: landlord.upvoteCount + 1 }, { new: true })

    res.json(updatedUpvote);

}