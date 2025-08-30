import Availability from "../model/Availability.model.js";


export const AddAvailability = async (req, res) => {
    try {
        const { timeSlot } = req.body;
        if (!timeSlot) {
            return res.status(400).json({ message: "Time slot is required" });
        }

        const availability = new Availability({
            professorId: req.user._id,
            timeSlot,
        });
        await availability.save();

        res.status(201).json({ message: "Availability added successfully", availability });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const GetAvailability = async (req, res) => {
    try {
        const availabilities = await Availability.find({ professorId: req.params.professorId, isBooked: false });
        res.status(200).json({ availabilities });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
