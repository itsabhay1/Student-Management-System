import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Attendance } from "../models/attendance.model.js";
import mongoose from "mongoose";

// Mark attendance
export const markAttendance = asyncHandler(async (req, res) => {
    const { student, course, status, date } = req.body;

    if (!student || !course || !status) {
        throw new ApiError(400, "Student, course, and status are required");
    }

    const attendance = await Attendance.create({
        student,
        course,
        status,
        date: date || new Date(),
    });

    res.status(201).json(new ApiResponse(201, attendance, "Attendance marked"));
});

// Get attendance by student
export const getAttendanceByStudent = asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    const records = await Attendance.find({ student: studentId })
        .populate("course", "title")
        .sort({ date: -1 });

    if (records.length === 0) {
        throw new ApiError(404, "No attendance records found for this student");
    }

    res.status(200).json(new ApiResponse(200, records));
});

// Get attendance by date
export const getAttendanceByDate = asyncHandler(async (req, res) => {
    const { date } = req.query;

    if (!date) {
        throw new ApiError(400, "Date query is required");
    }

    const parsedDate = new Date(date);
    const nextDay = new Date(parsedDate);
    nextDay.setDate(parsedDate.getDate() + 1);

    const records = await Attendance.find({
        date: { $gte: parsedDate, $lt: nextDay },
    }).populate("student", "fullName");

    if (records.length === 0) {
        throw new ApiError(404, "No records found for this date");
    }

    res.status(200).json(new ApiResponse(200, records));
});

// Get low attendance students
export const getLowAttendanceStudents = asyncHandler(async (req, res) => {
    const threshold = Number(req.query.threshold) || 75;
    const courseId = req.query.course;

    const matchStage = courseId
        ? { course: new mongoose.Types.ObjectId(courseId) }
        : {};

    const records = await Attendance.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: "$student",
                total: { $sum: 1 },
                present: {
                    $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] },
                },
            },
        },
        {
            $project: {
                attendanceRate: {
                    $multiply: [{ $divide: ["$present", "$total"] }, 100],
                },
            },
        },
        { $match: { attendanceRate: { $lt: threshold } } },
    ]);

    if (records.length === 0) {
        throw new ApiError(404, "No students found below the given attendance threshold");
    }

    res.status(200).json(new ApiResponse(200, records, "Low attendance report"));
});
