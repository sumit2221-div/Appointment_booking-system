import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
             required: true
            },
    professorId: {
             type: mongoose.Schema.Types.ObjectId,  
                ref: 'User',
                required: true
                },
    timeSlot: {
             type: Date,
             required: true
                 }
}, { timestamps: true });
export default mongoose.model("Appointment", AppointmentSchema);