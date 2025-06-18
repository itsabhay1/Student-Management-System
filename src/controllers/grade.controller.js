import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Grade } from "../models/grade.model.js";

// Assign grade to student by asdmin or teacher
export const assignGrade = asyncHandler(async (req, res) => {
    const { student, course, score } = req.body;

    const gradeExists = await Grade.findOne({ student, course });
    if (gradeExists) throw new ApiError(409, "Grade already exists for this student & course");

    const grade = await Grade.create({ student, course, score });
    res.status(201).json(new ApiResponse(201, grade, "Grade assigned"));
});

// Update grade by admin/teacher
export const updateGrade = asyncHandler(async (req, res) => {
    const updated = await Grade.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updated) throw new ApiError(404, "Grade not found");
    res.status(200).json(new ApiResponse(200, updated, "Grade updated"));
});

// get grade of a student by anyone
export const getGradesByStudent = asyncHandler(async (req, res) => {
    const grades = await Grade.find({ student: req.params.studentId }).populate("course", "title code");
    res.status(200).json(new ApiResponse(200, grades));
});

// get grade for a course by anyone
export const getGradesByCourse = asyncHandler(async (req, res) => {
    const grades = await Grade.find({ course: req.params.courseId }).populate("student", "fullName rollNumber");
    res.status(200).json(new ApiResponse(200, grades));
});

export const getStudentGPA = asyncHandler(async (req, res) => {
    const grades = await Grade.find({ student: req.params.studentId });

    if (grades.length === 0) {
        throw new ApiError(404, "No grades found for student");
    }

    const scoreToPoint = (score) => {
        if (score >= 90) return 10;
        if (score >= 80) return 9;
        if (score >= 70) return 8;
        if (score >= 60) return 7;
        if (score >= 50) return 6;
        if (score >= 40) return 5;
        return 0;
    };

    const totalPoints = grades.reduce((acc, curr) => acc + scoreToPoint(curr.score), 0);
    const gpa = (totalPoints / grades.length).toFixed(2);

    res.status(200).json(new ApiResponse(200, {
        gpa,
        totalSubjects: grades.length
    }, "GPA calculated"));
});

