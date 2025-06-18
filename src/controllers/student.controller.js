import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";

// Create a new student (admin only)
export const createStudent = asyncHandler(async (req, res) => {
  const { fullName, rollNumber, email, course, year, section } = req.body;

  const exists = await Student.findOne({ rollNumber });
  if (exists) throw new ApiError(409, "Roll number already exists");

  const student = await Student.create({
    fullName,
    rollNumber,
    email,
    course,
    year,
    section,
    user: req.user._id
  });

  res.status(201).json(new ApiResponse(201, student, "Student created"));
});

// Get all students
export const getAllStudents = asyncHandler(async (req, res) => {
  const { name, course } = req.query;

  const filter = {};
  if (name) filter.fullName = { $regex: name, $options: "i" };
  if (course) filter.course = course;

  const students = await Student.find(filter).populate("user", "username email");
  res.status(200).json(new ApiResponse(200, students));
});

// Get student by ID
export const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) throw new ApiError(404, "Student not found");
  res.status(200).json(new ApiResponse(200, student));
});

// Update student (admin only)
export const updateStudent = asyncHandler(async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new ApiError(404, "Student not found");

  res.status(200).json(new ApiResponse(200, updated, "Student updated"));
});

// Delete student (admin only)
export const deleteStudent = asyncHandler(async (req, res) => {
  const deleted = await Student.findByIdAndDelete(req.params.id);
  if (!deleted) throw new ApiError(404, "Student not found");

  res.status(200).json(new ApiResponse(200, {}, "Student deleted"));
});
