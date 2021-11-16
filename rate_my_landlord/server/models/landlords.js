import mongoose from 'mongoose';

const landlordSchema = mongoose.Schema({
    name: String,
    landlordType: String,
    rating: Number,
    details: String,
    imageFile: String,
    reactions: {
        upvoteCount: {
            type: Number,
            default: 0,
        },
        downvoteCount: {
            type: Number,
            default: 0,     
        },
        funnyCount: {
            type: Number,
            default: 0,     
        },
        angryCount: {
            type: Number,
            default: 0,     
        },
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

var landlordDetails = mongoose.model('LandlordDetails', landlordSchema);

export default landlordDetails;