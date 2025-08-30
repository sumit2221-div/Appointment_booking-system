import Appointment from "../model/Appointment.model.js";
import Availability from "../model/Availability.model.js";

export const BookAppointment = async (req, res) => {
  try {
    const { availabilityId } = req.params;
    if (!availabilityId) {
      return res.status(400).json({ message: "Availability ID is required" });
    }

    const availability = await Availability.findById(availabilityId);
    if (!availability || availability.isBooked) {
      return res.status(400).json({ message: "Invalid or already booked availability" });
    }

    const appointment = new Appointment({
      studentId: req.user._id,
      professorId: availability.professorId,
      timeSlot: availability.timeSlot,
    });
    await appointment.save();

    availability.isBooked = true;
    await availability.save();

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const CancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    const appointment = await Appointment.findOne({ _id: appointmentId, professorId: req.user._id });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found or unauthorized" });
    }

    const availability = await Availability.findOne({
      professorId: appointment.professorId,
      timeSlot: appointment.timeSlot,
    });

    if (availability) {
      availability.isBooked = false;
      await availability.save();
    }

    await appointment.deleteOne();

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const GetMyAppointment = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "student") {
      query.studentId = req.user._id;
    } else if (req.user.role === "professor") {
      query.professorId = req.user._id;
    }

    const appointments = await Appointment.find(query)
      .populate("professorId", "name email")
      .populate("studentId", "name email");

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};