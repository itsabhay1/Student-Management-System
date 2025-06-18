import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Assignment } from "../models/assignment.model.js";

// Create assignment
export const createAssignment = asyncHandler(async (req, res) => {
    const { title, description, course, dueDate, isExam } = req.body;

    if (!title || !course || !dueDate) {
        throw new ApiError(400, "Title, course, and due date are required");
    }

    // Validate due date is in future
    const due = new Date(dueDate);
    if (isNaN(due.getTime())) {
        throw new ApiError(400, "Invalid due date format");
    }

    if (due < new Date()) {
        throw new ApiError(400, "Due date must be in the future");
    }

    // Prevent duplicate title for same course
    const duplicate = await Assignment.findOne({ title, course });
    if (duplicate) {
        throw new ApiError(409, "Assignment with this title already exists for the course");
    }

    const assignment = await Assignment.create({
        title,
        description,
        course,
        teacher: req.user._id,
        dueDate: due,
        isExam,
    });

    res.status(201).json(new ApiResponse(201, assignment, "Assignment created"));
});


// Get all assignments (by course)
export const getAssignments = asyncHandler(async (req, res) => {
    const courseId = req.query.course;

    const filter = {};
    if (courseId) {
        // Validate course ID
        if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
            throw new ApiError(400, "Invalid course ID");
        }
        filter.course = courseId;
    }

    const assignments = await Assignment.find(filter)
        .populate("course", "title")
        .populate("teacher", "fullName");

    if (!assignments || assignments.length === 0) {
        throw new ApiError(404, "No assignments found");
    }

    res.status(200).json(new ApiResponse(200, assignments, "Assignments fetched successfully"));
});

