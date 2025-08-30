import mongoose, { Mongoose } from "mongoose";

const AvilabilitySchema = new mongoose.Schema({
    professorId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User', 
         required: true
         },
    timeSlot: {
         type: Date,
          required: true
         },
    isBooked: {
         type: Boolean,
         default: false
         }
}, { timestamps: true });

export default mongoose.model("Availability", AvilabilitySchema);
