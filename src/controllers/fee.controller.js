import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Fee } from "../models/fee.model.js";

// Create new fee entry
export const createFee = asyncHandler(async (req, res) => {
  const { student, type, amount, dueDate, remarks } = req.body;

  if (!student || !type || !amount || !dueDate) {
    throw new ApiError(400, "Student, type, amount, and due date are required");
  }

  const fee = await Fee.create({ student, type, amount, dueDate, remarks });
  res.status(201).json(new ApiResponse(201, fee, "Fee record created"));
});

// Get all fee records
export const getAllFees = asyncHandler(async (req, res) => {
  const { studentId, status } = req.query;

  const filter = {};
  if (studentId) filter.student = studentId;
  if (status) filter.status = status;

  const fees = await Fee.find(filter).populate("student", "fullName rollNumber");
  if (fees.length === 0) throw new ApiError(404, "No fee records found");

  res.status(200).json(new ApiResponse(200, fees));
});

// Update fee payment status
export const updateFeeStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["paid", "unpaid"].includes(status)) {
    throw new ApiError(400, "Status must be either 'paid' or 'unpaid'");
  }

  const updated = await Fee.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) throw new ApiError(404, "Fee record not found");

  res.status(200).json(new ApiResponse(200, updated, "Fee status updated"));
});

// Total pending amount for a student
export const getPendingAmount = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const unpaidFees = await Fee.find({ student: studentId, status: "unpaid" });
  const total = unpaidFees.reduce((sum, fee) => sum + fee.amount, 0);

  res.status(200).json(new ApiResponse(200, {
    totalPending: total,
    count: unpaidFees.length
  }));
});
