import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Course } from "../models/course.model.js";

// Create Course
export const createCourse = asyncHandler(async (req, res) => {
  const { title, code, description, assignedTeacher, schedule } = req.body;

  const exists = await Course.findOne({ code });
  if (exists) throw new ApiError(409, "Course code already exists");

  const course = await Course.create({
    title,
    code,
    description,
    assignedTeacher,
    schedule,
  });

  res.status(201).json(new ApiResponse(201, course, "Course created"));
});

//Get all course
export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find()
    .populate("assignedTeacher", "fullName email username")
    .populate("enrolledStudents", "fullName rollNumber");
  res.status(200).json(new ApiResponse(200, courses));
});

//Get single course by Id
export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate("assignedTeacher", "fullName email")
    .populate("enrolledStudents", "fullName");
  if (!course) throw new ApiError(404, "Course not found");

  res.status(200).json(new ApiResponse(200, course));
});

// Update course
export const updateCourse = asyncHandler(async (req, res) => {
  const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new ApiError(404, "Course not found");

  res.status(200).json(new ApiResponse(200, updated, "Course updated"));
});

// Delete Course
export const deleteCourse = asyncHandler(async (req, res) => {
  const deleted = await Course.findByIdAndDelete(req.params.id);
  if (!deleted) throw new ApiError(404, "Course not found");

  res.status(200).json(new ApiResponse(200, {}, "Course deleted"));
});

// Enrolling Student into a course
export const enrollStudents = asyncHandler(async (req, res) => {
  const { studentIds } = req.body;

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { enrolledStudents: { $each: studentIds } } },
    { new: true }
  );

  res.status(200).json(new ApiResponse(200, course, "Students enrolled"));
});
