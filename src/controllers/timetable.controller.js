import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Timetable } from "../models/timetable.model.js";

// Utility: time overlap check
const isOverlapping = (aStart, aEnd, bStart, bEnd) => {
  return aStart < bEnd && bStart < aEnd;
};

// Create schedule
export const createSchedule = asyncHandler(async (req, res) => {
  const { course, teacher, day, startTime, endTime, room } = req.body;

  if (!course || !teacher || !day || !startTime || !endTime || !room) {
    throw new ApiError(400, "All fields are required");
  }

  const existing = await Timetable.find({ day });

  const conflict = existing.find((entry) =>
    (entry.room === room || entry.teacher.toString() === teacher || entry.course.toString() === course) &&
    isOverlapping(startTime, endTime, entry.startTime, entry.endTime)
  );

  if (conflict) {
    throw new ApiError(409, "Schedule conflict detected");
  }

  const schedule = await Timetable.create({ course, teacher, day, startTime, endTime, room });
  res.status(201).json(new ApiResponse(201, schedule, "Timetable entry created"));
});

// Get all timetable entries
export const getAllSchedules = asyncHandler(async (req, res) => {
  const entries = await Timetable.find()
    .populate("course", "title code")
    .populate("teacher", "fullName username");
  res.status(200).json(new ApiResponse(200, entries));
});

// Get timetable by day
export const getTimetableByDay = asyncHandler(async (req, res) => {
  const { day } = req.params;

  const entries = await Timetable.find({ day })
    .populate("course", "title code")
    .populate("teacher", "fullName");

  res.status(200).json(new ApiResponse(200, entries));
});
