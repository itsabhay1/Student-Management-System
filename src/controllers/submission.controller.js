import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Submission } from "../models/submission.model.js";

// Submit an assignment
export const submitAssignment = asyncHandler(async (req, res) => {
    const { assignment, student, content } = req.body;

    if (!assignment || !student || !content) {
        throw new ApiError(400, "Assignment ID, student ID, and content are required");
    }

    // Check if already submitted
    const exists = await Submission.findOne({ assignment, student });
    if (exists) {
        throw new ApiError(409, "You have already submitted this assignment");
    }

    const submission = await Submission.create({
        assignment,
        student,
        content,
    });

    res.status(201).json(new ApiResponse(201, submission, "Submission successful"));
});

// Evaluate a submission
export const evaluateSubmission = asyncHandler(async (req, res) => {
    const { marks } = req.body;
    const { id: submissionId } = req.params;

    if (!marks && marks !== 0) {
        throw new ApiError(400, "Marks are required for evaluation");
    }

    // Validate ID
    if (!submissionId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, "Invalid submission ID");
    }

    const updated = await Submission.findByIdAndUpdate(
        submissionId,
        { marks, evaluated: true },
        { new: true }
    );

    if (!updated) throw new ApiError(404, "Submission not found");

    res.status(200).json(new ApiResponse(200, updated, "Submission evaluated"));
});

// View submissions for a specific assignment
export const getSubmissionsByAssignment = asyncHandler(async (req, res) => {
    const { assignmentId } = req.params;

    if (!assignmentId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, "Invalid assignment ID");
    }

    const records = await Submission.find({ assignment: assignmentId }).populate(
        "student",
        "fullName"
    );

    if (!records || records.length === 0) {
        throw new ApiError(404, "No submissions found for this assignment");
    }

    res.status(200).json(new ApiResponse(200, records, "Submissions fetched"));
});
